const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Modèle simple pour les campagnes
const campaignSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  budget: Number,
  status: String
});

const Campaign = mongoose.model('Campaign', campaignSchema);

// Routes de base
app.get('/api/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/campaigns', async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));