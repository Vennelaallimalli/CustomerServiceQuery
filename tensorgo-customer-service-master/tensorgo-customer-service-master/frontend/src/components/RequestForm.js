import { useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';

const RequestForm = ({ userEmail, addRequestToList }) => {
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRequest = {
      userEmail,
      category,
      comment,
    };

    const response = await axios.post('http://localhost:5000/api/requests', newRequest);

    // Auto-update the parent state
    addRequestToList(category, newRequest);

    setCategory('');
    setComment('');
  };

  const pageStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1740&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  const cardStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '600px',
  };

  const labelStyle = {
    fontWeight: '500',
    marginBottom: '8px',
    display: 'block',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ced4da',
    marginBottom: '20px',
    fontSize: '15px',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#6f42c1',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '10px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '15px',
    transition: '0.3s',
  };

  return (
    <div style={pageStyle}>
      <form style={cardStyle} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4" style={{ fontWeight: 600, fontSize: '26px', color: '#333' }}>
          Submit Your Request
        </h2>

        <div className="form-group mb-3">
          <label style={labelStyle}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">Select Category</option>
            <option>General Queries</option>
            <option>Product Features Queries</option>
            <option>Product Pricing Queries</option>
            <option>Product Feature Implementation Requests</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label style={labelStyle}>Your Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            style={{ ...inputStyle, height: '120px', resize: 'none' }}
            placeholder="Write your message..."
          />
        </div>

        <button type="submit" style={buttonStyle}>
          <Send size={18} />
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
