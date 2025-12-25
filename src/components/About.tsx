'use client';

import { motion } from 'framer-motion';

const bandMembers = [
  {
    name: 'Alex Thunder',
    role: 'Lead Vocals & Guitar',
    image: '🎸',
  },
  {
    name: 'Jake Storm',
    role: 'Bass Guitar',
    image: '🎵',
  },
  {
    name: 'Max Lightning',
    role: 'Drums',
    image: '🥁',
  },
  {
    name: 'Ryan Blaze',
    role: 'Lead Guitar',
    image: '🎼',
  },
];

export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-neon-blue glow mb-4">
            About The Band
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Born from the heart of rock and roll, we are here to deliver pure,
            unfiltered energy through our music.
          </p>
        </motion.div>

        {/* Band Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 bg-gradient-to-r from-black via-electric-blue/10 to-black border border-neon-blue/30 rounded-2xl p-8 md:p-12"
          style={{ boxShadow: '0 0 40px rgba(0, 212, 255, 0.1)' }}
        >
          <p className="text-lg text-foreground/90 leading-relaxed mb-6">
            Since our formation in the underground music scene, Rock Legends has been
            pushing the boundaries of hard rock. Our sound combines classic rock influences
            with modern edge, creating an electrifying experience that resonates with fans
            across generations.
          </p>
          <p className="text-lg text-foreground/90 leading-relaxed">
            With multiple chart-topping albums and sold-out shows worldwide, we continue to
            evolve while staying true to our roots. Our mission is simple: to create music
            that moves the soul and ignites the spirit.
          </p>
        </motion.div>

        {/* Band Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bandMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-black/40 border border-neon-blue/20 rounded-xl p-6 text-center hover:border-neon-blue/60 transition-all"
              style={{
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)',
              }}
            >
              <motion.div
                className="text-6xl mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {member.image}
              </motion.div>
              <h3 className="text-xl font-bold text-neon-blue mb-2">{member.name}</h3>
              <p className="text-foreground/70">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
