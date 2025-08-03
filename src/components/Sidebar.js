import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiSearch, 
  FiMusic, 
  FiHeart, 
  FiPlus,
  FiUser,
  FiChevronDown,
  FiChevronRight,
  FiPlay,
  FiX
} from 'react-icons/fi';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const SidebarContainer = styled.aside`
  width: 280px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1rem;
  overflow-y: auto;
  height: 100%;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: transparent;
  
  &.active {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #667eea;
  }
`;

const PlayIcon = styled(FiPlay)`
  opacity: 0;
  transition: opacity 0.2s ease;
  color: #667eea;
  font-size: 0.8rem;
`;

const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  color: #ffffff;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
    
    ${PlayIcon} {
      opacity: 1;
    }
  }
`;

const PlaylistCover = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const TrackCover = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const PlaylistName = styled.span`
  font-size: 0.9rem;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackName = styled.span`
  font-size: 0.9rem;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(255, 255, 255, 0.9);
`;

const CollapsibleSection = styled.div`
  margin-bottom: 1rem;
`;

const CollapsibleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.03);
    color: #ffffff;
  }
`;

const CollapsibleContent = styled(motion.div)`
  padding-left: 1rem;
`;

const CreatePlaylistButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #667eea;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.05);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.9rem;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.primary ? `
    background: #667eea;
    color: #ffffff;
    
    &:hover {
      background: #5a6fd8;
    }
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `}
`;

const Sidebar = () => {
  const { userPlaylists, recentlyPlayed, likedSongs, playTrack, createPlaylist } = useMusicPlayer();
  const [expandedSections, setExpandedSections] = useState({
    playlists: true,
    recent: true
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');



  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setShowCreateModal(false);
    }
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const navItems = [
    { path: '/', icon: FiHome, label: 'Home' },
    { path: '/search', icon: FiSearch, label: 'Search' },
    { path: '/library', icon: FiMusic, label: 'Library' },
    { path: '/profile', icon: FiUser, label: 'Profile' }
  ];

  return (
    <SidebarContainer>
      <Section>
        <SectionTitle>Navigation</SectionTitle>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
          >
            <item.icon size={18} />
            {item.label}
          </NavItem>
        ))}
      </Section>

      <Section>
        <CollapsibleSection>
          <CollapsibleHeader onClick={() => toggleSection('playlists')}>
            <SectionTitle style={{ margin: 0, padding: 0 }}>Your Playlists</SectionTitle>
            {expandedSections.playlists ? <FiChevronDown /> : <FiChevronRight />}
          </CollapsibleHeader>
          
          {expandedSections.playlists && (
            <CollapsibleContent
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <CreatePlaylistButton onClick={handleOpenCreateModal}>
                <FiPlus size={18} />
                Create Playlist
              </CreatePlaylistButton>
              
              {userPlaylists.length > 0 ? (
                userPlaylists.map((playlist) => (
                  <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
                    <PlaylistItem>
                      <PlaylistCover 
                        src={playlist.cover} 
                        alt={playlist.name}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center";
                        }}
                      />
                      <PlaylistName>{playlist.name}</PlaylistName>
                    </PlaylistItem>
                  </Link>
                ))
              ) : (
                <EmptyState>No playlists yet</EmptyState>
              )}
            </CollapsibleContent>
          )}
        </CollapsibleSection>
      </Section>

      <Section>
        <CollapsibleSection>
          <CollapsibleHeader onClick={() => toggleSection('recent')}>
            <SectionTitle style={{ margin: 0, padding: 0 }}>Recently Played</SectionTitle>
            {expandedSections.recent ? <FiChevronDown /> : <FiChevronRight />}
          </CollapsibleHeader>
          
          {expandedSections.recent && (
            <CollapsibleContent
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {recentlyPlayed.length > 0 ? (
                recentlyPlayed.map((track) => (
                  <PlaylistItem 
                    key={track.id} 
                    onClick={() => playTrack(track)}
                  >
                    <TrackCover 
                      src={track.cover} 
                      alt={track.title}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center";
                      }}
                    />
                    <TrackName>{track.title}</TrackName>
                    <PlayIcon />
                  </PlaylistItem>
                ))
              ) : (
                <EmptyState>No recent tracks</EmptyState>
              )}
            </CollapsibleContent>
          )}
        </CollapsibleSection>
      </Section>



      {/* Create Playlist Modal */}
      {showCreateModal && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCreateModal(false)}
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Create New Playlist</ModalTitle>
            <Input
              type="text"
              placeholder="Enter playlist name..."
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
              autoFocus
            />
            <ButtonGroup>
              <Button onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button primary onClick={handleCreatePlaylist}>
                Create
              </Button>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </SidebarContainer>
  );
};

export default Sidebar; 