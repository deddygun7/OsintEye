'use client';

import { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchPanelProps {
  searchType: string;
  onSearch: (query: string) => void;
  loading: boolean;
}

const placeholders: Record<string, string> = {
  coordinates: 'Enter coordinates (lat,lng) - e.g., 40.7128,-74.0060',
  phone: 'Enter phone number - e.g., +1-555-123-4567',
  address: 'Enter address - e.g., 123 Main St, New York, NY',
  vehicle: 'Enter vehicle plate/VIN - e.g., ABC-1234',
  person: 'Enter name or email - e.g., john.doe@example.com',
};

export default function SearchPanel({ searchType, onSearch, loading }: SearchPanelProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-glass p-8 mb-8"
    >
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholders[searchType]}
            className="w-full px-6 py-4 bg-dark-bg border-2 border-neon-orange/50 rounded-lg text-white placeholder-gray-500 focus:border-neon-orange transition-all"
            disabled={loading}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neon-orange/50">
            {loading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <Search className="w-6 h-6" />
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="neon-glow-button px-8 py-4 rounded-lg font-bold uppercase tracking-wider disabled:opacity-50"
        >
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </form>
    </motion.div>
  );
}
