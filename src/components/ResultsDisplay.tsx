'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Car, User, AlertCircle, Copy } from 'lucide-react';
import { useState } from 'react';

interface ResultsDisplayProps {
  data: any;
  searchType: string;
  query: string;
}

export default function ResultsDisplay({ data, searchType, query }: ResultsDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (data?.error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card-glass p-6 border-red-500/50 flex gap-4"
      >
        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
        <div>
          <h3 className="text-red-500 font-bold mb-2">Scan Failed</h3>
          <p className="text-gray-300">{data.error}</p>
        </div>
      </motion.div>
    );
  }

  const renderResults = () => {
    switch (searchType) {
      case 'coordinates':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-neon-orange flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm">LOCATION</p>
                <p className="text-xl font-bold text-white">{data.location || 'Unknown'}</p>
              </div>
            </div>
            {data.address && (
              <div className="ml-10 text-gray-300">
                <p className="text-sm">📍 {data.address}</p>
                {data.nearby && (
                  <div className="mt-2 text-xs text-neon-orange">
                    <p>Nearby: {data.nearby.join(', ')}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 'phone':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-neon-orange flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm">PHONE NUMBER</p>
                <p className="text-xl font-bold text-white">{data.phone}</p>
              </div>
              <button
                onClick={() => copyToClipboard(data.phone)}
                className="p-2 hover:bg-neon-orange/20 rounded"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            {data.details && (
              <div className="ml-10 space-y-2 text-sm">
                <p>📍 Country: <span className="text-neon-orange">{data.details.country}</span></p>
                <p>📞 Provider: <span className="text-neon-orange">{data.details.provider}</span></p>
                <p>✅ Valid: <span className="text-neon-orange">{data.details.valid ? 'Yes' : 'No'}</span></p>
              </div>
            )}
          </div>
        );
      case 'vehicle':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Car className="w-6 h-6 text-neon-orange flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm">VEHICLE INFORMATION</p>
                <p className="text-xl font-bold text-white">{data.plate}</p>
              </div>
            </div>
            {data.details && (
              <div className="ml-10 space-y-2 text-sm">
                <p>🚗 Model: <span className="text-neon-orange">{data.details.model}</span></p>
                <p>📅 Year: <span className="text-neon-orange">{data.details.year}</span></p>
                <p>👤 Owner: <span className="text-neon-orange">{data.details.owner || 'Unknown'}</span></p>
                <p>📍 Region: <span className="text-neon-orange">{data.details.region}</span></p>
              </div>
            )}
          </div>
        );
      case 'person':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <User className="w-6 h-6 text-neon-orange flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm">PERSON PROFILE</p>
                <p className="text-xl font-bold text-white">{data.name}</p>
              </div>
            </div>
            {data.details && (
              <div className="ml-10 space-y-2 text-sm">
                <p>📧 Email: <span className="text-neon-orange">{data.details.email}</span></p>
                <p>📱 Phone: <span className="text-neon-orange">{data.details.phone || 'Not found'}</span></p>
                <p>📍 Location: <span className="text-neon-orange">{data.details.location}</span></p>
                <p>🔗 Profiles: <span className="text-neon-orange">{data.details.profiles?.join(', ') || 'None'}</span></p>
              </div>
            )}
          </div>
        );
      case 'address':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-neon-orange flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-gray-400 text-sm">ADDRESS DETAILS</p>
                <p className="text-xl font-bold text-white">{data.address}</p>
              </div>
            </div>
            {data.details && (
              <div className="ml-10 space-y-2 text-sm">
                <p>🌍 Coordinates: <span className="text-neon-orange">{data.details.coordinates}</span></p>
                <p>🏢 Type: <span className="text-neon-orange">{data.details.type}</span></p>
                <p>👥 Residents: <span className="text-neon-orange">{data.details.residents || 'Unknown'}</span></p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="card-glass p-8 mb-6 border-neon-orange/50">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-400 text-sm">SCAN QUERY: {query}</p>
          <div className="w-3 h-3 bg-neon-orange rounded-full pulse-glow"></div>
        </div>
        {renderResults()}
      </div>

      {/* Additional Data Cards */}
      {data.additional && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data.additional).map(([key, value]: [string, any]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-glass p-4"
            >
              <p className="text-gray-400 text-xs uppercase mb-2">{key}</p>
              <p className="text-neon-orange font-mono text-sm">{JSON.stringify(value)}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
