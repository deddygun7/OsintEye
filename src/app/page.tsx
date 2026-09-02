'use client';

import { useState } from 'react';
import { Search, MapPin, Phone, Car, User, Database } from 'lucide-react';
import SearchPanel from '@/components/SearchPanel';
import ResultsDisplay from '@/components/ResultsDisplay';
import Header from '@/components/Header';

export default function Home() {
  const [searchType, setSearchType] = useState<'coordinates' | 'phone' | 'address' | 'vehicle' | 'person'>('coordinates');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: searchType, query }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults({ error: 'Search failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-bg overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-neon-orange rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-whiskey rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <div className="container mx-auto px-4 py-8">
          {/* Search Type Selector */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            {[
              { type: 'coordinates' as const, icon: MapPin, label: 'Coordinates' },
              { type: 'phone' as const, icon: Phone, label: 'Phone' },
              { type: 'address' as const, icon: Database, label: 'Address' },
              { type: 'vehicle' as const, icon: Car, label: 'Vehicle' },
              { type: 'person' as const, icon: User, label: 'Person' },
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setSearchType(type)}
                className={`p-4 rounded-lg transition-all ${
                  searchType === type
                    ? 'neon-border bg-opacity-50 scale-105'
                    : 'card-glass'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2 text-neon-orange" />
                <p className="text-sm">{label}</p>
              </button>
            ))}
          </div>

          {/* Search Panel */}
          <SearchPanel searchType={searchType} onSearch={handleSearch} loading={loading} />

          {/* Results */}
          {results && <ResultsDisplay data={results} searchType={searchType} query={searchQuery} />}
        </div>
      </div>
    </main>
  );
}
