# Romantic Interactive Birthday Surprise 💝

A beautiful, interactive birthday surprise web application built with Next.js 14+, featuring romantic animations, photo galleries, video messages, and interactive gift unwrapping.

## ✨ Features

- **Intro Screen**: Playful "Yes/No" interaction with a button that runs away
- **Menu Hub**: Beautiful glassmorphism cards for navigation
- **Photo Gallery**: Masonry layout with lightbox functionality
- **Video Player**: Embedded YouTube video with elegant framing
- **Love Letter**: Animated card with custom message
- **Interactive Gift**: 3D-style gift box with confetti explosion

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Firebase v9 (Firestore & Auth)
- **Video**: react-youtube
- **Effects**: canvas-confetti

## 📦 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable Firestore Database
   - Copy your Firebase config credentials
   - Create a `.env.local` file with your credentials (see `.env.local` example)

4. Set up Firestore data (see Firebase Setup section below)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 🔥 Firebase Setup

### 1. Firestore Structure

Create a collection called `config` with a document `birthday`:

```javascript
{
  photos: [
    "https://your-image-url-1.jpg",
    "https://your-image-url-2.jpg",
    "https://your-image-url-3.jpg",
    // Add more photo URLs
  ],
  youtubeId: "YOUR_YOUTUBE_VIDEO_ID",
  cardMessage: "Your custom love letter message here...",
  giftMessage: "Your surprise message after gift unwrapping..."
}
```

### 2. Firestore Rules

Set up security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /config/{document=**} {
      allow read: if true;  // Public read access
      allow write: if request.auth != null;  // Authenticated users only
    }
  }
}
```

### 3. Environment Variables

Update `.env.local` with your Firebase credentials:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🎨 Customization

### Colors

The app uses a romantic Rose & Gold color palette. To customize colors, edit `app/globals.css`:

```css
--color-rose-500: #f43f5e;
--color-pink-500: #ec4899;
--color-amber-400: #fbbf24;
```

### Fonts

The app uses Playfair Display for romantic serif text. To change fonts, update the Google Fonts import in `app/globals.css`.

### Messages

Default messages are hardcoded in `app/page.tsx` but will be overridden by Firebase data when available. Update the `appData` state in the component for offline defaults.

### Photos

Replace the default Unsplash URLs with your own photos by updating the Firebase document or the default state in `app/page.tsx`.

### YouTube Video

Change the video by updating the `youtubeId` field in Firebase or the default state. Get the video ID from any YouTube URL:
- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID: `dQw4w9WgXcQ`

## 🎭 Animation Features

- **Framer Motion**: Smooth page transitions and element animations
- **Blob Animation**: Floating background decorations
- **Stagger Children**: Sequential photo gallery appearance
- **Gift Box Animation**: Interactive unwrapping sequence
- **Confetti Explosion**: Canvas-based particle effects
- **Lightbox**: Full-screen photo viewer

## 📱 Responsive Design

The application is fully responsive and works beautifully on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Other Platforms

The app can be deployed to any Next.js-compatible hosting:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean

## 📝 License

This project is open source and available for personal use.

## 💖 Credits

Built with love using modern web technologies.

---

**Tip**: Test all features before sharing with your loved one! Make sure Firebase is properly configured and all images/videos are accessible.
