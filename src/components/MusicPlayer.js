import React, { useState } from 'react';
import styled from 'styled-components';

import { 
  FiPlay, 
  FiPause, 
  FiSkipBack, 
  FiSkipForward, 
  FiShuffle, 
  FiRepeat,
  FiVolume2,
  FiVolumeX,
  FiHeart,
  FiMoreVertical,
  FiChevronDown,
  FiChevronUp,
  FiX
} from 'react-icons/fi';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(25px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.minimized ? 'translateY(calc(100% - 60px))' : 'translateY(0)'};
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.5);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent);
  }
`;

const PlayerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 200px;
  flex-shrink: 0;
`;

const TrackCover = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }
`;

const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const TrackTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

const TrackArtist = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
`;

const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.active ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border: none;
  color: ${props => props.active ? '#667eea' : '#ffffff'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    
    &::before {
      opacity: 1;
    }
  }
  
  &.play-pause {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #5a6fd8 0%, #6a4ba2 100%);
      transform: scale(1.15);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
  width: ${props => props.progress}%;
  transition: width 0.1s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ProgressHandle = styled.div`
  position: absolute;
  top: 50%;
  left: ${props => props.progress}%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  ${ProgressBar}:hover & {
    opacity: 1;
  }
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.25rem;
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;
`;

const VolumeSlider = styled.input`
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: #667eea;
    border-radius: 50%;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #667eea;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

const MinimizeButton = styled.button`
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 5rem;
  transform: translateY(-50%);
  background: rgba(255, 107, 107, 0.1);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff6b6b;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 107, 107, 0.2);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const MinimizedContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const MinimizedTrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

const MinimizedTrackCover = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
`;

const MinimizedTrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const MinimizedTrackTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

const MinimizedTrackArtist = styled.p`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

const MinimizedControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const MusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    shuffle,
    repeat,
    playPause,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    likedSongs,
    closePlayer
  } = useMusicPlayer();

  const [isMinimized, setIsMinimized] = useState(false);

  if (!currentTrack) {
    return null;
  }

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const isLiked = likedSongs.includes(currentTrack.id);

  return (
    <PlayerContainer minimized={isMinimized}>
      {isMinimized ? (
        <MinimizedContent>
                      <MinimizedTrackInfo>
              <MinimizedTrackCover 
                src={currentTrack.cover} 
                alt={currentTrack.title}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center";
                }}
              />
              <MinimizedTrackDetails>
              <MinimizedTrackTitle>{currentTrack.title}</MinimizedTrackTitle>
              <MinimizedTrackArtist>{currentTrack.artist}</MinimizedTrackArtist>
            </MinimizedTrackDetails>
          </MinimizedTrackInfo>
          
          <MinimizedControls>
            <ControlButton onClick={playPrevious}>
              <FiSkipBack />
            </ControlButton>
            <ControlButton 
              className="play-pause"
              onClick={playPause}
            >
              {isPlaying ? <FiPause /> : <FiPlay />}
            </ControlButton>
            <ControlButton onClick={playNext}>
              <FiSkipForward />
            </ControlButton>
            <ControlButton onClick={() => toggleLike(currentTrack.id)}>
              <FiHeart fill={isLiked ? '#ff6b6b' : 'none'} color={isLiked ? '#ff6b6b' : '#ffffff'} />
            </ControlButton>
          </MinimizedControls>
          
          <CloseButton onClick={closePlayer}>
            <FiX />
          </CloseButton>
          <MinimizeButton onClick={() => setIsMinimized(false)}>
            <FiChevronUp />
          </MinimizeButton>
        </MinimizedContent>
      ) : (
        <>
          <PlayerContent>
            <TrackInfo>
              <TrackCover 
                src={currentTrack.cover} 
                alt={currentTrack.title}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center";
                }}
              />
              <TrackDetails>
                <TrackTitle>{currentTrack.title}</TrackTitle>
                <TrackArtist>{currentTrack.artist}</TrackArtist>
              </TrackDetails>
              <ControlButton onClick={() => toggleLike(currentTrack.id)}>
                <FiHeart fill={isLiked ? '#ff6b6b' : 'none'} color={isLiked ? '#ff6b6b' : '#ffffff'} />
              </ControlButton>
              <ControlButton>
                <FiMoreVertical />
              </ControlButton>
            </TrackInfo>

            <Controls>
              <ControlButtons>
                <ControlButton 
                  onClick={toggleShuffle}
                  active={shuffle}
                >
                  <FiShuffle />
                </ControlButton>
                <ControlButton onClick={playPrevious}>
                  <FiSkipBack />
                </ControlButton>
                <ControlButton 
                  className="play-pause"
                  onClick={playPause}
                >
                  {isPlaying ? <FiPause /> : <FiPlay />}
                </ControlButton>
                <ControlButton onClick={playNext}>
                  <FiSkipForward />
                </ControlButton>
                <ControlButton 
                  onClick={toggleRepeat}
                  active={repeat !== 'none'}
                >
                  <FiRepeat />
                  {repeat === 'one' && (
                    <span style={{ fontSize: '0.6rem', position: 'absolute', bottom: '2px' }}>1</span>
                  )}
                </ControlButton>
              </ControlButtons>

              <ProgressContainer>
                <ProgressBar onClick={handleProgressClick}>
                  <ProgressFill progress={(progress / duration) * 100} />
                  <ProgressHandle progress={(progress / duration) * 100} />
                </ProgressBar>
                <TimeDisplay>
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </TimeDisplay>
              </ProgressContainer>
            </Controls>

            <VolumeControl>
              <ControlButton onClick={() => setVolume(volume === 0 ? 0.7 : 0)}>
                {volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
              </ControlButton>
              <VolumeSlider
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </VolumeControl>
          </PlayerContent>
          
          <CloseButton onClick={closePlayer}>
            <FiX />
          </CloseButton>
          <MinimizeButton onClick={() => setIsMinimized(true)}>
            <FiChevronDown />
          </MinimizeButton>
        </>
      )}
    </PlayerContainer>
  );
};

export default MusicPlayer; 