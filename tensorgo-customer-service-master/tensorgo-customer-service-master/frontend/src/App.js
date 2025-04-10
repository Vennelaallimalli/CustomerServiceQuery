import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import CustomerSupportPage from './components/CustomerSupportPage';

function App() {
  const [user, setUser] = useState(null);

  // Load from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem('supportUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId="858018741524-m92tfs9g1jgi6de7aqiu8gcogv56tinr.apps.googleusercontent.com">
      <div className="App">
        {!user ? (
          <Login setUser={(decoded) => {
            localStorage.setItem('supportUser', JSON.stringify(decoded));
            setUser(decoded);
          }} />
        ) : (
          <CustomerSupportPage userEmail={user.email} userName={user.name} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
