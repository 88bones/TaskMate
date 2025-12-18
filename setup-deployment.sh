#!/bin/bash

# TaskMate Vercel Deployment Setup Script

echo "🚀 TaskMate Vercel Deployment Setup"
echo "===================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git if not already
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git config user.email "you@example.com"
    git config user.name "Your Name"
fi

# Create .env file if not exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your MongoDB URI and JWT_SECRET"
fi

# Create client .env file if not exists
if [ ! -f client/.env ]; then
    echo "📝 Creating client/.env file..."
    cp client/.env.example client/.env
fi

# Install dependencies
echo "📥 Installing dependencies..."
npm install
cd client && npm install && cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your MongoDB connection string"
echo "2. Run 'npm start' to test locally"
echo "3. Push to GitHub: git add . && git commit -m 'Initial commit' && git push"
echo "4. Deploy to Vercel: vercel"
echo ""
echo "📖 Read VERCEL_DEPLOYMENT.md for detailed instructions"
