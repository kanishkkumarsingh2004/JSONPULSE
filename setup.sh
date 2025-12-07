#!/bin/bash

echo "🚀 Setting up JsonPulse..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client and push database schema
echo "🗄️  Setting up database..."
npx prisma generate
npx prisma db push

echo "✅ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"
