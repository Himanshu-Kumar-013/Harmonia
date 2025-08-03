import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiPlay, FiHeart, FiMoreVertical } from 'react-icons/fi';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const SearchContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchHeader = styled.div`
  margin-bottom: 2rem;
`;

const SearchTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

const SearchSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

const SearchInput = styled.div`
  position: relative;
  max-width: 500px;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
`;

const ResultsSection = styled.section`
  margin-bottom: 2rem;
`;

const ResultsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const ResultsCount = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
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
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.active ? '#667eea' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 20px;
  color: ${props => props.active ? '#667eea' : '#ffffff'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filter, setFilter] = useState('all');
  
  const { 
    playlist, 
    likedSongs, 
    currentTrack,
    isPlaying,
    playTrack, 
    toggleLike
  } = useMusicPlayer();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTracks = playlist.filter(track => {
    const matchesSearch = searchQuery === '' || 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (filter) {
      case 'liked':
        return likedSongs.includes(track.id);
      case 'rock':
        return track.genre.toLowerCase() === 'rock';
      case 'pop':
        return track.genre.toLowerCase() === 'pop';
      default:
        return true;
    }
  });

  const handlePlayTrack = (track, index) => {
    const originalIndex = playlist.findIndex(t => t.id === track.id);
    playTrack(track, originalIndex);
  };

  const handleLikeTrack = (trackId) => {
    toggleLike(trackId);
  };

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchTitle>Search</SearchTitle>
        <SearchSubtitle>Find your favorite songs, artists, and albums</SearchSubtitle>
        
        <SearchInput>
          <form onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="Search for songs, artists, albums, or genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon />
          </form>
        </SearchInput>

        <FilterSection>
          <FilterButton
            active={filter === 'all'}
            onClick={() => handleFilterChange('all')}
          >
            All
          </FilterButton>
          <FilterButton
            active={filter === 'liked'}
            onClick={() => handleFilterChange('liked')}
          >
            Liked
          </FilterButton>
          <FilterButton
            active={filter === 'rock'}
            onClick={() => handleFilterChange('rock')}
          >
            Rock
          </FilterButton>
          <FilterButton
            active={filter === 'pop'}
            onClick={() => handleFilterChange('pop')}
          >
            Pop
          </FilterButton>
        </FilterSection>
      </SearchHeader>

      <ResultsSection>
        <ResultsTitle>
          {searchQuery ? `Search results for "${searchQuery}"` : 'All tracks'}
        </ResultsTitle>
        <ResultsCount>
          {filteredTracks.length} {filteredTracks.length === 1 ? 'track' : 'tracks'} found
        </ResultsCount>

        {filteredTracks.length > 0 ? (
          <Grid>
            {filteredTracks.map((track, index) => (
              <TrackCard
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handlePlayTrack(track, index)}
              >
                <TrackCover>
                  <CoverImage src={track.cover} alt={track.title} />
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
            <h3>No tracks found</h3>
            <p>
              {searchQuery 
                ? `No tracks match your search for "${searchQuery}". Try different keywords or browse all tracks.`
                : 'No tracks available. Please check back later.'
              }
            </p>
          </EmptyState>
        )}
      </ResultsSection>
    </SearchContainer>
  );
};

export default Search; 