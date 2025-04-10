import { useState, useEffect } from 'react';
import axios from 'axios';

const RequestList = ({ category, newRequest }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/requests/${category}`)
      .then((res) => setRequests(res.data));
  }, [category]);

  useEffect(() => {
    if (newRequest && newRequest.category === category) {
      setRequests((prev) => [newRequest, ...prev]);
    }
  }, [newRequest, category]);

  const containerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '700px',
    margin: '40px auto',
  };

  const cardStyle = {
    backgroundColor: '#f8f9fa',
    padding: '15px 20px',
    borderRadius: '12px',
    border: '1px solid #dee2e6',
    marginBottom: '15px',
  };

  const emailStyle = {
    fontWeight: 600,
    color: '#343a40',
    marginBottom: '5px',
  };

  const commentStyle = {
    fontSize: '14px',
    color: '#495057',
  };

  const noDataStyle = {
    fontStyle: 'italic',
    fontSize: '14px',
    color: '#6c757d',
  };

  return (
    <div style={containerStyle}>
      <h4 className="mb-4 text-center" style={{ fontWeight: 600 }}>
        Requests - {category}
      </h4>

      {requests.length === 0 ? (
        <p style={noDataStyle}>No requests found in this category.</p>
      ) : (
        requests.map((req, index) => (
          <div key={index} style={cardStyle}>
            <p style={emailStyle}>{req.userEmail}</p>
            <p style={commentStyle}>{req.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RequestList;
