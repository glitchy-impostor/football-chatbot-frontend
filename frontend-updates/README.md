# Football Analytics Chatbot - Frontend

A modern React-based chat interface for NFL analytics. Get data-driven football insights through natural conversation.

![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-38B2AC.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## Features

- 🏈 **Conversational Interface**: Ask football analytics questions naturally
- ⚡ **Real-time Responses**: Instant feedback with typing indicators
- 📅 **Season Selection**: Toggle between 2016-2025 NFL seasons
- ⭐ **Team Favorites**: Set your favorite team for personalized insights
- 🌓 **Dark/Light Mode**: Automatic theme based on system preferences
- 📱 **Mobile Responsive**: Works on all devices

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/football-chatbot-frontend.git
cd football-chatbot-frontend

# Install dependencies
npm install

# Configure API URL
cp .env.example .env
# Edit .env with your API URL
```

### Configuration

Edit `.env` to set your API URL:

```env
# For local backend
VITE_API_URL=http://localhost:8000

# For Krish's hosted backend (default)
VITE_API_URL=https://web-production-12eeb.up.railway.app

# For your own hosted backend
VITE_API_URL=https://your-backend.railway.app
```

### Development

```bash
npm run dev
```

App available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## API Endpoints

The frontend expects these endpoints (all prefixed with `/football/`):

| Endpoint | Description |
|----------|-------------|
| `POST /football/chat` | Main chat endpoint |
| `GET /football/health` | Health check |
| `GET /football/rate-limit/status` | Rate limit status |
| `GET /football/teams/{team}/profile` | Team profile |
| `GET /football/teams/compare` | Compare teams |

## Deployment

### GitHub Pages

Yes, you can deploy to GitHub Pages!

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`:**
   ```json
   {
     "homepage": "https://yourusername.github.io/football-chatbot-frontend",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update `vite.config.js`:**
   ```javascript
   export default defineConfig({
     base: '/football-chatbot-frontend/',
     plugins: [react()],
   })
   ```

4. **Set production API URL:**
   Create `.env.production`:
   ```env
   VITE_API_URL=https://web-production-12eeb.up.railway.app
   ```

5. **Deploy:**
   ```bash
   npm run deploy
   ```

> ⚠️ **Note**: The backend must be hosted separately. GitHub Pages only serves static files.

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set `VITE_API_URL` in Vercel's environment variables.

### Netlify

1. Build: `npm run build`
2. Deploy the `dist` folder
3. Set `VITE_API_URL` in environment variables

## Project Structure

```
football-chatbot-frontend/
├── src/
│   ├── components/
│   │   ├── ChatWindow.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── Sidebar.jsx
│   │   └── SettingsPanel.jsx
│   ├── hooks/
│   │   └── useApi.js
│   ├── config.js          # API configuration
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── vite.config.js
└── package.json
```

## Using Krish's Hosted Backend

By default, this frontend is configured to work with Krish's hosted backend:

```
https://web-production-12eeb.up.railway.app
```

This means you can deploy just the frontend (to GitHub Pages, Vercel, etc.) and it will work without running your own backend!

### Rate Limits on Hosted Backend

- **LLM Requests**: 100 per day per user
- **Resets**: Midnight UTC

## Customization

### Changing Theme Colors

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      }
    }
  }
}
```

### Adding Your Own Backend

1. Deploy the [backend](https://github.com/yourusername/football-chatbot-backend)
2. Set `VITE_API_URL` to your backend URL
3. Rebuild and redeploy frontend

## License

MIT License - see [LICENSE](LICENSE) for details.
