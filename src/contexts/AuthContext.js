import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('musicAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate authentication - in a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            id: Date.now(),
            email,
            username: email.split('@')[0],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            createdAt: new Date().toISOString()
          };
          setUser(userData);
          localStorage.setItem('musicAppUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = (email, password, username) => {
    // Simulate registration - in a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && username) {
          const userData = {
            id: Date.now(),
            email,
            username,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            createdAt: new Date().toISOString()
          };
          setUser(userData);
          localStorage.setItem('musicAppUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Please fill in all fields'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('musicAppUser');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('musicAppUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 