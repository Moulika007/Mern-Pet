# 🚀 Cloud Deployment Guide

## Frontend Deployment (Vercel/Netlify)

### Option 1: Vercel (Recommended)
1. **Push to GitHub:**
   ```bash
   cd FRONTEND
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/pethaven-frontend.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variable: `VITE_API_URL=https://your-backend-url.herokuapp.com/api`
   - Deploy

### Option 2: Netlify
1. **Build the project:**
   ```bash
   npm run build
   ```
2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Set environment variable: `VITE_API_URL=https://your-backend-url.herokuapp.com/api`

## Backend Deployment (Heroku/Railway)

### Option 1: Heroku
1. **Install Heroku CLI**
2. **Deploy:**
   ```bash
   cd mern-ecom-auth
   heroku create pethaven-backend
   heroku config:set MONGO_URI="your-mongodb-atlas-connection-string"
   heroku config:set JWT_SECRET="your-jwt-secret"
   git init
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 2: Railway
1. **Connect GitHub repository**
2. **Set environment variables:**
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret
   - `PORT`: 5000

## Environment Variables Setup

### Frontend (.env for production):
```env
VITE_API_URL=https://your-backend-url.herokuapp.com/api
```

### Backend (Heroku/Railway):
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pethaven_db
JWT_SECRET=your-super-secret-jwt-key
```

## Quick Fix for Current Error

**Update your frontend .env file:**
```env
VITE_API_URL=http://localhost:5000/api
```

**For production deployment, change to:**
```env
VITE_API_URL=https://your-deployed-backend-url.com/api
```

## Testing Deployment
1. **Local test:** `npm run dev` (should use localhost)
2. **Production test:** `npm run build && npm run preview`
3. **Check API calls** in browser network tab

## Common Issues & Solutions

### CORS Errors:
Add to your backend `index.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

### Environment Variables Not Working:
- Ensure variables start with `VITE_` for Vite
- Restart development server after changes
- Check deployment platform environment settings

---
✅ **Your app is now ready for cloud deployment!**