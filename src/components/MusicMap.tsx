'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Song {
  id: number;
  title: string;
  duration: string;
  x: number;
  y: number;
  spotifyUrl?: string;
}

const songs: Song[] = [
  { id: 1, title: 'Thunder Strike', duration: '4:32', x: 20, y: 30, spotifyUrl: '#' },
  { id: 2, title: 'Electric Soul', duration: '3:45', x: 60, y: 20, spotifyUrl: '#' },
  { id: 3, title: 'Midnight Rider', duration: '5:12', x: 80, y: 50, spotifyUrl: '#' },
  { id: 4, title: 'Rebel Heart', duration: '4:08', x: 40, y: 60, spotifyUrl: '#' },
  { id: 5, title: 'Neon Dreams', duration: '3:56', x: 70, y: 75, spotifyUrl: '#' },
  { id: 6, title: 'Burning Sky', duration: '4:44', x: 30, y: 80, spotifyUrl: '#' },
  { id: 7, title: 'Wild Fire', duration: '5:01', x: 85, y: 30, spotifyUrl: '#' },
  { id: 8, title: 'Steel & Stone', duration: '4:15', x: 15, y: 55, spotifyUrl: '#' },
];

export default function MusicMap() {
  const [activeSong, setActiveSong] = useState<number | null>(null);
  const [hoveredSong, setHoveredSong] = useState<number | null>(null);

  return (
    <section id="music" className="min-h-screen py-20 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-neon-blue glow mb-4">
            Our Music
          </h2>
          <p className="text-xl text-foreground/80">
            Explore our sonic universe - Click on any track to play
          </p>
        </motion.div>

        {/* Interactive Music Map */}
        <div className="relative w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative w-full aspect-video bg-gradient-to-br from-black via-electric-blue/10 to-black rounded-2xl border border-neon-blue/30 overflow-hidden"
            style={{
              boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)',
            }}
          >
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {songs.map((song, index) => {
                const nextSong = songs[(index + 1) % songs.length];
                return (
                  <motion.line
                    key={`line-${song.id}`}
                    x1={`${song.x}%`}
                    y1={`${song.y}%`}
                    x2={`${nextSong.x}%`}
                    y2={`${nextSong.y}%`}
                    stroke="#00d4ff"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: index * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* Song Nodes */}
            {songs.map((song, index) => (
              <motion.div
                key={song.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${song.x}%`,
                  top: `${song.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredSong(song.id)}
                onMouseLeave={() => setHoveredSong(null)}
                onClick={() => setActiveSong(song.id)}
              >
                {/* Outer Glow Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: hoveredSong === song.id ? [1, 1.5, 1] : 1,
                    opacity: hoveredSong === song.id ? [0.5, 0, 0.5] : 0,
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
                    width: '80px',
                    height: '80px',
                    marginLeft: '-40px',
                    marginTop: '-40px',
                  }}
                />

                {/* Node Circle */}
                <motion.div
                  className="relative w-12 h-12 rounded-full bg-black border-2 border-neon-blue flex items-center justify-center"
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    boxShadow:
                      activeSong === song.id
                        ? '0 0 30px #00d4ff, 0 0 60px #00d4ff'
                        : '0 0 10px #00d4ff',
                  }}
                >
                  {activeSong === song.id ? (
                    <motion.svg
                      className="w-6 h-6 text-neon-blue"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      className="w-6 h-6 text-neon-blue"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </motion.svg>
                  )}
                </motion.div>

                {/* Song Info Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredSong === song.id || activeSong === song.id ? 1 : 0,
                    y: hoveredSong === song.id || activeSong === song.id ? 0 : 10,
                  }}
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/90 border border-neon-blue/50 rounded-lg px-4 py-2 pointer-events-none"
                  style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}
                >
                  <p className="text-neon-blue font-bold">{song.title}</p>
                  <p className="text-foreground/80 text-sm">{song.duration}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Track List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {songs.map((song, index) => (
              <motion.div
                key={song.id}
                className="bg-black/40 border border-neon-blue/20 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:border-neon-blue/60 transition-all"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)' }}
                onClick={() => setActiveSong(song.id)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neon-blue/20 border border-neon-blue flex items-center justify-center">
                    <span className="text-neon-blue font-bold">{song.id}</span>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">{song.title}</p>
                    <p className="text-foreground/60 text-sm">{song.duration}</p>
                  </div>
                </div>
                <motion.button
                  className="w-10 h-10 rounded-full bg-neon-blue/10 border border-neon-blue flex items-center justify-center hover:bg-neon-blue/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {activeSong === song.id ? (
                    <svg
                      className="w-5 h-5 text-neon-blue"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-neon-blue"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
