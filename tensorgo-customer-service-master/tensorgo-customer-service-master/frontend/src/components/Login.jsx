import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = ({ setUser }) => {
  const containerStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1740&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const headingStyle = {
    fontWeight: '600',
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  };

  const subTextStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '30px',
  };

  const linkStyle = {
    fontSize: '14px',
    color: '#6f42c1',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Sign In</h2>
        <p style={subTextStyle}>Login using your Google account</p>

        <div className="d-flex justify-content-center mb-4">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);         
              localStorage.setItem('supportUser', JSON.stringify(decoded));
              setUser(decoded);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>

        <p className="mt-3 text-muted">
          Don’t have an account?{' '}
          <a href="#" style={linkStyle}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
