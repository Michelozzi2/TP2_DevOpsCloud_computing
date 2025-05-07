import React, { useState, useEffect } from 'react';
import './App.css';
import CampaignList from './components/CampaignList';
import CampaignForm from './components/CampaignForm';
import { fetchCampaigns, createCampaign, updateCampaign, deleteCampaign } from './services/api';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Load campaigns on component mount
  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const data = await fetchCampaigns();
      setCampaigns(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
      setError('Failed to load campaigns. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (campaign) => {
    try {
      const newCampaign = await createCampaign(campaign);
      setCampaigns([newCampaign, ...campaigns]);
      setIsFormVisible(false);
      setCurrentCampaign(null);
    } catch (err) {
      console.error('Failed to create campaign:', err);
      setError('Failed to create campaign. Please try again.');
    }
  };

  const handleUpdateCampaign = async (campaign) => {
    try {
      const updatedCampaign = await updateCampaign(campaign._id, campaign);
      setCampaigns(campaigns.map(c => c._id === updatedCampaign._id ? updatedCampaign : c));
      setIsFormVisible(false);
      setCurrentCampaign(null);
    } catch (err) {
      console.error('Failed to update campaign:', err);
      setError('Failed to update campaign. Please try again.');
    }
  };

  const handleDeleteCampaign = async (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await deleteCampaign(id);
        setCampaigns(campaigns.filter(campaign => campaign._id !== id));
      } catch (err) {
        console.error('Failed to delete campaign:', err);
        setError('Failed to delete campaign. Please try again.');
      }
    }
  };

  const handleEditCampaign = (campaign) => {
    setCurrentCampaign(campaign);
    setIsFormVisible(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Campaign Manager</h1>
        <button 
          className="new-campaign-btn" 
          onClick={() => {
            setCurrentCampaign(null);
            setIsFormVisible(true);
          }}
        >
          + New Campaign
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main className="App-main">
        {isFormVisible ? (
          <CampaignForm 
            campaign={currentCampaign} 
            onSubmit={currentCampaign ? handleUpdateCampaign : handleCreateCampaign}
            onCancel={() => {
              setIsFormVisible(false);
              setCurrentCampaign(null);
            }} 
          />
        ) : (
          <>
            {loading ? (
              <div className="loading">Loading campaigns...</div>
            ) : (
              <CampaignList 
                campaigns={campaigns} 
                onEdit={handleEditCampaign} 
                onDelete={handleDeleteCampaign} 
                onRefresh={loadCampaigns}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
