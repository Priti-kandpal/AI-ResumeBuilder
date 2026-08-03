import React, { createContext, useState, useEffect } from 'react';
import storage from '../utils/storage';
import authService from '../services/authService';
import { message } from 'antd';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = storage.getToken();
    const storedUser = storage.getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    } else if (storedToken) {
      setToken(storedToken);
      setUser({
        name: 'User',
        email: 'user@example.com',
        role: 'Job Seeker',
      });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      const authToken = data.token || data.jwt || 'mock-jwt-token-xyz';
      const userData = data.user || {
        name: data.name || credentials.email.split('@')[0],
        email: credentials.email,
      };

      storage.setToken(authToken);
      storage.setUser(userData);
      setToken(authToken);
      setUser(userData);

      message.success('Welcome back! Successfully logged in.');
      return true;
    } catch (err) {
      console.warn('Backend login fallback:', err);
      if (err.code === 'ERR_NETWORK' || !err.response) {
        const fallbackToken = 'demo-jwt-token-12345';
        const fallbackUser = {
          name: credentials.email.split('@')[0] || 'Demo User',
          email: credentials.email,
          title: 'Full Stack Engineer',
        };
        storage.setToken(fallbackToken);
        storage.setUser(fallbackUser);
        setToken(fallbackToken);
        setUser(fallbackUser);
        message.info('Logged in with local demo credentials.');
        return true;
      }
      message.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      const authToken = data.token || 'demo-jwt-token-registered';
      const userObj = data.user || { name: userData.name, email: userData.email };

      storage.setToken(authToken);
      storage.setUser(userObj);
      setToken(authToken);
      setUser(userObj);

      message.success('Registration successful! Welcome aboard.');
      return true;
    } catch (err) {
      console.warn('Backend register fallback:', err);
      if (err.code === 'ERR_NETWORK' || !err.response) {
        const fallbackToken = 'demo-jwt-token-registered';
        const fallbackUser = { name: userData.name, email: userData.email, title: 'Job Seeker' };
        storage.setToken(fallbackToken);
        storage.setUser(fallbackUser);
        setToken(fallbackToken);
        setUser(fallbackUser);
        message.info('Registered with local session fallback.');
        return true;
      }
      message.error(err.response?.data?.message || 'Registration failed.');
      throw err;
    }
  };

  const logout = () => {
    storage.clearSession();
    setToken(null);
    setUser(null);
    message.success('You have logged out.');
  };

  const updateProfile = (updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    storage.setUser(newUser);
    message.success('Profile updated successfully!');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
