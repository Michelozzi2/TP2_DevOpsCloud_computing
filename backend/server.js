const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Modèle simple pour les campagnes
const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['active', 'paused', 'completed', 'draft'],
    default: 'draft'
  },
  description: String,
  target: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

// API Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// GET all campaigns
app.get('/api/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    console.error('Error fetching campaigns:', err);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

// GET a single campaign by ID
app.get('/api/campaigns/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (err) {
    console.error('Error fetching campaign:', err);
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});

// POST a new campaign
app.post('/api/campaigns', async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    const savedCampaign = await campaign.save();
    res.status(201).json(savedCampaign);
  } catch (err) {
    console.error('Error creating campaign:', err);
    res.status(400).json({ error: err.message });
  }
});

// PUT/UPDATE a campaign
app.put('/api/campaigns/:id', async (req, res) => {
  try {
    req.body.updatedAt = new Date();
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json(campaign);
  } catch (err) {
    console.error('Error updating campaign:', err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE a campaign
app.delete('/api/campaigns/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json({ message: 'Campaign deleted successfully' });
  } catch (err) {
    console.error('Error deleting campaign:', err);
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
});

// Update campaign status
app.patch('/api/campaigns/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['active', 'paused', 'completed', 'draft'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json(campaign);
  } catch (err) {
    console.error('Error updating campaign status:', err);
    res.status(500).json({ error: 'Failed to update campaign status' });
  }
});

// Connexion à MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://mat_test:<db_password>@cluster0.xoxjzbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
  .then(() => console.log('Connecté à MongoDB:', mongoURI))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));