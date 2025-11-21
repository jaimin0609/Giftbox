# Romantic Interactive Birthday Surprise 🎁💝

A beautiful, interactive birthday surprise web application built with Next.js 14+, featuring stunning animations, romantic design, and real-time Firebase integration.

![Rose & Gold Theme](https://img.shields.io/badge/Theme-Rose%20%26%20Gold-ff69b4)
![Next.js 14+](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Features

### 🎨 Six Beautiful Interactive Views

1. **Intro View**: Romantic greeting with playful "Yes/No" buttons
2. **Menu Hub**: Glassmorphism cards with hover effects
3. **Photo Gallery**: Masonry layout with lightbox functionality
4. **Video Player**: Embedded YouTube video with custom styling
5. **Love Letter**: Animated birthday card with 3D effects
6. **Gift Surprise**: Interactive gift box with confetti explosion

### 🎭 Advanced Animations

- **Framer Motion**: Complex staggered animations and transitions
- **Confetti Effects**: Canvas-based particle explosion
- **Glassmorphism**: Modern backdrop-blur effects
- **3D Transforms**: Rotating cards and flying gift lids
- **Floating Blobs**: Animated background elements

### 🔥 Firebase Integration

- **Real-time Updates**: Content updates without page refresh
- **Firestore Database**: Store photos, messages, and video IDs
- **Graceful Fallback**: Works with default data if Firebase is unavailable

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Firebase project (optional, app works with default data)

### Installation

```bash
# Clone or navigate to project
cd giftbox

# Install dependencies (if not already installed)
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local with your Firebase credentials (optional)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
giftbox/
├── app/
│   ├── page.tsx          # Main application component
│   ├── layout.tsx        # Root layout with fonts
│   └── globals.css       # Global styles & Tailwind
├── lib/
│   └── firebase.ts       # Firebase configuration
├── public/               # Static assets
└── .env.local           # Environment variables
```

## 🎨 Customization

### Update Content via Firebase

1. Follow the [Firebase Setup Guide](./FIREBASE_SETUP.md)
2. Create a Firestore document: `config/birthday`
3. Add your custom content:

```json
{
  "photos": ["url1", "url2", "url3"],
  "youtubeId": "your-video-id",
  "cardMessage": "Your message...",
  "giftMessage": "Your surprise..."
}
```

### Update Default Content

Edit `app/page.tsx` and modify the `appData` state:

```typescript
const [appData, setAppData] = useState<AppData>({
  photos: ['your-photo-urls'],
  youtubeId: 'your-video-id',
  cardMessage: 'Your personalized message',
  giftMessage: 'Your gift reveal message',
});
```

### Color Palette

The app uses a "Rose & Gold" theme. Customize colors in `globals.css`:

```css
/* Primary colors */
rose-50, rose-200, rose-400, rose-500, rose-900
pink-50, pink-200, pink-400, pink-500
amber-50, amber-200, amber-400

/* Gradients */
bg-linear-to-br from-rose-50 via-pink-50 to-amber-50
```

## 🎯 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14+** | React framework with App Router |
| **TypeScript** | Type safety and better DX |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Complex animations |
| **Lucide React** | Beautiful icons |
| **Firebase v9** | Firestore database & real-time sync |
| **canvas-confetti** | Confetti effects |

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/giftbox)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Responsive Design

The app is fully responsive and optimized for:
- 📱 Mobile devices (portrait & landscape)
- 📱 Tablets
- 💻 Desktops
- 🖥️ Large screens

## 🎬 Views Overview

### 1. Intro View
- Large romantic greeting: "Hi, Love! 💝"
- **Yes Button**: Proceeds to menu
- **No Button**: Runs away from cursor or shows toast

### 2. Menu View
- 4 glassmorphism cards in a grid
- Icons: Camera, Headphones, Book, Gift
- Hover effects with scale and glow

### 3. Photos View
- Responsive grid layout (1/2/3 columns)
- Staggered pop-in animations
- Fullscreen lightbox on click

### 4. Video View
- YouTube iframe embed
- Custom styling with backdrop blur
- Responsive aspect ratio

### 5. Card View
- 3D flip animation on entry
- Decorative emoji background
- Romantic serif typography

### 6. Gift View
- Interactive SVG gift box
- Click to unwrap animation
- Multi-directional confetti explosion
- Message reveal with spring animation

## 🔧 Development

```bash
# Run dev server with hot reload
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Format code
npm run format
```

## 🐛 Known Issues

- None currently! 🎉

## 📝 License

MIT License - feel free to use this for your loved ones!

## 💖 Credits

Created with love for making birthdays extra special.

---

**Made with ❤️ using Next.js and Framer Motion**
