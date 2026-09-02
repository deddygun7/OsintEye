import React, { useState } from 'react';
import { Search, Loader, MapPin, Phone, Car, User, Eye, AlertCircle, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

type SearchType = 'coordinates' | 'phone' | 'address' | 'vehicle' | 'person' | 'telegram';

interface SearchResult {
  location?: string;
  address?: string;
  nearby?: string[];
  phone?: string;
  plate?: string;
  name?: string;
  telegram?: any;
  details?: any;
  additional?: Record<string, any>;
  error?: string;
}

const placeholders: Record<SearchType, string> = {
  coordinates: 'Enter coordinates (lat,lng) - e.g., 40.7128,-74.0060',
  phone: 'Enter phone number - e.g., +1-555-123-4567',
  address: 'Enter address - e.g., 123 Main St, New York, NY',
  vehicle: 'Enter vehicle plate/VIN - e.g., ABC-1234',
  person: 'Enter name or email - e.g., john.doe@example.com',
  telegram: 'Enter Telegram username or ID - e.g., @username or 123456789',
};

function App() {
  const [searchType, setSearchType] = useState<SearchType>('telegram');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: searchType, query }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      setResults({ error: 'Search failed. Check your internet connection.' });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white font-mono overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-neon-orange rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-whiskey rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-neon-orange/30 bg-gradient-to-b from-dark-bg to-transparent p-8"
        >
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Eye className="w-12 h-12 text-neon-orange animate-pulse" />
              <h1 className="text-5xl font-bold neon-text">OSINT EYE</h1>
              <Eye className="w-12 h-12 text-neon-orange animate-pulse" />
            </div>
            <p className="text-neon-orange/80 text-lg tracking-wider">Global Intelligence Gathering System</p>
            <div className="mt-2 text-xs text-gray-400">
              Scanning Public Data Sources • Worldwide Coverage • Real-time Analysis
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-orange to-transparent"></div>
        </motion.div>

        <div className="container mx-auto px-4 py-8">
          {/* Search Type Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-6 gap-3 mb-8"
          >
            {[
              { type: 'telegram' as const, icon: Phone, label: 'Telegram' },
              { type: 'coordinates' as const, icon: MapPin, label: 'Coordinates' },
              { type: 'phone' as const, icon: Phone, label: 'Phone' },
              { type: 'address' as const, icon: MapPin, label: 'Address' },
              { type: 'vehicle' as const, icon: Car, label: 'Vehicle' },
              { type: 'person' as const, icon: User, label: 'Person' },
            ].map(({ type, icon: Icon, label }) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchType(type)}
                className={`p-4 rounded-lg transition-all ${
                  searchType === type
                    ? 'neon-border bg-opacity-50 scale-105'
                    : 'card-glass'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2 text-neon-orange" />
                <p className="text-xs">{label}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Search Panel */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSearch}
            className="card-glass p-8 mb-8 flex gap-4"
          >
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="neon-glow-button px-8 py-4 rounded-lg font-bold uppercase tracking-wider disabled:opacity-50"
            >
              {loading ? 'Scanning...' : 'Scan'}
            </motion.button>
          </motion.form>

          {/* Results */}
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {results.error ? (
                <div className="card-glass p-6 border-red-500/50 flex gap-4">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-red-500 font-bold mb-2">Scan Failed</h3>
                    <p className="text-gray-300">{results.error}</p>
                  </div>
                </div>
              ) : (
                <div className="card-glass p-8 border-neon-orange/50">
                  {searchType === 'telegram' && results.telegram && (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Phone className="w-6 h-6 text-neon-orange flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-gray-400 text-sm">TELEGRAM PROFILE</p>
                          <p className="text-2xl font-bold text-white">{results.telegram.username}</p>
                          <p className="text-sm text-neon-orange mt-2">ID: {results.telegram.id}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(results.telegram.id)}
                          className="p-2 hover:bg-neon-orange/20 rounded"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>
                      {results.telegram.details && (
                        <div className="ml-10 space-y-2 text-sm grid grid-cols-2 gap-4">
                          {results.telegram.details.first_name && (
                            <p>👤 First Name: <span className="text-neon-orange">{results.telegram.details.first_name}</span></p>
                          )}
                          {results.telegram.details.last_name && (
                            <p>👤 Last Name: <span className="text-neon-orange">{results.telegram.details.last_name}</span></p>
                          )}
                          {results.telegram.details.bio && (
                            <p className="col-span-2">📝 Bio: <span className="text-neon-orange">{results.telegram.details.bio}</span></p>
                          )}
                          {results.telegram.details.followers && (
                            <p>👥 Followers: <span className="text-neon-orange">{results.telegram.details.followers}</span></p>
                          )}
                          {results.telegram.details.is_bot && (
                            <p>🤖 Bot: <span className="text-neon-orange">{results.telegram.details.is_bot ? 'Yes' : 'No'}</span></p>
                          )}
                          {results.telegram.details.verified && (
                            <p>✅ Verified: <span className="text-neon-orange">{results.telegram.details.verified ? 'Yes' : 'No'}</span></p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {searchType === 'phone' && results.phone && (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Phone className="w-6 h-6 text-neon-orange flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-gray-400 text-sm">PHONE NUMBER</p>
                          <p className="text-xl font-bold text-white">{results.phone}</p>
                        </div>
                      </div>
                      {results.details && (
                        <div className="ml-10 space-y-2 text-sm grid grid-cols-2 gap-4">
                          <p>🌍 Country: <span className="text-neon-orange">{results.details.country}</span></p>
                          <p>📞 Provider: <span className="text-neon-orange">{results.details.provider}</span></p>
                          <p>✅ Valid: <span className="text-neon-orange">{results.details.valid ? 'Yes' : 'No'}</span></p>
                          <p>📍 Location: <span className="text-neon-orange">{results.details.location}</span></p>
                        </div>
                      )}
                    </div>
                  )}

                  {searchType === 'coordinates' && results.location && (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-neon-orange flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-gray-400 text-sm">LOCATION</p>
                          <p className="text-xl font-bold text-white">{results.location}</p>
                        </div>
                      </div>
                      {results.address && (
                        <div className="ml-10 text-gray-300 space-y-2">
                          <p className="text-sm">📍 {results.address}</p>
                          {results.nearby && (
                            <div className="text-xs text-neon-orange">
                              <p>Nearby: {results.nearby.join(', ')}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {searchType === 'vehicle' && results.plate && (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Car className="w-6 h-6 text-neon-orange flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-gray-400 text-sm">VEHICLE INFORMATION</p>
                          <p className="text-xl font-bold text-white">{results.plate}</p>
                        </div>
                      </div>
                      {results.details && (
                        <div className="ml-10 space-y-2 text-sm grid grid-cols-2 gap-4">
                          <p>🚗 Model: <span className="text-neon-orange">{results.details.model}</span></p>
                          <p>📅 Year: <span className="text-neon-orange">{results.details.year}</span></p>
                          <p>👤 Owner: <span className="text-neon-orange">{results.details.owner || 'Unknown'}</span></p>
                          <p>📍 Region: <span className="text-neon-orange">{results.details.region}</span></p>
                        </div>
                      )}
                    </div>
                  )}

                  {searchType === 'person' && results.name && (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <User className="w-6 h-6 text-neon-orange flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-gray-400 text-sm">PERSON PROFILE</p>
                          <p className="text-xl font-bold text-white">{results.name}</p>
                        </div>
                      </div>
                      {results.details && (
                        <div className="ml-10 space-y-2 text-sm grid grid-cols-2 gap-4">
                          <p>📧 Email: <span className="text-neon-orange">{results.details.email}</span></p>
                          <p>📱 Phone: <span className="text-neon-orange">{results.details.phone || 'Not found'}</span></p>
                          <p>📍 Location: <span className="text-neon-orange">{results.details.location}</span></p>
                          <p>🔗 Profiles: <span className="text-neon-orange">{results.details.profiles?.join(', ') || 'None'}</span></p>
                        </div>
                      )}
                    </div>
                  )}

                  {searchType === 'address' && results.address && (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-neon-orange flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="text-gray-400 text-sm">ADDRESS DETAILS</p>
                          <p className="text-xl font-bold text-white">{results.address}</p>
                        </div>
                      </div>
                      {results.details && (
                        <div className="ml-10 space-y-2 text-sm grid grid-cols-2 gap-4">
                          <p>🌍 Coordinates: <span className="text-neon-orange">{results.details.coordinates}</span></p>
                          <p>🏢 Type: <span className="text-neon-orange">{results.details.type}</span></p>
                          <p>👥 Residents: <span className="text-neon-orange">{results.details.residents || 'Unknown'}</span></p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        .neon-text {
          color: #FF8C00;
          text-shadow: 0 0 10px rgba(255, 140, 0, 0.8),
                       0 0 20px rgba(255, 140, 0, 0.5);
        }

        .neon-border {
          border: 2px solid #FF8C00;
          box-shadow: 0 0 15px rgba(255, 140, 0, 0.4),
                      inset 0 0 15px rgba(255, 140, 0, 0.1);
        }

        .neon-glow-button {
          background: linear-gradient(135deg, #FF8C00 0%, #D2691E 100%);
          color: #0a0e27;
          border: 2px solid #FF9500;
          box-shadow: 0 0 20px rgba(255, 140, 0, 0.5);
        }

        .neon-glow-button:hover {
          box-shadow: 0 0 40px rgba(255, 140, 0, 0.8),
                      0 0 60px rgba(255, 140, 0, 0.4);
        }

        .card-glass {
          background: rgba(26, 31, 58, 0.8);
          border: 1px solid rgba(255, 140, 0, 0.3);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px 0 rgba(255, 140, 0, 0.1);
        }

        .card-glass:hover {
          border-color: rgba(255, 140, 0, 0.6);
          box-shadow: 0 8px 32px 0 rgba(255, 140, 0, 0.2);
        }

        input:focus {
          outline: none;
          box-shadow: 0 0 20px rgba(255, 140, 0, 0.6);
        }
      `}</style>
    </div>
  );
}

export default App;
