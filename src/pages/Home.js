import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlay, FiHeart, FiMoreVertical } from 'react-icons/fi';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import { useAuth } from '../contexts/AuthContext';

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  margin-bottom: 3rem;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const WelcomeSubtitle = styled.p`
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

const TrackCard = styled(motion.div)`
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

const TrackCover = styled.div`
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
  
  ${TrackCard}:hover & {
    opacity: 1;
  }
  
  &:hover {
    background: #5a6fd8;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const TrackInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
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

const TrackActions = styled.div`
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
  
  &.liked {
    color: #ff6b6b;
  }
`;

const FeaturedSection = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
`;

const FeaturedTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const FeaturedDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
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

const Home = () => {
  const { user } = useAuth();
  const { 
    playlist, 
    recentlyPlayed, 
    likedSongs, 
    playTrack, 
    toggleLike,
    currentTrack,
    isPlaying
  } = useMusicPlayer();

  const handlePlayTrack = (track, index) => {
    playTrack(track, index);
  };

  const handleLikeTrack = (trackId) => {
    toggleLike(trackId);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <HomeContainer>
      <WelcomeSection>
        <WelcomeTitle>Welcome back, {user?.username}!</WelcomeTitle>
        <WelcomeSubtitle>Discover new music and enjoy your favorites</WelcomeSubtitle>
      </WelcomeSection>

      <FeaturedSection>
        <FeaturedTitle>Featured Tracks</FeaturedTitle>
        <FeaturedDescription>
          Handpicked songs for you to enjoy. From classic hits to modern favorites.
        </FeaturedDescription>
        <FeaturedGrid>
          {playlist.slice(0, 4).map((track, index) => (
            <TrackCard
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handlePlayTrack(track, index)}
            >
              <TrackCover>
                <CoverImage 
                  src={track.cover} 
                  alt={track.title}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center";
                  }}
                />
                <PlayButton>
                  {currentTrack?.id === track.id && isPlaying ? '⏸️' : '▶️'}
                </PlayButton>
              </TrackCover>
              <TrackInfo>
                <TrackDetails>
                  <TrackTitle>{track.title}</TrackTitle>
                  <TrackArtist>{track.artist}</TrackArtist>
                </TrackDetails>
                <TrackActions>
                  <ActionButton
                    className={likedSongs.includes(track.id) ? 'liked' : ''}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeTrack(track.id);
                    }}
                  >
                    <FiHeart fill={likedSongs.includes(track.id) ? '#ff6b6b' : 'none'} />
                  </ActionButton>
                  <ActionButton>
                    <FiMoreVertical />
                  </ActionButton>
                </TrackActions>
              </TrackInfo>
            </TrackCard>
          ))}
        </FeaturedGrid>
      </FeaturedSection>

      <Section>
        <SectionTitle>Recently Played</SectionTitle>
        {recentlyPlayed.length > 0 ? (
          <Grid>
            {recentlyPlayed.slice(0, 8).map((track, index) => (
              <TrackCard
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handlePlayTrack(track, playlist.findIndex(t => t.id === track.id))}
              >
                <TrackCover>
                  <CoverImage 
                    src={track.cover} 
                    alt={track.title}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center";
                    }}
                  />
                  <PlayButton>
                    {currentTrack?.id === track.id && isPlaying ? '⏸️' : '▶️'}
                  </PlayButton>
                </TrackCover>
                <TrackInfo>
                  <TrackDetails>
                    <TrackTitle>{track.title}</TrackTitle>
                    <TrackArtist>{track.artist}</TrackArtist>
                  </TrackDetails>
                  <TrackActions>
                    <ActionButton
                      className={likedSongs.includes(track.id) ? 'liked' : ''}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeTrack(track.id);
                      }}
                    >
                      <FiHeart fill={likedSongs.includes(track.id) ? '#ff6b6b' : 'none'} />
                    </ActionButton>
                    <ActionButton>
                      <FiMoreVertical />
                    </ActionButton>
                  </TrackActions>
                </TrackInfo>
              </TrackCard>
            ))}
          </Grid>
        ) : (
          <EmptyState>
            <h3>No recent tracks</h3>
            <p>Start listening to music to see your recently played tracks here</p>
          </EmptyState>
        )}
      </Section>

      <Section>
        <SectionTitle>All Tracks</SectionTitle>
        <Grid>
          {playlist.map((track, index) => (
            <TrackCard
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handlePlayTrack(track, index)}
            >
              <TrackCover>
                <CoverImage 
                  src={track.cover} 
                  alt={track.title}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center";
                  }}
                />
                <PlayButton>
                  {currentTrack?.id === track.id && isPlaying ? '⏸️' : '▶️'}
                </PlayButton>
              </TrackCover>
              <TrackInfo>
                <TrackDetails>
                  <TrackTitle>{track.title}</TrackTitle>
                  <TrackArtist>{track.artist}</TrackArtist>
                </TrackDetails>
                <TrackActions>
                  <ActionButton
                    className={likedSongs.includes(track.id) ? 'liked' : ''}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeTrack(track.id);
                    }}
                  >
                    <FiHeart fill={likedSongs.includes(track.id) ? '#ff6b6b' : 'none'} />
                  </ActionButton>
                  <ActionButton>
                    <FiMoreVertical />
                  </ActionButton>
                </TrackActions>
              </TrackInfo>
            </TrackCard>
          ))}
        </Grid>
      </Section>
    </HomeContainer>
  );
};

export default Home; 