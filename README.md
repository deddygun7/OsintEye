# 🔍 OSINT Eye - Desktop Edition

**OSINT Eye** is a powerful desktop application for global intelligence gathering. Search across multiple data sources with a sleek neon orange interface.

## ✨ Features

### Search Capabilities
- **📱 Telegram Search** - Find users by username or ID
- **🌍 Coordinates Search** - Location-based intelligence
- **☎️ Phone Search** - Validate and trace phone numbers
- **🏠 Address Search** - Detailed location information
- **🚗 Vehicle Search** - License plate and VIN lookups
- **👤 Person Search** - People finding and profile aggregation

### Design
- Neon orange whiskey noir aesthetic
- Dark background (#0a0e27)
- Glowing effects and smooth animations
- Professional monospace typography
- Fully responsive desktop UI

## 🚀 Quick Start

### Option 1: Run as Desktop Application (Electron)

```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Build Windows EXE
npm run electron-build
```

### Option 2: Development Setup

**Frontend (React):**
```bash
npm run react-dev
```

**Backend (Python Flask):**
```bash
cd backend
pip install -r requirements.txt
python server.py
```

## 📦 Build & Distribution

After building, you'll get:
- `dist/OSINT Eye Setup 1.0.0.exe` - Windows installer
- `dist/OSINT Eye 1.0.0.exe` - Portable executable

Double-click the .exe to run!

## 🎨 Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS + Framer Motion
- **Desktop**: Electron
- **Backend**: Python Flask + Flask-CORS
- **Icons**: Lucide React

## 📋 Project Structure

```
OsintEye/
├── public/
│   ├── electron.js          # Main Electron process
│   ├── preload.js           # Preload script
│   └── index.html           # HTML template
├── src/
│   ├── App.tsx              # Main app component
│   ├── index.tsx            # React entry point
│   └── index.css            # Global styles
├── backend/
│   ├── server.py            # Flask API server
│   └── requirements.txt      # Python dependencies
├── package.json
└── README.md
```

## 🔗 API Endpoints

**POST** `/api/search`

Request:
```json
{
  "type": "telegram|coordinates|phone|address|vehicle|person",
  "query": "search_query_here"
}
```

Response:
```json
{
  "telegram": {...},
  "location": "...",
  "details": {...}
}
```

## ⚠️ Legal Notice

OSINT Eye is for **educational and authorized research purposes only**.
- ✅ Use public sources only
- ✅ Comply with all laws and regulations
- ✅ Respect privacy regulations (GDPR, CCPA, etc.)
- ❌ No hacking, stalking, or illegal activities

## 📝 License

MIT License - See LICENSE file

## 👥 Support

For issues and questions, open a GitHub issue.

---

**OSINT Eye** - *See Everything, Know Everything* 👁️
