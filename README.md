# 💝 Romantic Interactive Birthday Surprise

A stunning, interactive birthday surprise web application featuring smooth animations, photo galleries, video messages, and an interactive gift unwrapping experience.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-ff69b4?style=flat-square)

## ✨ Features

### 🎭 Interactive Views
- **Playful Intro**: A fun "Yes/No" interaction where the "No" button playfully runs away
- **Glassmorphism Menu**: Beautiful frosted glass effect cards with hover animations
- **Photo Gallery**: Masonry layout with staggered animations and full-screen lightbox
- **Video Player**: Elegantly embedded YouTube video with custom styling
- **Love Letter Card**: 3D flip animation with romantic message
- **Interactive Gift**: Click-to-unwrap animation with confetti explosion

### 🎨 Design Highlights
- Rose & Gold color palette for romantic aesthetic
- Playfair Display serif font for elegant typography
- Backdrop blur and glassmorphism effects throughout
- Smooth Framer Motion animations and transitions
- Fully responsive for mobile, tablet, and desktop
- Floating blob decorations with CSS animations

### 🔥 Firebase Integration
- Real-time data synchronization
- Dynamic content updates without redeploying
- Fallback to default content when offline

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account (free tier works great)

### Installation

1. **Clone and install**
```bash
cd giftbox
npm install
```

2. **Set up Firebase** (detailed guide in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))
   - Create Firebase project
   - Enable Firestore
   - Copy credentials to `.env.local`

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
giftbox/
├── app/
│   ├── page.tsx          # Main component with all views
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles & animations
├── lib/
│   └── firebase.ts       # Firebase configuration
├── .env.local            # Environment variables (create this)
├── FIREBASE_SETUP.md     # Detailed Firebase guide
└── INSTRUCTIONS.md       # Complete customization guide
```

## 🎨 Customization

### Update Content via Firebase

The easiest way to customize is through Firebase Firestore:

1. Go to Firebase Console → Firestore Database
2. Edit the `config/birthday` document
3. Update fields:
   - `photos`: Array of image URLs
   - `youtubeId`: YouTube video ID
   - `cardMessage`: Your love letter text
   - `giftMessage`: Surprise message after unwrapping

Changes appear instantly without redeploying! 🎉

### Modify Default Content

Edit the `appData` state in `app/page.tsx`:

```typescript
const [appData, setAppData] = useState<AppData>({
  photos: ['your-image-urls'],
  youtubeId: 'YOUR_VIDEO_ID',
  cardMessage: 'Your message...',
  giftMessage: 'Your surprise...',
});
```

### Change Colors

Edit `app/globals.css` to customize the color palette:

```css
--color-rose-500: #f43f5e;
--color-pink-500: #ec4899;
--color-amber-400: #fbbf24;
```

## 📚 Documentation

- **[INSTRUCTIONS.md](./INSTRUCTIONS.md)** - Complete setup and customization guide
- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Step-by-step Firebase configuration

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14+** | React framework with App Router |
| **TypeScript** | Type safety and better DX |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Smooth animations & transitions |
| **Lucide React** | Beautiful icon library |
| **Firebase v9** | Real-time database & hosting |
| **react-youtube** | YouTube video embedding |
| **canvas-confetti** | Celebration effects |

## 🎯 View Components

### 1. Intro View
- Large romantic greeting
- Animated floating text
- Interactive Yes/No buttons
- Toast notifications

### 2. Menu View
- 4 glassmorphism cards
- Staggered entrance animations
- Hover scale & glow effects
- Icon-based navigation

### 3. Photos View
- Responsive grid layout
- Staggered pop-in animations
- Click to open lightbox
- Full-screen photo viewer

### 4. Video View
- YouTube embed integration
- Custom styling frame
- Responsive aspect ratio
- Smooth entrance animation

### 5. Card View
- 3D flip animation entrance
- Custom romantic message
- Decorative emoji elements
- Elegant typography

### 6. Gift View
- SVG gift box illustration
- Shake animation on click
- Lid flies off animation
- Multi-color confetti explosion
- Reveal message with spring animation

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms
- Netlify
- Railway  
- AWS Amplify
- Cloudflare Pages

## 🔒 Environment Variables

Create `.env.local` in the root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Important:** Never commit `.env.local` to version control!

## 🎨 Animation Details

- **Intro Animation**: Fade in + float up with easing
- **Menu Cards**: Stagger children with scale transitions
- **Photos**: Sequential pop-in with rotation on hover
- **Lightbox**: Scale & fade with backdrop blur
- **Card**: 3D rotateY flip entrance
- **Gift Box**: Shake → Explode → Confetti → Reveal
- **Background Blobs**: Infinite floating animation

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify `.env.local` credentials
- Check Firestore rules allow read access
- Restart dev server after env changes

### Images Not Loading
- Ensure URLs are publicly accessible
- Check CORS policies
- Use HTTPS URLs

### Animations Choppy
- Reduce number of confetti particles
- Simplify blob animations
- Check GPU acceleration

## 📝 License

This project is open source and available for personal use.

## 💖 Made With Love

Built with modern web technologies to create magical moments.

---

**⭐ Star this repo if you found it useful!**

**Need help?** Check out [INSTRUCTIONS.md](./INSTRUCTIONS.md) and [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

