# Sample Firestore Data Structure

## Collection: `config`
## Document ID: `birthday`

```json
{
  "photos": [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80",
    "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80"
  ],
  "youtubeId": "dQw4w9WgXcQ",
  "cardMessage": "Happy Birthday, my love! ❤️\n\nEvery moment with you is a treasure. You make my world brighter, my days sweeter, and my heart fuller. \n\nHere's to many more beautiful memories together. I love you more than words can express.\n\nYou mean everything to me. 💝",
  "giftMessage": "🎉 Your gift is waiting for you!\n\nI've planned something special... Check your email for details!\n\nGet ready for an amazing surprise! 💝✨"
}
```

## Field Types

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `photos` | `array` | Array of image URLs | Unsplash, Imgur, Firebase Storage URLs |
| `youtubeId` | `string` | YouTube video ID only | "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ |
| `cardMessage` | `string` | Birthday card message (supports \n for line breaks) | Multi-line romantic message |
| `giftMessage` | `string` | Message shown after gift unwrap | Gift reveal or surprise details |

## Using Firebase Console

### Method 1: Manual Entry

1. Go to Firebase Console → Firestore Database
2. Click "Start collection"
3. Collection ID: `config`
4. Document ID: `birthday`
5. Add fields one by one:
   - Click "Add field"
   - Set field name, type, and value
   - For arrays: click "+" to add items

### Method 2: Import JSON (Easier)

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Create `firestore-data.json`:

```json
{
  "config": {
    "birthday": {
      "photos": ["url1", "url2"],
      "youtubeId": "your-id",
      "cardMessage": "Your message",
      "giftMessage": "Your gift message"
    }
  }
}
```

4. Import: `firebase firestore:import firestore-data.json`

## Photo URL Sources

### Option 1: Unsplash (Free, High Quality)
```
https://images.unsplash.com/photo-{photo-id}?w=800&q=80
```

### Option 2: Imgur (Free Hosting)
1. Upload to Imgur.com
2. Get direct image link
3. Use URL in photos array

### Option 3: Firebase Storage
1. Go to Firebase Console → Storage
2. Upload images
3. Click image → Get download URL
4. Use URL in photos array

### Option 4: Your Own Hosting
- Any publicly accessible image URL works

## YouTube Video ID

From URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`  
Extract ID: `dQw4w9WgXcQ` (everything after `v=`)

## Message Formatting Tips

### Card Message
- Use `\n` for line breaks
- Keep it heartfelt and personal
- Emojis are fully supported: 💖 ❤️ 🎂 🎉
- Recommended length: 50-150 words

### Gift Message
- Tease the surprise
- Build excitement
- Can include instructions
- Keep it concise: 20-50 words

## Testing

After updating Firestore:
1. Open your app
2. Changes appear in real-time (no refresh needed)
3. If Firebase is down, app uses default data

## Security Rules

For read-only public access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /config/{document=**} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users
    }
  }
}
```

For completely private (you edit via console):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /config/{document=**} {
      allow read: if true;
      allow write: if false; // Edit only via Firebase Console
    }
  }
}
```
