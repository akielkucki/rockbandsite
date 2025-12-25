'use client';

import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'Spotify', icon: '🎵', url: '#' },
  { name: 'Instagram', icon: '📷', url: '#' },
  { name: 'YouTube', icon: '📺', url: '#' },
  { name: 'Twitter', icon: '🐦', url: '#' },
];

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen py-20 px-6 relative flex items-center">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-neon-blue glow mb-8">
            Get In Touch
          </h2>
          <p className="text-xl text-foreground/80 mb-12">
            Follow us on social media and stay updated with our latest releases
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-black/40 border-2 border-neon-blue rounded-full flex items-center justify-center text-4xl hover:border-neon-cyan transition-all"
                style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)' }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-black via-electric-blue/10 to-black border border-neon-blue/30 rounded-2xl p-8"
            style={{ boxShadow: '0 0 40px rgba(0, 212, 255, 0.1)' }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Join Our Newsletter
            </h3>
            <p className="text-foreground/70 mb-6">
              Get exclusive updates, behind-the-scenes content, and early access to tickets
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-black/60 border border-neon-blue/30 rounded-lg text-foreground focus:outline-none focus:border-neon-blue transition-all"
                style={{ boxShadow: '0 0 10px rgba(0, 212, 255, 0.1)' }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-neon-blue text-black font-bold rounded-lg hover:bg-neon-cyan transition-all"
                style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 py-8 border-t border-neon-blue/20 text-center"
      >
        <p className="text-foreground/60">
          &copy; 2025 Rock Legends. All rights reserved.
        </p>
        <p className="text-foreground/40 text-sm mt-2">
          Designed with thunder and lightning
        </p>
      </motion.footer>
    </section>
  );
}
