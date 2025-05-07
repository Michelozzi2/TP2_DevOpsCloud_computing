const API_URL = (window.env && window.env.REACT_APP_API_URL) || 
                process.env.REACT_APP_API_URL || 
                'http://localhost:5000/api';

console.log('Using API URL:', API_URL);

// Helper function for handling fetch responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP error ${response.status}`);
  }
  return response.json();
};

// Fetch all campaigns
export const fetchCampaigns = async () => {
  try {
    const response = await fetch(`${API_URL}/campaigns`);
    return handleResponse(response);
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

// Fetch a single campaign by ID
export const fetchCampaignById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/campaigns/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

// Create a new campaign
export const createCampaign = async (campaignData) => {
  try {
    const response = await fetch(`${API_URL}/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campaignData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

// Update an existing campaign
export const updateCampaign = async (id, campaignData) => {
  try {
    const response = await fetch(`${API_URL}/campaigns/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campaignData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

// Delete a campaign
export const deleteCampaign = async (id) => {
  try {
    const response = await fetch(`${API_URL}/campaigns/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

// Update campaign status
export const updateCampaignStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/campaigns/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
