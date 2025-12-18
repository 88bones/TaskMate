# TaskMate - Vercel Deployment Changes Summary

## 📋 Changes Made

### 1. **Configuration Files Created/Updated**

#### Root Level Files:

- ✅ **vercel.json** - Vercel deployment configuration with build settings
- ✅ **.env.example** - Environment variables template (MongoDB URI, JWT Secret)
- ✅ **package.json** - Updated with proper engines and scripts
- ✅ **VERCEL_DEPLOYMENT.md** - Complete step-by-step deployment guide
- ✅ **.gitignore** - Updated to exclude sensitive files

#### Client Folder:

- ✅ **client/.env.example** - Frontend environment variables
- ✅ **client/package.json** - Added Node engines specification
- ✅ **client/src/config/api.js** - API configuration with dynamic base URL

#### API Folder:

- ✅ **api/index.js** - Express app wrapper for Vercel serverless functions

### 2. **Code Updates**

#### server/index.js:

- MongoDB URI now uses environment variable: `process.env.MONGODB_URI`
- Supports both local and cloud MongoDB connections

## 🚀 Quick Start Guide

### Step 1: Prepare Local Development

```bash
# Install dependencies
npm install
cd client && npm install
cd ..

# Create environment files
cp .env.example .env
cp client/.env.example client/.env
```

### Step 2: Update Environment Variables

**In `.env` file:**

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmate?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
PORT=3001
```

**In `client/.env` file:**

```
VITE_API_BASE_URL=http://localhost:3001
```

### Step 3: Test Locally

```bash
npm start        # Runs server on port 3001
# In another terminal:
cd client
npm run dev      # Runs client on port 5173
```

### Step 4: Push to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/taskmate.git
git push -u origin main
```

### Step 5: Deploy to Vercel

**Option A - Using Vercel CLI:**

```bash
npm i -g vercel
vercel login
vercel
```

**Option B - Using Vercel Dashboard:**

1. Go to vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string

## ⚠️ Important Configuration for Vercel

### Environment Variables to Set in Vercel Dashboard:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
```

### MongoDB Atlas Setup:

1. Create a cluster at mongodb.com
2. Create a database user
3. Add your Vercel deployment IP to whitelist (or use 0.0.0.0/0)
4. Get connection string and add to Vercel environment

## 🔧 API Service Updates Required

All files in `client/src/services/` need to be updated to use dynamic API URL.

### Change Pattern (Example):

**Before:**

```javascript
const res = await axios.get("http://localhost:3001/api/users/user");
```

**After:**

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const res = await axios.get(`${API_BASE_URL}/api/users/user`);
```

**Files to Update:**

- getActivity.js
- getNotification.js
- getProject.js
- getTask.js
- getTeam.js
- getUser.js
- postProject.js
- postSignIn.js
- postSignUp.js
- deleteProject.js
- deleteTask.js
- deleteUser.js
- updateProject.js
- updateTask.js
- updateUser.js
- (and any other service files)

See `API_UPDATES_TEMPLATE.md` for the pattern to follow.

## 🗂️ Project Structure After Changes

```
TaskMate/
├── api/
│   └── index.js                    # Vercel serverless handler
├── client/
│   ├── src/
│   │   ├── config/
│   │   │   └── api.js             # Dynamic API URL config
│   │   ├── services/              # Update these files ⚠️
│   │   └── ...
│   ├── .env.example               # NEW
│   ├── package.json               # UPDATED
│   └── ...
├── server/
│   ├── index.js                   # UPDATED
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── ...
├── .env.example                   # NEW
├── vercel.json                    # NEW
├── package.json                   # UPDATED
├── VERCEL_DEPLOYMENT.md           # NEW
├── API_UPDATES_TEMPLATE.md        # NEW
└── ...
```

## 📊 Architecture After Deployment

```
┌─────────────────┐
│  Vercel Frontend │ (React + Vite - client/dist)
│  & API Routes   │
└────────┬────────┘
         │
    ┌────▼────────────────┐
    │ Vercel Serverless   │
    │ Functions (api/*)   │
    └────┬────────────────┘
         │
    ┌────▼─────────────────┐
    │ MongoDB Atlas Cloud  │
    │ Database            │
    └─────────────────────┘
```

## ✅ Deployment Checklist

- [ ] Create MongoDB Atlas cluster and get connection string
- [ ] Create `.env` file with MONGODB_URI and JWT_SECRET
- [ ] Update all API service files with dynamic URL
- [ ] Test locally: `npm start` (server) and `npm run dev` (client)
- [ ] Push to GitHub
- [ ] Deploy with Vercel CLI or Dashboard
- [ ] Set environment variables in Vercel Dashboard
- [ ] Test deployed application
- [ ] Enable automatic deployments (push to main triggers deploy)

## 📝 Additional Considerations

### File Uploads

Vercel has ephemeral storage. For persistent file uploads, migrate to:

- AWS S3
- Cloudinary
- Azure Blob Storage
- Firebase Storage

### Cold Starts

First request to your API may take 1-2 seconds (normal serverless behavior)

### Session Management

Ensure JWT tokens and session management work across serverless instances

### CORS

Already configured in your code - should work fine

## 🆘 Troubleshooting

### MongoDB Connection Fails

- Verify connection string in Vercel environment variables
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Build Fails

- Check build logs in Vercel Dashboard
- Ensure all dependencies are installed
- Verify vercel.json configuration

### Frontend Can't Connect to API

- Check VITE_API_BASE_URL environment variable
- Update all service files with dynamic URL
- Check browser console for CORS errors

## 📚 Resources

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Vite Guide: https://vitejs.dev/guide/
- Express.js: https://expressjs.com/

## 🎯 Next Steps

1. Read `VERCEL_DEPLOYMENT.md` for detailed instructions
2. Update all service files in `client/src/services/`
3. Test locally
4. Deploy to Vercel

**Good luck! 🚀**
