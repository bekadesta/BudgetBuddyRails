import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start as true

  useEffect(() => {
    // Check session on mount
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/users', { withCredentials: true });

;
        setCurrentUser(res.data.user);
      } catch (err) {
        setCurrentUser(null); // not logged in
      } finally {
        setLoading(false); // ✅ Set loading to false either way
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
