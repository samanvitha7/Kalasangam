import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/api';
import './AdminPanel.css';

const AdminPanel = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({});
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
    fetchStats();
  }, [filter]);

  const fetchReports = async () => {
    try {
      const filters = filter !== 'all' ? { status: filter } : {};
      const data = await adminApi.getReports(filters);
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setReports(data);
      } else {
        console.error('API returned non-array data:', data);
        setReports([]);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError(`Error fetching reports: ${err.message || 'Unknown error'}`);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await adminApi.getReportStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleStatusUpdate = async (reportId, newStatus, notes = '') => {
    try {
      // Map frontend status to backend status
      const backendStatus = newStatus === 'approved' ? 'resolved' : newStatus === 'rejected' ? 'dismissed' : newStatus;
      
      await adminApi.updateReportStatus(reportId, backendStatus, notes);
      
      setReports(reports.map(report => 
        report._id === reportId 
          ? { ...report, status: newStatus, adminNotes: notes, reviewedAt: new Date() }
          : report
      ));
      setSelectedReport(null);
      fetchStats(); // Refresh stats
    } catch (err) {
      setError(err.message || 'Error updating report');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffa726';
      case 'approved': return '#66bb6a';
      case 'rejected': return '#ef5350';
      default: return '#757575';
    }
  };

  const getReasonIcon = (reason) => {
    switch (reason) {
      case 'inappropriate': return '⚠️';
      case 'spam': return '🚫';
      case 'copyright': return '©️';
      case 'harassment': return '🛡️';
      case 'other': return '❓';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <div className="admin-panel">
        <div className="loading">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">{stats.total || 0}</span>
            <span className="stat-label">Total Reports</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.pending || 0}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.approved || 0}</span>
            <span className="stat-label">Approved</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.rejected || 0}</span>
            <span className="stat-label">Rejected</span>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-controls">
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All Reports
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={filter === 'approved' ? 'active' : ''}
            onClick={() => setFilter('approved')}
          >
            Approved
          </button>
          <button 
            className={filter === 'rejected' ? 'active' : ''}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="reports-container">
        {reports.length === 0 ? (
          <div className="no-reports">No reports found for the selected filter.</div>
        ) : (
          <div className="reports-grid">
            {reports.map(report => (
              <div key={report._id} className="report-card">
                <div className="report-header">
                  <div className="report-type">
                    <span className="type-icon">{getReasonIcon(report.reason)}</span>
                    <span className="type-text">{report.reason}</span>
                  </div>
                  <div 
                    className="report-status"
                    style={{ backgroundColor: getStatusColor(report.status) }}
                  >
                    {report.status}
                  </div>
                </div>

                <div className="report-content">
                  <div className="report-target">
                    <strong>Target:</strong> {report.targetType} 
                    {report.targetArtist && ` by ${report.targetArtist.name}`}
                  </div>
                  
                  <div className="report-description">
                    <strong>Description:</strong>
                    <p>{report.description}</p>
                  </div>

                  <div className="report-reporter">
                    <strong>Reported by:</strong> {report.reportedBy.name}
                  </div>

                  <div className="report-date">
                    <strong>Submitted:</strong> {new Date(report.createdAt).toLocaleDateString()}
                  </div>

                  {report.adminNotes && (
                    <div className="admin-notes">
                      <strong>Admin Notes:</strong>
                      <p>{report.adminNotes}</p>
                    </div>
                  )}
                </div>

                {report.status === 'pending' && (
                  <div className="report-actions">
                    <button 
                      className="approve-btn"
                      onClick={() => setSelectedReport(report)}
                    >
                      Review
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedReport && (
        <div className="modal-overlay">
          <div className="review-modal">
            <div className="modal-header">
              <h2>Review Report</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedReport(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="report-details">
                <p><strong>Type:</strong> {selectedReport.reason}</p>
                <p><strong>Target:</strong> {selectedReport.targetType}</p>
                <p><strong>Description:</strong> {selectedReport.description}</p>
                <p><strong>Reported by:</strong> {selectedReport.reportedBy.name}</p>
              </div>

              <div className="admin-notes-input">
                <label htmlFor="adminNotes">Admin Notes (optional):</label>
                <textarea
                  id="adminNotes"
                  placeholder="Add notes about your decision..."
                  rows="4"
                />
              </div>

              <div className="modal-actions">
                <button 
                  className="approve-btn"
                  onClick={() => {
                    const notes = document.getElementById('adminNotes').value;
                    handleStatusUpdate(selectedReport._id, 'approved', notes);
                  }}
                >
                  Approve Report
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => {
                    const notes = document.getElementById('adminNotes').value;
                    handleStatusUpdate(selectedReport._id, 'rejected', notes);
                  }}
                >
                  Reject Report
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => setSelectedReport(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
