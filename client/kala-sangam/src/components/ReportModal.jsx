import React, { useState } from 'react';
import './ReportModal.css';

const ReportModal = ({ isOpen, onClose, reportType, targetId, targetName }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportReasons = {
    artwork: [
      'Inappropriate Content',
      'Copyright Infringement',
      'Offensive Material',
      'Spam or Misleading',
      'Poor Quality',
      'Other'
    ],
    artist: [
      'Inappropriate Behavior',
      'Fake Profile',
      'Harassment',
      'Spam Content',
      'Impersonation',
      'Other'
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedReason) {
      alert('Please select a reason for reporting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          reportType,
          targetId,
          reason: selectedReason,
          description: description.trim(),
        }),
      });

      if (response.ok) {
        alert('Report submitted successfully. Thank you for helping keep our community safe.');
        handleClose();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to submit report. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedReason('');
    setDescription('');
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  const reasons = reportReasons[reportType] || [];

  return (
    <div className="report-modal-overlay" onClick={handleClose}>
      <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="report-modal-header">
          <h2>Report {reportType === 'artwork' ? 'Artwork' : 'Artist'}</h2>
          <button 
            className="report-modal-close-btn"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <div className="report-modal-body">
          <p className="report-target-info">
            Reporting: <strong>{targetName || `${reportType} #${targetId}`}</strong>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="report-form-group">
              <label>Reason for reporting:</label>
              <div className="report-reasons-list">
                {reasons.map((reason) => (
                  <label key={reason} className="report-reason-option">
                    <input
                      type="radio"
                      name="reason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="report-form-group">
              <label htmlFor="description">
                Additional details (optional):
              </label>
              <textarea
                id="description"
                placeholder="Please provide any additional context or details about this report..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                maxLength={1000}
                disabled={isSubmitting}
              />
              <small className="char-count">
                {description.length}/1000 characters
              </small>
            </div>

            <div className="report-modal-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-submit-report"
                disabled={!selectedReason || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
