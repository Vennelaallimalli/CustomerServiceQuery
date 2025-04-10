import React, { useState } from 'react';
import RequestForm from './RequestForm';
import RequestList from './RequestList';

const categories = [
  'General Queries',
  'Product Features Queries',
  'Product Pricing Queries',
  'Product Feature Implementation Requests',
];

const CustomerSupportPage = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('supportUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [newRequest, setNewRequest] = useState(null); // for notifying new addition

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #8360c3, #2ebf91)',
      padding: '50px 20px',
      fontFamily: "'Segoe UI', sans-serif",
    },
    welcome: {
      textAlign: 'center',
      color: '#fff',
      fontSize: '36px',
      fontWeight: '700',
      marginBottom: '40px',
    },
    formWrapper: {
      maxWidth: '750px',
      margin: '0 auto 60px auto',
      padding: '30px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      padding: '25px',
      color: 'white',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      borderBottom: '1px solid rgba(255,255,255,0.4)',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-white bg-dark">
        <h3>Please log in again.</h3>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.welcome}>👋 Welcome, {user.name}</h1>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
  <button
    onClick={() => {
      localStorage.removeItem('supportUser');
      window.location.reload(); // or navigate to login
    }}
    style={{
      background: '#ff4d4d',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    }}
  >
    Logout
  </button>
</div>

      <div style={styles.formWrapper} className="text-white">
        <RequestForm
          userEmail={user.email}
          addRequestToList={(category, req) => setNewRequest(req)}
        />
      </div>

      <div style={styles.cardsGrid}>
        {categories.map((category) => (
          <div key={category} style={styles.card}>
            <h3 style={styles.cardTitle}>{category}</h3>
            <RequestList category={category} newRequest={newRequest} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerSupportPage;
