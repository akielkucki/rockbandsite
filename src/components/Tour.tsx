'use client';

import { motion } from 'framer-motion';

const tourDates = [
  {
    date: 'MAR 15',
    year: '2025',
    city: 'Los Angeles',
    venue: 'The Wiltern',
    status: 'Tickets Available',
  },
  {
    date: 'MAR 22',
    year: '2025',
    city: 'New York',
    venue: 'Terminal 5',
    status: 'Tickets Available',
  },
  {
    date: 'APR 05',
    year: '2025',
    city: 'Chicago',
    venue: 'Metro Chicago',
    status: 'Almost Sold Out',
  },
  {
    date: 'APR 18',
    year: '2025',
    city: 'Austin',
    venue: 'Stubb\'s BBQ',
    status: 'Tickets Available',
  },
  {
    date: 'MAY 02',
    year: '2025',
    city: 'Seattle',
    venue: 'Showbox SoDo',
    status: 'Tickets Available',
  },
  {
    date: 'MAY 16',
    year: '2025',
    city: 'Denver',
    venue: 'Ogden Theatre',
    status: 'Sold Out',
  },
];

export default function Tour() {
  return (
    <section id="tour" className="min-h-screen py-20 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-neon-blue glow mb-4">
            Tour Dates
          </h2>
          <p className="text-xl text-foreground/80">
            Catch us live on the road this year
          </p>
        </motion.div>

        <div className="space-y-4">
          {tourDates.map((show, index) => (
            <motion.div
              key={`${show.city}-${show.date}`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="bg-black/40 border border-neon-blue/20 rounded-xl p-6 hover:border-neon-blue/60 transition-all cursor-pointer"
              style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)' }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  {/* Date */}
                  <div className="text-center min-w-[80px]">
                    <p className="text-3xl font-bold text-neon-blue">{show.date}</p>
                    <p className="text-foreground/60 text-sm">{show.year}</p>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block w-px h-16 bg-neon-blue/30" />

                  {/* Location */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      {show.city}
                    </h3>
                    <p className="text-foreground/70">{show.venue}</p>
                  </div>
                </div>

                {/* Status & Button */}
                <div className="flex flex-col md:items-end gap-2">
                  <span
                    className={`text-sm font-semibold ${
                      show.status === 'Sold Out'
                        ? 'text-red-400'
                        : show.status === 'Almost Sold Out'
                          ? 'text-yellow-400'
                          : 'text-green-400'
                    }`}
                  >
                    {show.status}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={show.status === 'Sold Out'}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${
                      show.status === 'Sold Out'
                        ? 'bg-foreground/20 text-foreground/40 cursor-not-allowed'
                        : 'bg-neon-blue text-black hover:bg-neon-cyan'
                    }`}
                    style={
                      show.status !== 'Sold Out'
                        ? { boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)' }
                        : {}
                    }
                  >
                    {show.status === 'Sold Out' ? 'Sold Out' : 'Get Tickets'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
