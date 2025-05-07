import React, { useState } from 'react';

const CampaignList = ({ campaigns, onEdit, onDelete, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'paused': return 'status-paused';
      case 'completed': return 'status-completed';
      case 'draft': return 'status-draft';
      default: return '';
    }
  };

  return (
    <div className="campaign-list">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search campaigns..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
          <option value="draft">Draft</option>
        </select>
        <button className="refresh-btn" onClick={onRefresh}>
          Refresh
        </button>
      </div>

      {filteredCampaigns.length === 0 ? (
        <div className="no-campaigns">
          <p>No campaigns found. Create a new campaign to get started!</p>
        </div>
      ) : (
        filteredCampaigns.map(campaign => (
          <div key={campaign._id} className="campaign-item">
            <div className="campaign-info">
              <span className={`campaign-status ${getStatusClass(campaign.status)}`}>
                {campaign.status}
              </span>
              <h3>{campaign.name}</h3>
              <div className="campaign-dates">
                {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
              </div>
              <div className="campaign-budget">
                Budget: {formatCurrency(campaign.budget)}
              </div>
              {campaign.description && (
                <div className="campaign-description">
                  {campaign.description.length > 100 
                    ? `${campaign.description.substring(0, 100)}...` 
                    : campaign.description}
                </div>
              )}
            </div>
            <div className="campaign-actions">
              <button className="edit-btn" onClick={() => onEdit(campaign)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(campaign._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CampaignList;
