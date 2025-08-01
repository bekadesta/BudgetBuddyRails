// src/App.js
import React, { useState } from 'react';
import './signin.css'; // Import external CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function App() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [isSignUpMode, setIsSignUpMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:3000/api/users',
        {
          user: { username: name, email, password },
        },
        { withCredentials: true }
      );

      setCurrentUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup failed', err.response?.data || err);
alert(JSON.stringify(err.response?.data));
    }
  };

const handleSignInFormSubmit = async (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;

  try {
    const res = await axios.post(
  'http://localhost:3000/login',
  { email, password },
  { withCredentials: true }
);
;

    setCurrentUser(res.data.user); // Set the user in global auth context
    navigate('/dashboard');        // Go to dashboard
  } catch (err) {
    console.error('Login failed', err.response?.data || err);
  }
};

  return (
    <div className="container">
      <div className="card">
        <div className={`panel left-panel ${isSignUpMode ? 'active' : ''}`}>
          {isSignUpMode ? (
            <>
              <h2 className="heading">Create Account</h2>
              <div className="social-icons">
                <a href="#" className="icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="icon"><i className="fab fa-google"></i></a>
              </div>
              <p className="or-text">or use your email for registration</p>

              <form onSubmit={handleSignUpFormSubmit} className="form">
                <div className="input-group">
                  <span className="input-icon"><i className="fas fa-user"></i></span>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <span className="input-icon"><i className="fas fa-envelope"></i></span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <span className="input-icon"><i className="fas fa-lock"></i></span>
                  <input
                    type="password"
                    placeholder="Password"      
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn signup">Sign Up</button>
              </form>
            </>
          ) : (
            <>
              <h2 className="welcome-heading">HELLO BUDDY!</h2>
              <p className="welcome-text">
                Enter your personal details and start your journey with us!
              </p>
              <button className="btn signup" onClick={() => setIsSignUpMode(true)}>Sign Up</button>
            </>
          )}
        </div>

        <div className={`panel right-panel ${isSignUpMode ? 'active' : ''}`}>
          {!isSignUpMode ? (
            <>
              <h2 className="heading">Sign In</h2>
              <div className="social-icons">
                <a href="#" className="icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="icon"><i className="fab fa-google"></i></a>
              </div>
              <p className="or-text">or use your email to login</p>

              <form onSubmit={handleSignInFormSubmit} className="form">
                <div className="input-group">
                  <span className="input-icon"><i className="fas fa-envelope"></i></span>
                  <input type="email" placeholder="Email" required />
                </div>
                <div className="input-group">
                  <span className="input-icon"><i className="fas fa-lock"></i></span>
                  <input type="password" placeholder="Password" required />
                </div>
                <button type="submit" className="btn signin">Sign In</button>
              </form>
            </>
          ) : (
            <>
              <h2 className="welcome-heading">Welcome Back!</h2>
              <p className="welcome-text">
                To stay connected with us please login with your personal information.
              </p>
              <button className="btn signin"  onSubmit={handleSignInFormSubmit}>Sign In</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
