import React, { useState, useEffect } from 'react';

const CampaignForm = ({ campaign, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'draft',
    description: '',
    target: ''
  });
  
  const [errors, setErrors] = useState({});

  // Initialize form with campaign data if provided
  useEffect(() => {
    if (campaign) {
      setFormData({
        ...campaign,
        startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().split('T')[0] : '',
        endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : ''
      });
    }
  }, [campaign]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors as user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Campaign name is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    } else if (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      newErrors.budget = 'Budget must be a positive number';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Format data before submission
    const submitData = {
      ...formData,
      budget: Number(formData.budget)
    };
    
    // Add ID if editing
    if (campaign && campaign._id) {
      submitData._id = campaign._id;
    }
    
    onSubmit(submitData);
  };

  return (
    <form className="campaign-form" onSubmit={handleSubmit}>
      <h2>{campaign ? 'Edit Campaign' : 'Create New Campaign'}</h2>
      
      <div className="form-group">
        <label htmlFor="name">Campaign Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <div className="error-text">{errors.name}</div>}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">Start Date *</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={errors.startDate ? 'error' : ''}
          />
          {errors.startDate && <div className="error-text">{errors.startDate}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="endDate">End Date *</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={errors.endDate ? 'error' : ''}
          />
          {errors.endDate && <div className="error-text">{errors.endDate}</div>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="budget">Budget (€) *</label>
          <input
            type="number"
            id="budget"
            name="budget"
            min="0"
            step="0.01"
            value={formData.budget}
            onChange={handleChange}
            className={errors.budget ? 'error' : ''}
          />
          {errors.budget && <div className="error-text">{errors.budget}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="target">Target Audience</label>
        <input
          type="text"
          id="target"
          name="target"
          value={formData.target || ''}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          {campaign ? 'Update Campaign' : 'Create Campaign'}
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;
