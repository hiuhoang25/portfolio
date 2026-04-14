import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Music2,
  Disc,
  User,
  ListMusic,
  Headphones,
} from 'lucide-react';
import { SectionWrapper, StaggerContainer, StaggerItem } from '@/components/SectionWrapper';
import { musicConfig } from '@/config/music';
import { useLanguage } from '@/i18n/LanguageContext';

export function Music() {
  const { t } = useLanguage();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { favoriteTracks, favoriteArtists, playlists, spotifyEmbed } = musicConfig;

  return (
    <section id="music" className="min-h-screen px-8 py-16 lg:px-16">
      <div className="max-w-5xl">
        {/* Header */}
        <SectionWrapper>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-violet-500/20">
              <Music2 className="w-6 h-6 text-violet-500" />
            </div>
            <h2 className="text-4xl font-bold text-white">{t('musicTitle')}</h2>
          </div>
          <p className="text-xl text-zinc-500 mb-4">{t('musicSubtitle')}</p>
          <p className="text-zinc-400 leading-relaxed mb-8 max-w-2xl">
            {t('musicDescription')}
          </p>
        </SectionWrapper>

        {/* Now Playing */}
        <SectionWrapper delay={0.1}>
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Headphones className="w-4 h-4 text-violet-500" />
              <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                {t('currentlyListening')}
              </h3>
            </div>
            <a
              href="https://github.com/kittinan/spotify-github-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="https://spotify-github-profile.kittinanx.com/api/view?uid=22ogknrxngihy3lmld2crmdnq&cover_image=true&theme=spotify-embed&show_offline=false&background_color=121212&interchange=false&profanity=false&bar_color=53b14f&bar_color_cover=false&mode=dark"
                alt="Spotify Now Playing"
                className="rounded-2xl w-full"
              />
            </a>
          </div>
        </SectionWrapper>

        {/* Favorite Tracks */}
        {favoriteTracks.enabled && (
          <SectionWrapper delay={0.2}>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Disc className="w-4 h-4 text-violet-500" />
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                  {t('favoriteTracks')}
                </h3>
              </div>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteTracks.tracks.map((track) => (
                  <StaggerItem key={track.id}>
                    <motion.div
                      whileHover={{ y: -2, borderColor: 'rgba(139, 92, 246, 0.3)' }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all"
                    >
                      {/* Track Cover */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
                        {track.coverUrl ? (
                          <img
                            src={track.coverUrl}
                            alt={track.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Music2 className="w-6 h-6 text-zinc-600" />
                          </div>
                        )}
                      </div>

                      {/* Track Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">
                          {track.title}
                        </h4>
                        <p className="text-sm text-zinc-400 truncate">
                          {track.artist}
                        </p>
                        {track.genre && (
                          <span className="inline-block mt-1 text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">
                            {track.genre}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {track.spotifyUrl && (
                          <a
                            href={track.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-zinc-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-zinc-400" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </SectionWrapper>
        )}

        {/* Favorite Artists */}
        {favoriteArtists.enabled && (
          <SectionWrapper delay={0.3}>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-violet-500" />
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                  {t('favoriteArtists')}
                </h3>
              </div>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteArtists.artists.map((artist) => (
                  <StaggerItem key={artist.id}>
                    <motion.a
                      href={artist.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, borderColor: 'rgba(139, 92, 246, 0.3)' }}
                      className="block p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        {/* Artist Image */}
                        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-zinc-800">
                          {artist.imageUrl ? (
                            <img
                              src={artist.imageUrl}
                              alt={artist.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-6 h-6 text-zinc-600" />
                            </div>
                          )}
                        </div>

                        {/* Artist Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate">
                            {artist.name}
                          </h4>
                          <p className="text-xs text-zinc-500 truncate">
                            {artist.genre}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </SectionWrapper>
        )}

        {/* Playlists */}
        {playlists.enabled && (
          <SectionWrapper delay={0.4}>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <ListMusic className="w-4 h-4 text-violet-500" />
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                  {t('myPlaylists')}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {playlists.items.map((playlist) => (
                  <motion.a
                    key={playlist.id}
                    href={playlist.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, borderColor: 'rgba(139, 92, 246, 0.3)' }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all"
                  >
                    {/* Playlist Cover */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
                      {playlist.coverUrl ? (
                        <img
                          src={playlist.coverUrl}
                          alt={playlist.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ListMusic className="w-8 h-8 text-zinc-600" />
                        </div>
                      )}
                    </div>

                    {/* Playlist Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white truncate">
                        {playlist.name}
                      </h4>
                      <p className="text-sm text-zinc-400 line-clamp-2">
                        {playlist.description}
                      </p>
                    </div>

                    <ExternalLink className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                  </motion.a>
                ))}
              </div>
            </div>
          </SectionWrapper>
        )}

        {/* Spotify Embed (Optional) */}
        {spotifyEmbed.enabled && (
          <SectionWrapper delay={0.5}>
            <div className="mb-8">
              <iframe
                src={spotifyEmbed.playlistUrl}
                width="100%"
                height={spotifyEmbed.height}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
          </SectionWrapper>
        )}

        {/* Navigation arrows */}
        <SectionWrapper delay={0.5}>
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-zinc-800">
            <button
              onClick={() => scrollToSection('stats')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('stats')}</span>
            </button>
            <button
              onClick={() => scrollToSection('introduction')}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <span>{t('introduction')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
