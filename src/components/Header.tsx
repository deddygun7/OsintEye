'use client';

import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export default function Header() {
  return (
    <div className="relative border-b border-neon-orange/30 bg-gradient-to-b from-dark-bg to-transparent">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Eye className="w-12 h-12 text-neon-orange animate-pulse" />
            <h1 className="text-5xl font-bold neon-text">OSINT EYE</h1>
            <Eye className="w-12 h-12 text-neon-orange animate-pulse" />
          </div>
          <p className="text-neon-orange/80 text-lg tracking-wider">Global Intelligence Gathering System</p>
          <div className="mt-4 text-sm text-gray-400">
            <p>Scanning Public Data Sources • Worldwide Coverage • Real-time Analysis</p>
          </div>
        </motion.div>
      </div>

      {/* Scan line effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-orange to-transparent scan-line"></div>
    </div>
  );
}
