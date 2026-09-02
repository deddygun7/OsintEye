# 🔍 OSINT Eye - Global Intelligence Gathering Tool

**OSINT Eye** is a comprehensive intelligence gathering platform designed to aggregate public data from multiple sources worldwide. Built with a sleek neon orange aesthetic inspired by the infamous Telegram bot.

## 🎯 Features

### Search Capabilities
- **📍 Coordinates Search** - Location-based intelligence from satellite imagery and maps
- **📱 Phone Number Search** - Validate, trace, and gather intel on phone numbers
- **🏠 Address Search** - Detailed information about physical locations
- **🚗 Vehicle Search** - License plate and VIN lookups for vehicle registration data
- **👤 Person Search** - People finding and profile aggregation

### Data Sources Integration
- Google Maps & Satellite Imagery
- OpenStreetMap & Nominatim Geolocation
- WHOIS & DNS Records
- Breach Databases (HaveIBeenPwned API)
- Social Media Scraping (LinkedIn, Facebook, Twitter)
- Public Vehicle Registries
- Phone Carrier Information
- Property Records
- Employment Databases

## 🎨 Design

**Theme**: Neon Orange Whiskey Noir
- Dark background (#0a0e27)
- Neon orange accents (#FF8C00)
- Glowing effects and animations
- Monospace font for technical appearance
- Glass-morphism UI components

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/deddygun7/OsintEye.git
cd OsintEye

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Visit `http://localhost:3000` in your browser.

## 📋 Environment Setup

Create `.env.local` with your API keys:

```
GOOGLE_MAPS_API_KEY=your_key
NUMVERIFY_API_KEY=your_key
SHODAN_API_KEY=your_key
HAVEIBEENPWNED_API=https://haveibeenpwned.com/api
```

## 🔧 API Structure

### POST /api/search

Request:
```json
{
  "type": "coordinates|phone|address|vehicle|person",
  "query": "search_query_here"
}
```

Response:
```json
{
  "location": "Result data",
  "details": { "field": "value" },
  "additional": { "extra": "info" }
}
```

## 📁 Project Structure

```
OsintEye/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   └── api/
│   │       └── search/       # Search endpoint
│   └── components/
│       ├── Header.tsx        # Header component
│       ├── SearchPanel.tsx   # Search input
│       └── ResultsDisplay.tsx# Results display
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: MongoDB (optional)
- **APIs**: Multiple public & commercial sources

## ⚠️ Legal & Ethical Notice

OSINT Eye is designed for **educational and authorized security research purposes only**. Users must:

- ✅ Comply with all local and international laws
- ✅ Respect privacy regulations (GDPR, CCPA, etc.)
- ✅ Obtain proper authorization before gathering data
- ✅ Use only public sources
- ❌ Do not use for harassment, stalking, or illegal activities
- ❌ Do not violate terms of service of data providers

## 📝 License

MIT License - See LICENSE file

## 🤝 Contributing

Contributions welcome! Please follow the code style and submit PRs.

## 📧 Support

For issues and questions, open a GitHub issue.

---

**OSINT Eye** - *See Everything, Know Everything* 👁️
