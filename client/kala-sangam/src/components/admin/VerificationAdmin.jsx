import React, { useState, useEffect } from 'react';
import { verificationApi } from '../../services/verificationApi';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  FaCheck, 
  FaTimes, 
  FaEye, 
  FaFileAlt, 
  FaUser, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle,
  FaDownload,
  FaExternalLinkAlt 
} from 'react-icons/fa';

const VerificationAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'Admin') {
      fetchRequests();
      fetchStats();
    }
  }, [user, filter]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await verificationApi.getPendingVerifications();
      if (response.success) {
        setRequests(response.pendingRequests || []);
      }
    } catch (error) {
      console.error('Error fetching verification requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await verificationApi.getVerificationStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleApproval = async (requestId, approved, reason = '') => {
    try {
      const action = approved ? 'approve' : 'reject';
      const response = await verificationApi.reviewVerification(requestId, action, reason);
      if (response.success) {
        // Refresh the requests list
        fetchRequests();
        fetchStats();
        setSelectedRequest(null);
        
        // Show success message
        alert(`Request ${approved ? 'approved' : 'rejected'} successfully!`);
      } else {
        alert(response.message || 'Failed to process request');
      }
    } catch (error) {
      console.error('Error processing request:', error);
      alert('Failed to process request');
    }
  };

  const RequestCard = ({ request }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-semibold text-gray-900">{request.name}</h3>
              <p className="text-sm text-gray-600">{request.email}</p>
            </div>
          </div>
          
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${request.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
            ${request.verificationStatus === 'approved' ? 'bg-green-100 text-green-800' : ''}
            ${request.verificationStatus === 'rejected' ? 'bg-red-100 text-red-800' : ''}
          `}>
            {request.verificationStatus?.charAt(0).toUpperCase() + request.verificationStatus?.slice(1)}
          </span>
        </div>

        <div className="space-y-3 mb-4">
          {request.artistName && (
            <div>
              <span className="text-sm font-medium text-gray-700">Artist Name:</span>
              <p className="text-sm text-gray-900">{request.artistName}</p>
            </div>
          )}
          
          {request.specialization && (
            <div>
              <span className="text-sm font-medium text-gray-700">Specialization:</span>
              <p className="text-sm text-gray-900">{request.specialization}</p>
            </div>
          )}
          
          {request.experience && (
            <div>
              <span className="text-sm font-medium text-gray-700">Experience:</span>
              <p className="text-sm text-gray-900">{request.experience} years</p>
            </div>
          )}
          
          {request.portfolio && (
            <div>
              <span className="text-sm font-medium text-gray-700">Portfolio:</span>
              <a 
                href={request.portfolio} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                View Portfolio <FaExternalLinkAlt size={10} />
              </a>
            </div>
          )}
          
          <div>
            <span className="text-sm font-medium text-gray-700">Documents:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {request.documents && request.documents.map((doc, index) => (
                <a
                  key={index}
                  href={doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100"
                >
                  <FaFileAlt size={10} />
                  Document {index + 1}
                  <FaDownload size={10} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>Submitted: {new Date(request.createdAt).toLocaleDateString()}</span>
          {request.reviewedAt && (
            <span>Reviewed: {new Date(request.reviewedAt).toLocaleDateString()}</span>
          )}
        </div>

        {request.adminReason && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Admin Note:</span>
            <p className="text-sm text-gray-900 mt-1">{request.adminReason}</p>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedRequest(request)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaEye size={14} />
            View Details
          </button>
          
          {request.status === 'pending' && (
            <>
              <button
                onClick={() => handleApproval(request._id, true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaCheck size={14} />
                Approve
              </button>
              <button
                onClick={() => setSelectedRequest(request)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaTimes size={14} />
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  const RequestModal = ({ request, onClose }) => {
    const [reason, setReason] = useState('');
    const [actionType, setActionType] = useState(null);

    const handleSubmit = (approved) => {
      if (!approved && !reason.trim()) {
        alert('Please provide a reason for rejection');
        return;
      }
      handleApproval(request._id, approved, reason);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Verification Request Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-lg">{request.userId?.name}</h3>
                  <p className="text-gray-600">{request.userId?.email}</p>
                  <span className={`
                    inline-block px-2 py-1 rounded-full text-xs font-medium mt-1
                    ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${request.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                    ${request.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* All request details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries({
                  'Artist Name': request.artistName,
                  'Specialization': request.specialization,
                  'Experience': request.experience ? `${request.experience} years` : null,
                  'Portfolio': request.portfolio,
                  'Social Media': request.socialMedia,
                  'Bio': request.bio
                }).map(([key, value]) => (
                  value && (
                    <div key={key} className="p-3 border rounded-lg">
                      <span className="font-medium text-gray-700">{key}:</span>
                      {key === 'Portfolio' ? (
                        <a 
                          href={value} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block text-blue-600 hover:text-blue-800 break-all"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-gray-900 mt-1">{value}</p>
                      )}
                    </div>
                  )
                ))}
              </div>

              {/* Documents */}
              {request.documents && request.documents.length > 0 && (
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Documents:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {request.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                      >
                        <FaFileAlt />
                        <span className="text-sm">Document {index + 1}</span>
                        <FaDownload size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {request.status === 'pending' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Note (optional for approval, required for rejection):
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Add a note about your decision..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleSubmit(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaCheckCircle />
                    Approve Request
                  </button>
                  <button
                    onClick={() => handleSubmit(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FaTimesCircle />
                    Reject Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  if (user?.role !== 'Admin') {
    return (
      <div className="text-center py-8">
        <FaUser className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-600">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Verification Management</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-blue-700">Total Requests</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-yellow-700">Pending</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-green-700">Approved</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-red-700">Rejected</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        {['pending', 'approved', 'rejected', 'all'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`
              flex-1 py-2 px-4 rounded-md transition-all duration-200 capitalize
              ${filter === status 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {status} ({
              status === 'all' ? stats.total :
              status === 'pending' ? stats.pending :
              status === 'approved' ? stats.approved :
              stats.rejected
            })
          </button>
        ))}
      </div>

      {/* Requests List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading verification requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <FaClock className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No {filter !== 'all' ? filter : ''} verification requests found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {requests.map((request) => (
            <RequestCard key={request._id} request={request} />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
};

export default VerificationAdmin;
