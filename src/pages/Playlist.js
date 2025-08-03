import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiHeart, FiMoreVertical, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const PlaylistContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PlaylistHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PlaylistCover = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaylistInfo = styled.div`
  flex: 1;
`;

const PlaylistTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

const PlaylistStats = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
`;

const PlaylistActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.primary ? '#667eea' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.primary ? '#667eea' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 8px;
  color: ${props => props.primary ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.primary ? '#5a6fd8' : 'rgba(255, 255, 255, 0.15)'};
    transform: translateY(-2px);
  }
  
  &.danger {
    background: rgba(255, 107, 107, 0.1);
    border-color: #ff6b6b;
    color: #ff6b6b;
    
    &:hover {
      background: rgba(255, 107, 107, 0.2);
    }
  }
`;

const TracksSection = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TracksList = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  overflow: hidden;
`;

const TrackItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &.playing {
    background: rgba(102, 126, 234, 0.1);
  }
`;

const TrackNumber = styled.div`
  width: 30px;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
`;

const TrackCover = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 6px;
  overflow: hidden;
`;

const TrackCoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TrackPlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: rgba(102, 126, 234, 0.9);
  border: none;
  border-radius: 50%;
  color: #ffffff;
  font-size: 0.8rem;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  
  ${TrackItem}:hover & {
    opacity: 1;
  }
`;

const TrackDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const TrackTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackArtist = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackDuration = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-right: 1rem;
`;

const TrackActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TrackActionButton = styled.button`
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
  
  &.liked {
    color: #ff6b6b;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.6);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const AddTracksButton = styled.button`
  padding: 1rem 2rem;
  background: #667eea;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  
  &:hover {
    background: #5a6fd8;
    transform: translateY(-2px);
  }
`;

const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Playlist = () => {
  const { id } = useParams();
  const { 
    userPlaylists, 
    playlist: allTracks,
    likedSongs, 
    playTrack, 
    toggleLike,
    currentTrack,
    isPlaying,
    addToPlaylist,
    removeFromPlaylist
  } = useMusicPlayer();

  const [showAddTracks, setShowAddTracks] = useState(false);

  const currentPlaylist = userPlaylists.find(p => p.id === parseInt(id));
  
  if (!currentPlaylist) {
    return (
      <PlaylistContainer>
        <EmptyState>
          <h3>Playlist not found</h3>
          <p>The playlist you're looking for doesn't exist or has been deleted.</p>
          <Link to="/library">
            <ActionButton primary>Back to Library</ActionButton>
          </Link>
        </EmptyState>
      </PlaylistContainer>
    );
  }

  const handlePlayTrack = (track, index) => {
    const originalIndex = allTracks.findIndex(t => t.id === track.id);
    playTrack(track, originalIndex);
  };

  const handleLikeTrack = (trackId) => {
    toggleLike(trackId);
  };

  const handleRemoveTrack = (trackId) => {
    removeFromPlaylist(currentPlaylist.id, trackId);
  };

  const handleAddTrack = (track) => {
    addToPlaylist(currentPlaylist.id, track);
  };

  const availableTracks = allTracks.filter(track => 
    !currentPlaylist.tracks.some(pt => pt.id === track.id)
  );

  return (
    <PlaylistContainer>
      <PlaylistHeader>
        <PlaylistCover>
          <CoverImage src={currentPlaylist.cover} alt={currentPlaylist.name} />
        </PlaylistCover>
        
        <PlaylistInfo>
          <PlaylistTitle>{currentPlaylist.name}</PlaylistTitle>
          <PlaylistStats>
            {currentPlaylist.tracks.length} tracks • Created by you
          </PlaylistStats>
          
          <PlaylistActions>
            <ActionButton primary>
              <FiPlay />
              Play All
            </ActionButton>
            <ActionButton onClick={() => setShowAddTracks(!showAddTracks)}>
              <FiPlus />
              Add Tracks
            </ActionButton>
            <ActionButton className="danger">
              <FiTrash2 />
              Delete Playlist
            </ActionButton>
          </PlaylistActions>
        </PlaylistInfo>
      </PlaylistHeader>

      <TracksSection>
        <SectionTitle>
          Tracks ({currentPlaylist.tracks.length})
          {showAddTracks && (
            <ActionButton onClick={() => setShowAddTracks(false)}>
              Cancel
            </ActionButton>
          )}
        </SectionTitle>

        {currentPlaylist.tracks.length > 0 ? (
          <TracksList>
            {currentPlaylist.tracks.map((track, index) => (
              <TrackItem
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={currentTrack?.id === track.id ? 'playing' : ''}
                onClick={() => handlePlayTrack(track, index)}
              >
                <TrackNumber>{index + 1}</TrackNumber>
                <TrackCover>
                  <TrackCoverImage src={track.cover} alt={track.title} />
                  <TrackPlayButton>
                    {currentTrack?.id === track.id && isPlaying ? '⏸️' : '▶️'}
                  </TrackPlayButton>
                </TrackCover>
                <TrackDetails>
                  <TrackTitle>{track.title}</TrackTitle>
                  <TrackArtist>{track.artist}</TrackArtist>
                </TrackDetails>
                <TrackDuration>{formatDuration(track.duration)}</TrackDuration>
                <TrackActions>
                  <TrackActionButton
                    className={likedSongs.includes(track.id) ? 'liked' : ''}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeTrack(track.id);
                    }}
                  >
                    <FiHeart fill={likedSongs.includes(track.id) ? '#ff6b6b' : 'none'} />
                  </TrackActionButton>
                  <TrackActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTrack(track.id);
                    }}
                  >
                    <FiTrash2 />
                  </TrackActionButton>
                </TrackActions>
              </TrackItem>
            ))}
          </TracksList>
        ) : (
          <EmptyState>
            <h3>No tracks in this playlist</h3>
            <p>Start adding your favorite songs to this playlist.</p>
            <AddTracksButton onClick={() => setShowAddTracks(true)}>
              <FiPlus />
              Add Tracks
            </AddTracksButton>
          </EmptyState>
        )}
      </TracksSection>

      {showAddTracks && (
        <TracksSection>
          <SectionTitle>Available Tracks</SectionTitle>
          {availableTracks.length > 0 ? (
            <TracksList>
              {availableTracks.map((track, index) => (
                <TrackItem
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleAddTrack(track)}
                >
                  <TrackNumber>+</TrackNumber>
                  <TrackCover>
                    <TrackCoverImage src={track.cover} alt={track.title} />
                  </TrackCover>
                  <TrackDetails>
                    <TrackTitle>{track.title}</TrackTitle>
                    <TrackArtist>{track.artist}</TrackArtist>
                  </TrackDetails>
                  <TrackDuration>{formatDuration(track.duration)}</TrackDuration>
                  <TrackActions>
                    <TrackActionButton
                      className={likedSongs.includes(track.id) ? 'liked' : ''}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeTrack(track.id);
                      }}
                    >
                      <FiHeart fill={likedSongs.includes(track.id) ? '#ff6b6b' : 'none'} />
                    </TrackActionButton>
                    <TrackActionButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddTrack(track);
                      }}
                    >
                      <FiPlus />
                    </TrackActionButton>
                  </TrackActions>
                </TrackItem>
              ))}
            </TracksList>
          ) : (
            <EmptyState>
              <h3>No available tracks</h3>
              <p>All tracks are already in this playlist.</p>
            </EmptyState>
          )}
        </TracksSection>
      )}
    </PlaylistContainer>
  );
};

export default Playlist; 