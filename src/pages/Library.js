import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlay, FiHeart, FiMoreVertical, FiPlus, FiTrash2, FiMusic } from 'react-icons/fi';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';



const LibraryContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const LibraryHeader = styled.div`
  margin-bottom: 3rem;
`;

const LibraryTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

const LibrarySubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const PlaylistCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const PlaylistCover = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: #667eea;
  border: none;
  border-radius: 50%;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  
  ${PlaylistCard}:hover & {
    opacity: 1;
  }
  
  &:hover {
    background: #5a6fd8;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const PlaylistInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`;

const PlaylistDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const PlaylistName = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlaylistStats = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

const PlaylistActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: #ffffff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CreatePlaylistCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  
  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
`;

const CreateIcon = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #667eea;
  font-size: 1.5rem;
`;

const CreateText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
  }
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

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(30, 60, 114, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  min-width: 150px;
  z-index: 100;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const PlaylistCardWrapper = styled.div`
  position: relative;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? 'rgba(102, 126, 234, 0.2)' : 'transparent'};
  border: none;
  border-radius: 8px;
  color: ${props => props.active ? '#667eea' : 'rgba(255, 255, 255, 0.7)'};
  font-size: 0.9rem;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
`;

const Library = () => {
  const [activeTab, setActiveTab] = useState('playlists');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const { 
    userPlaylists, 
    likedSongs, 
    playlist,
    currentTrack,
    isPlaying,
    createPlaylist,
    deletePlaylist,
    playTrack,
    toggleLike
  } = useMusicPlayer();

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setShowCreateModal(false);
    }
  };

  const handleDeletePlaylist = (playlistId, playlistName) => {
    if (window.confirm(`Are you sure you want to delete "${playlistName}"?`)) {
      deletePlaylist(playlistId);
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (playlistId) => {
    setOpenDropdown(openDropdown === playlistId ? null : playlistId);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);



  const likedTracks = playlist.filter(track => likedSongs.includes(track.id));

  const renderPlaylists = () => (
    <Grid>
      <CreatePlaylistCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setShowCreateModal(true)}
      >
        <CreateIcon>
          <FiPlus />
        </CreateIcon>
        <CreateText>Create New Playlist</CreateText>
      </CreatePlaylistCard>
      
      {userPlaylists.map((playlist, index) => (
        <PlaylistCardWrapper key={playlist.id}>
          <Link to={`/playlist/${playlist.id}`}>
            <PlaylistCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
            >
              <PlaylistCover>
                <CoverImage src={playlist.cover} alt={playlist.name} />
                <PlayButton>
                  <FiPlay />
                </PlayButton>
              </PlaylistCover>
              <PlaylistInfo>
                <PlaylistDetails>
                  <PlaylistName>{playlist.name}</PlaylistName>
                  <PlaylistStats>{playlist.tracks.length} tracks</PlaylistStats>
                </PlaylistDetails>
                <PlaylistActions>
                  <ActionButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleDropdown(playlist.id);
                    }}
                  >
                    <FiMoreVertical />
                  </ActionButton>
                </PlaylistActions>
              </PlaylistInfo>
            </PlaylistCard>
          </Link>
          
          {openDropdown === playlist.id && (
            <DropdownMenu
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DropdownItem onClick={() => handleDeletePlaylist(playlist.id, playlist.name)}>
                <FiTrash2 />
                Delete Playlist
              </DropdownItem>
            </DropdownMenu>
          )}
        </PlaylistCardWrapper>
      ))}
    </Grid>
  );

  const renderLikedSongs = () => (
    <>
      {likedTracks.length > 0 ? (
        <Grid>
          {likedTracks.map((track, index) => (
            <PlaylistCard
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => playTrack(track, index)}
            >
              <PlaylistCover>
                <CoverImage src={track.cover} alt={track.title} />
                <PlayButton>
                  {currentTrack?.id === track.id && isPlaying ? '⏸️' : '▶️'}
                </PlayButton>
              </PlaylistCover>
              <PlaylistInfo>
                <PlaylistDetails>
                  <PlaylistName>{track.title}</PlaylistName>
                  <PlaylistStats>{track.artist}</PlaylistStats>
                </PlaylistDetails>
                <PlaylistActions>
                  <ActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(track.id);
                    }}
                  >
                    <FiHeart fill="#ff6b6b" />
                  </ActionButton>
                  <ActionButton>
                    <FiMoreVertical />
                  </ActionButton>
                </PlaylistActions>
              </PlaylistInfo>
            </PlaylistCard>
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <h3>No liked songs yet</h3>
          <p>Start liking songs to see them here</p>
        </EmptyState>
      )}
    </>
  );



  return (
    <LibraryContainer>
      <LibraryHeader>
        <LibraryTitle>Your Library</LibraryTitle>
        <LibrarySubtitle>Manage your playlists and discover your music</LibrarySubtitle>
      </LibraryHeader>

      <TabsContainer>
        <Tab
          active={activeTab === 'playlists'}
          onClick={() => setActiveTab('playlists')}
        >
          Playlists ({userPlaylists.length})
        </Tab>
        <Tab
          active={activeTab === 'liked'}
          onClick={() => setActiveTab('liked')}
        >
          Liked Songs ({likedSongs.length})
        </Tab>

      </TabsContainer>

      {activeTab === 'playlists' && (
        <Section>
          <SectionTitle>
            <FiMusic />
            Your Playlists
          </SectionTitle>
          {renderPlaylists()}
        </Section>
      )}

      {activeTab === 'liked' && (
        <Section>
          <SectionTitle>
            <FiHeart />
            Liked Songs
          </SectionTitle>
          {renderLikedSongs()}
        </Section>
      )}



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
    </LibraryContainer>
  );
};

export default Library; 