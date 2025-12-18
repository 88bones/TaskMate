# Vercel Deployment Guide - TaskMate

## Prerequisites

1. A Vercel account (https://vercel.com)
2. GitHub account with your project repository
3. MongoDB Atlas account (https://www.mongodb.com/cloud/atlas) for cloud database

## Step 1: Prepare Your MongoDB Database

1. Go to MongoDB Atlas and create a cluster
2. Create a database user with credentials
3. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/taskmate?retryWrites=true&w=majority`

## Step 2: Push Your Project to GitHub

```bash
git init
git add .
git commit -m "Initial commit for Vercel deployment"
git branch -M main
git remote add origin https://github.com/your-username/taskmate.git
git push -u origin main
```

## Step 3: Deploy on Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy from your project root:

```bash
vercel
```

4. Follow prompts and set environment variables when asked

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Configure:

   - **Framework**: Vite
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
   - **Root Directory**: `.` (leave as default)

5. Add Environment Variables in Vercel Dashboard:
   - Click "Environment Variables"
   - Add these variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A secure random string (e.g., use: https://generate-random.org/)
     - `VITE_API_BASE_URL`: Your deployed API URL (e.g., https://your-project.vercel.app)

## Step 4: Set Environment Variables

In Vercel Dashboard, go to Settings > Environment Variables and add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmate?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
```

## Step 5: Update Frontend Environment

Create `.env.production` in the client folder:

```
VITE_API_BASE_URL=https://your-project.vercel.app
```

## Step 6: Verify Deployment

After deployment:

1. Check build logs in Vercel Dashboard
2. Visit your deployed URL
3. Test API connectivity

## Troubleshooting

### Cold Starts

- Serverless functions have cold start delays (~1-2 seconds first call)
- This is normal behavior

### MongoDB Connection Issues

- Ensure MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (allow all: 0.0.0.0/0)
- Test connection locally first

### Upload Directory Not Available

- Vercel uses ephemeral storage
- For file uploads, use cloud storage (AWS S3, Cloudinary, etc.)

### CORS Issues

- CORS is configured in your code
- Ensure frontend and backend URLs match

## Important Notes

1. **Uploads**: The `/uploads` directory won't persist on Vercel serverless. Consider using:

   - AWS S3
   - Cloudinary
   - Firebase Storage
   - MongoDB with GridFS

2. **Database**: Use MongoDB Atlas cloud database, not localhost

3. **Environment Variables**: Never commit `.env` files. Use Vercel Dashboard

## Local Testing Before Deployment

```bash
# Test locally first
cd client && npm install && npm run build
cd ..
npm install
npm start

# Then deploy
vercel
```

## Redeployment

After making changes:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will automatically deploy on push to main branch.

## Support

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
