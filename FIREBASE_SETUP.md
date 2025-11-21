# Firebase Setup Guide 🔥

This guide will walk you through setting up Firebase for your Romantic Birthday Surprise app.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter a project name (e.g., "birthday-surprise")
4. Disable Google Analytics (optional, not needed for this project)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click the Web icon (`</>`)
2. Enter an app nickname (e.g., "Birthday Web App")
3. Don't check "Set up Firebase Hosting" (unless you want to use it)
4. Click "Register app"
5. Copy the Firebase configuration object
6. Click "Continue to console"

## Step 3: Enable Firestore Database

1. In the left sidebar, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode" (we'll set custom rules)
4. Select your Firestore location (choose closest to your users)
5. Click "Enable"

## Step 4: Set Up Firestore Rules

1. Go to the "Rules" tab in Firestore
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow everyone to read the config
    match /config/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

## Step 5: Create Firestore Data

1. Go to the "Data" tab in Firestore
2. Click "Start collection"
3. Collection ID: `config`
4. Click "Next"
5. Document ID: `birthday`
6. Add the following fields:

### Field: photos (array)
Click "Add field":
- Field: `photos`
- Type: `array`
- Values (add each URL as a string):
  ```
  https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800
  https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800
  https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800
  ```
  (Replace with your own image URLs)

### Field: youtubeId (string)
Click "Add field":
- Field: `youtubeId`
- Type: `string`
- Value: `dQw4w9WgXcQ` (Replace with your YouTube video ID)

### Field: cardMessage (string)
Click "Add field":
- Field: `cardMessage`
- Type: `string`
- Value: Your custom love letter message

Example:
```
Happy Birthday, my love! Every moment with you is a treasure. You make my world brighter, my days sweeter, and my heart fuller. Here's to many more beautiful memories together. I love you more than words can express. ❤️
```

### Field: giftMessage (string)
Click "Add field":
- Field: `giftMessage`
- Type: `string`
- Value: Your surprise message

Example:
```
🎉 Your gift is waiting for you! Check your email for a special surprise... 💝
```

7. Click "Save"

## Step 6: Configure Environment Variables

1. Open the `.env.local` file in your project
2. Replace the placeholder values with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXxXxXxXxXxXxXxXxXxXxXxXxXxXxX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**Where to find these values:**
- Go to Project Settings (gear icon in Firebase Console)
- Scroll down to "Your apps"
- Click on your web app
- Copy each value from the config object

## Step 7: Test the Connection

1. Restart your development server:
```bash
npm run dev
```

2. Open your browser console (F12)
3. You should see Firebase connecting
4. Check that your custom messages and photos appear

## Optional: Enable Firebase Authentication

If you want to protect write access to your data:

1. Go to "Authentication" in Firebase Console
2. Click "Get started"
3. Enable "Email/Password" or "Google" sign-in
4. Create a user account
5. Use this account to update Firestore data

## Firestore Data Structure Reference

Your final Firestore structure should look like this:

```
config (collection)
  └── birthday (document)
      ├── photos: [array of strings]
      ├── youtubeId: string
      ├── cardMessage: string
      └── giftMessage: string
```

## Tips for Photo URLs

### Using Unsplash
1. Go to [Unsplash](https://unsplash.com)
2. Find romantic/couple photos
3. Right-click on image → "Copy image address"
4. Add `?w=800` to optimize size

### Using Firebase Storage
1. Go to "Storage" in Firebase Console
2. Click "Get started"
3. Upload your photos
4. Click on uploaded image → Copy download URL
5. Add URLs to Firestore `photos` array

### Using Image Hosting Services
- [Imgur](https://imgur.com)
- [Cloudinary](https://cloudinary.com)
- [ImgBB](https://imgbb.com)

## Getting YouTube Video ID

From any YouTube URL:
- `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`
- `https://youtu.be/dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`

## Troubleshooting

### Error: "Missing or insufficient permissions"
- Check Firestore Rules allow read access
- Ensure the document path is exactly `config/birthday`

### Error: "Failed to get document"
- Verify `.env.local` has correct Firebase credentials
- Restart the development server after changing `.env.local`

### Photos not loading
- Check image URLs are publicly accessible
- Test URLs in a new browser tab
- Ensure URLs use `https://` not `http://`

### YouTube video not playing
- Verify video is not private or restricted
- Check the video ID is correct
- Ensure the video allows embedding

## Security Notes

- The current setup allows public read access to your config
- Only authenticated users can modify data
- Don't store sensitive information in Firestore
- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser

---

**Need Help?**
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
