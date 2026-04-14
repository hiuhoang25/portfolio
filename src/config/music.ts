// Music Configuration
// Add your favorite tracks here - they will be displayed in the Music section

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverUrl?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  description?: string;
  genre?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
}

export const musicConfig = {
  // Section title and subtitle
  title: 'My Music',
  subtitle: 'Tunes that keep me coding through the night!',
  description:
    "Music is my constant companion while coding. These are the tracks and artists that fuel my productivity and keep me in the zone during those long debugging sessions.",

  // Currently playing / Now listening to
  currentlyListening: {
    enabled: true,
    title: 'Recently Listened',
    track: {
      title: 'Night Jazz',
      artist: 'Adrian',
      album: 'Night Jazz',
      coverUrl: 'https://i.scdn.co/image/ab67616d0000b273cb4199055f3891ec48f1ae46',
      spotifyUrl: 'https://open.spotify.com/track/3H8FKzblIhFUidzFTQCNVv',
    },
  },

  // Favorite tracks
  favoriteTracks: {
    enabled: true,
    title: 'Top Tracks',
    tracks: [
      {
        id: '3',
        title: 'Out of Time',
        artist: 'The Weeknd',
        album: 'Dawn FM',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b2734ab2520c2c77a1d66b9ee21d',
        spotifyUrl: 'https://open.spotify.com/track/2SLwbpExuoBDZBpjfefCtV',
        genre: 'R&B',
      },
      {
        id: '4',
        title: 'COMË N GO',
        artist: 'Yeat',
        album: 'DANGEROUS SUMMER',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e35aad7bbe4508513f36fd58',
        spotifyUrl: 'https://open.spotify.com/track/2mNGL7mZILSqZHxGboJaO9',
        genre: 'Rap',
      },
      {
        id: '5',
        title: 'WHAT U NEED',
        artist: 'void, BABY BOI',
        album: 'ANARCHY',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b27358608df6e29af9559b882962',
        spotifyUrl: 'https://open.spotify.com/track/765Esh7KnFbN1dqxu50A4t',
        genre: 'Rap',
      },
      {
        id: '6',
        title: 'SENTE MAIS - SUPER SLOWED',
        artist: 'Eternxlkz',
        album: 'SENTE MAIS',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273552b2418c92bbfdfe92c4461',
        spotifyUrl: 'https://open.spotify.com/track/0RwKLSlLp4TQnl9PDWQLA3',
        genre: 'Slowed',
      },
      {
        id: '7',
        title: 'WHO? WHAT!',
        artist: 'Travis Scott',
        album: 'ASTROWORLD',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273daec894c14c0ca42d76eeb32',
        spotifyUrl: 'https://open.spotify.com/track/4KYS9GK68yeuUJ8vJfPxrq',
        genre: 'Rap',
      },
      {
        id: '8',
        title: 'An Thần',
        artist: 'Low G, Thắng',
        album: 'An Thần',
        coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c8d355355c2c62b74b0809e4',
        spotifyUrl: 'https://open.spotify.com/track/5C3fx9rdM4Bxf1MSOQC4Ym',
        genre: 'V-Rap',
      },
    ],
  },

  // Favorite artists
  favoriteArtists: {
    enabled: true,
    title: 'Top Artists',
    artists: [
      {
        id: '1',
        name: 'Travis Scott',
        genre: 'Hip-Hop/Rap',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb19c2790744c792d05570bb71',
        spotifyUrl: 'https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY',
      },
      {
        id: '2',
        name: 'Don Toliver',
        genre: 'Hip-Hop/R&B',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebc52b798deb89eb8414a51b7b',
        spotifyUrl: 'https://open.spotify.com/artist/4Gso3d4CscCijv0lmajZWs',
      },
      {
        id: '3',
        name: 'The Weeknd',
        genre: 'R&B/Pop',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae',
        spotifyUrl: 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ',
      },
      {
        id: '4',
        name: 'Polyphia',
        genre: 'Progressive Metal',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebd0d5560f6b2ebe39a6d20704',
        spotifyUrl: 'https://open.spotify.com/artist/4vGrte8FDu062Ntj0RsPiZ',
      },
      {
        id: '5',
        name: 'ADTurnUp',
        genre: 'Hip-Hop',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb90186f82ecb8e39b529b6c0e',
        spotifyUrl: 'https://open.spotify.com/artist/4RRmL81NhhouCKGo8I6GaU',
      },
      {
        id: '6',
        name: 'Eternxlkz',
        genre: 'Slowed/Phonk',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb09b3acec6dcea27a5633b4c4',
        spotifyUrl: 'https://open.spotify.com/artist/3Xd2WSaNywx5gn1pgRPFjF',
      },
    ],
  },

  // Playlists
  playlists: {
    enabled: false,
    title: 'My Playlists',
    items: [] as { id: string; name: string; description: string; coverUrl?: string; spotifyUrl: string }[],
  },

  // Spotify embed (optional)
  spotifyEmbed: {
    enabled: false,
    playlistUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX5trt9i14X7j',
    height: 380,
  },
};

// Helper function to get a random track for "Currently Listening"
export const getRandomTrack = (): Track => {
  const tracks = musicConfig.favoriteTracks.tracks;
  return tracks[Math.floor(Math.random() * tracks.length)];
};
