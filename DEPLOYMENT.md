# Legcy Sneakers - Deployment Guide

## Frontend Deployment (Vercel)

### Steps:
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect it's a React app
5. Click "Deploy"

### Environment Variables (Not needed for frontend):
The frontend will connect to your backend API URL.

---

## Backend Deployment (Render.com - FREE)

### Steps:

1. **Go to [Render.com](https://render.com) and sign up**

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure the service:**
   - **Name:** `legcy-sneakers-api`
   - **Region:** Choose closest to Egypt (Europe - Frankfurt)
   - **Branch:** `main`
   - **Root Directory:** Leave empty
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
   - **Instance Type:** `Free`

4. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   ```
   MONGODB_URI=mongodb+srv://abrahemelgazaly2_db_user:abrahem88@cluster0.dj5drk5.mongodb.net/legcy-sneakers?retryWrites=true&w=majority&appName=Cluster0
   
   CLOUDINARY_CLOUD_NAME=dkznmxklj
   
   CLOUDINARY_API_KEY=273185543492271
   
   CLOUDINARY_API_SECRET=3T-fU1UTeptmERACQ0AOQpq-n6I
   
   PORT=5000
   ```

5. **Click "Create Web Service"**

6. **Wait for deployment** (takes 2-3 minutes)

7. **Copy your API URL** (will be like: `https://legcy-sneakers-api.onrender.com`)

---

## Update Frontend to use Backend URL

After deploying backend, update all API calls in your React app:

### Option 1: Environment Variable (Recommended)
Create `.env.production` file:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

Then update all axios calls to use:
```javascript
axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
```

### Option 2: Direct URL
Replace all `http://localhost:5000` with your Render URL in:
- `src/pages/CheckoutPage.js`
- `src/pages/ProductDetailsPage.js`
- `src/pages/HomePage.js`
- `src/pages/admin/AddProduct.js`
- `src/pages/admin/ManageProducts.js`
- `src/pages/admin/Orders.js`
- `src/pages/admin/PromoCodes.js`
- `src/components/ProductCard.js`
- And all other files using axios

---

## MongoDB Atlas Setup

Make sure your MongoDB Atlas allows connections from anywhere:
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Add `0.0.0.0/0` (Allow from anywhere)
4. Save

---

## Final Steps

1. Deploy backend to Render
2. Get backend URL
3. Update frontend API URLs
4. Push changes to GitHub
5. Vercel will auto-deploy the updated frontend

---

## Testing

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.onrender.com/api/products`

---

## Notes

- Render free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading to paid plan for production
- Vercel frontend is always fast and doesn't sleep

---

## Alternative: Deploy Backend to Railway.app

Railway is another free option:
1. Go to [Railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repo
4. Add environment variables
5. Set start command: `node server/index.js`
6. Deploy

---

Good luck! 🚀
