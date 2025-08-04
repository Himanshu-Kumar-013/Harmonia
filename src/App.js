import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MusicPlayerProvider } from './contexts/MusicPlayerContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Library from './pages/Library';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Playlist from './pages/Playlist';
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 50%, #0a0a0a 100%);
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
`;

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { user } = useAuth();

  return (
    <AppContainer>
      {user && <Navbar />}
      <MainContent>
        {user && <Sidebar />}
        <ContentArea>
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/library" element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/playlist/:id" element={
              <ProtectedRoute>
                <Playlist />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ContentArea>
      </MainContent>
      {user && <MusicPlayer />}
    </AppContainer>
  );
}

function App() {
  return (
    <AuthProvider>
      <MusicPlayerProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <GlobalStyles />
          <AppContent />
        </Router>
      </MusicPlayerProvider>
    </AuthProvider>
  );
}

export default App; 