import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #667eea;
  }
`;



const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: #667eea;
  }
`;

const UserMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 0.5rem;
  min-width: 200px;
  z-index: 1001;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #ff6b6b;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(255, 107, 107, 0.05);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    z-index: 1002;
    padding: 2rem;
  }
`;

const MobileMenuItem = styled(Link)`
  display: block;
  padding: 1rem 0;
  color: #ffffff;
  text-decoration: none;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    color: #667eea;
  }
`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <NavbarContainer>
      <Logo to="/">
        <span className="gradient-text">🎵 Harmonia</span>
      </Logo>

      <UserSection>
        <UserAvatar
          src={user?.avatar}
          alt={user?.username}
          onClick={toggleUserMenu}
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='20' fill='%23667eea'/%3E%3Cpath d='M20 85 C20 65 80 65 80 85 L80 100 L20 100 Z' fill='%23667eea'/%3E%3C/svg%3E";
          }}
        />
        
        {showUserMenu && (
          <UserMenu
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <MenuItem to="/profile">
              <FiUser />
              Profile
            </MenuItem>
            <LogoutButton onClick={handleLogout}>
              <FiLogOut />
              Logout
            </LogoutButton>
          </UserMenu>
        )}
      </UserSection>

      <MobileMenuButton onClick={toggleMobileMenu}>
        {showMobileMenu ? <FiX /> : <FiMenu />}
      </MobileMenuButton>

      {showMobileMenu && (
        <MobileMenu
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MobileMenuItem to="/" onClick={() => setShowMobileMenu(false)}>
            Home
          </MobileMenuItem>
          <MobileMenuItem to="/search" onClick={() => setShowMobileMenu(false)}>
            Search
          </MobileMenuItem>
          <MobileMenuItem to="/library" onClick={() => setShowMobileMenu(false)}>
            Library
          </MobileMenuItem>
          <MobileMenuItem to="/profile" onClick={() => setShowMobileMenu(false)}>
            Profile
          </MobileMenuItem>
          <LogoutButton onClick={handleLogout}>
            <FiLogOut />
            Logout
          </LogoutButton>
        </MobileMenu>
      )}
    </NavbarContainer>
  );
};

export default Navbar; 