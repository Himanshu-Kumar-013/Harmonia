import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};

export const MusicPlayerProvider = ({ children }) => {
  // Load data from localStorage on initialization
  const loadFromStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(`musicApp_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  const saveToStorage = (key, value) => {
    try {
      localStorage.setItem(`musicApp_${key}`, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  const [currentTrack, setCurrentTrack] = useState(loadFromStorage('currentTrack', null));
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(loadFromStorage('volume', 0.7));
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(loadFromStorage('shuffle', false));
  const [repeat, setRepeat] = useState(loadFromStorage('repeat', 'none')); // 'none', 'one', 'all'
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedSongs, setLikedSongs] = useState(loadFromStorage('likedSongs', []));
  const [userPlaylists, setUserPlaylists] = useState(loadFromStorage('userPlaylists', []));
  const [recentlyPlayed, setRecentlyPlayed] = useState(loadFromStorage('recentlyPlayed', []));
  const [isInitialized, setIsInitialized] = useState(loadFromStorage('isInitialized', false));

  const audioRef = useRef(new Audio());

  // Sample music data
  const sampleTracks = [
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: 355,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
      genre: "Rock"
    },
    {
      id: 2,
      title: "Hotel California",
      artist: "Eagles",
      album: "Hotel California",
      duration: 391,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center",
      genre: "Rock"
    },
    {
      id: 3,
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      duration: 183,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop&crop=center",
      genre: "Pop"
    },
    {
      id: 4,
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      duration: 482,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
      genre: "Rock"
    },
    {
      id: 5,
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller",
      duration: 294,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
      genre: "Pop"
    },
    {
      id: 6,
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      album: "Appetite for Destruction",
      duration: 356,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center",
      genre: "Rock"
    },
    {
      id: 7,
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      album: "Nevermind",
      duration: 301,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
      genre: "Rock"
    },
    {
      id: 8,
      title: "Wonderwall",
      artist: "Oasis",
      album: "(What's the Story) Morning Glory?",
      duration: 258,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop&crop=center",
      genre: "Rock"
    },
    {
      id: 9,
      title: "Creep",
      artist: "Radiohead",
      album: "Pablo Honey",
      duration: 239,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
      genre: "Alternative"
    },
    {
      id: 10,
      title: "Losing My Religion",
      artist: "R.E.M.",
      album: "Out of Time",
      duration: 269,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center",
      genre: "Alternative"
    },
    {
      id: 11,
      title: "Nothing Else Matters",
      artist: "Metallica",
      album: "Metallica",
      duration: 388,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
      genre: "Metal"
    },
    {
      id: 12,
      title: "Comfortably Numb",
      artist: "Pink Floyd",
      album: "The Wall",
      duration: 383,
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop&crop=center",
      genre: "Rock"
    }
  ];

  // Initialize with sample data
  useEffect(() => {
    setPlaylist(sampleTracks);
    // Only set default playlists if user hasn't been initialized before
    if (!isInitialized) {
      const defaultPlaylists = [
        {
          id: 1,
          name: "My Favorites",
          tracks: [],
          cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center"
        },
        {
          id: 2,
          name: "Workout Mix",
          tracks: [],
          cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center"
        },
        {
          id: 3,
          name: "Chill Vibes",
          tracks: [],
          cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop&crop=center"
        },
        {
          id: 4,
          name: "Rock Classics",
          tracks: [],
          cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center"
        }
      ];
      setUserPlaylists(defaultPlaylists);
      setIsInitialized(true);
      saveToStorage('userPlaylists', defaultPlaylists);
      saveToStorage('isInitialized', true);
    }
  }, [isInitialized]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToStorage('currentTrack', currentTrack);
  }, [currentTrack]);

  useEffect(() => {
    saveToStorage('volume', volume);
  }, [volume]);

  useEffect(() => {
    saveToStorage('shuffle', shuffle);
  }, [shuffle]);

  useEffect(() => {
    saveToStorage('repeat', repeat);
  }, [repeat]);

  useEffect(() => {
    saveToStorage('likedSongs', likedSongs);
  }, [likedSongs]);

  useEffect(() => {
    saveToStorage('userPlaylists', userPlaylists);
  }, [userPlaylists]);

  useEffect(() => {
    saveToStorage('recentlyPlayed', recentlyPlayed);
  }, [recentlyPlayed]);

  useEffect(() => {
    saveToStorage('isInitialized', isInitialized);
  }, [isInitialized]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else if (repeat === 'all' || (repeat === 'none' && currentIndex < playlist.length - 1)) {
        playNext();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeat, currentIndex, playlist.length]);

  // Volume control
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playTrack = (track, index = 0) => {
    setCurrentTrack(track);
    setCurrentIndex(index);
    audioRef.current.src = track.url;
    audioRef.current.play();
    setIsPlaying(true);
    
    // Add to recently played
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(t => t.id !== track.id);
      const newRecentlyPlayed = [track, ...filtered].slice(0, 10);
      saveToStorage('recentlyPlayed', newRecentlyPlayed);
      return newRecentlyPlayed;
    });
  };

  const playPause = () => {
    if (currentTrack) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }
    
    playTrack(playlist[nextIndex], nextIndex);
  };

  const playPrevious = () => {
    if (playlist.length === 0) return;
    
    let prevIndex;
    if (shuffle) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
      prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    }
    
    playTrack(playlist[prevIndex], prevIndex);
  };

  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const toggleShuffle = () => {
    const newShuffle = !shuffle;
    setShuffle(newShuffle);
    saveToStorage('shuffle', newShuffle);
  };

  const toggleRepeat = () => {
    const modes = ['none', 'all', 'one'];
    const currentModeIndex = modes.indexOf(repeat);
    const nextModeIndex = (currentModeIndex + 1) % modes.length;
    const newRepeat = modes[nextModeIndex];
    setRepeat(newRepeat);
    saveToStorage('repeat', newRepeat);
  };

  const toggleLike = (trackId) => {
    setLikedSongs(prev => {
      const newLikedSongs = prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId];
      saveToStorage('likedSongs', newLikedSongs);
      return newLikedSongs;
    });
  };

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      tracks: [],
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center"
    };
    setUserPlaylists(prev => {
      const newPlaylists = [...prev, newPlaylist];
      saveToStorage('userPlaylists', newPlaylists);
      return newPlaylists;
    });
    return newPlaylist;
  };

  const addToPlaylist = (playlistId, track) => {
    setUserPlaylists(prev => {
      const newPlaylists = prev.map(playlist => 
        playlist.id === playlistId 
          ? { ...playlist, tracks: [...playlist.tracks, track] }
          : playlist
      );
      saveToStorage('userPlaylists', newPlaylists);
      return newPlaylists;
    });
  };

  const removeFromPlaylist = (playlistId, trackId) => {
    setUserPlaylists(prev => {
      const newPlaylists = prev.map(playlist => 
        playlist.id === playlistId 
          ? { ...playlist, tracks: playlist.tracks.filter(track => track.id !== trackId) }
          : playlist
      );
      saveToStorage('userPlaylists', newPlaylists);
      return newPlaylists;
    });
  };

  const deletePlaylist = (playlistId) => {
    setUserPlaylists(prev => {
      const newPlaylists = prev.filter(playlist => playlist.id !== playlistId);
      saveToStorage('userPlaylists', newPlaylists);
      return newPlaylists;
    });
  };

  const closePlayer = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
    setCurrentIndex(0);
  };

  const value = {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    shuffle,
    repeat,
    playlist,
    currentIndex,
    likedSongs,
    userPlaylists,
    recentlyPlayed,
    playTrack,
    playPause,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist,
    closePlayer
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
}; 