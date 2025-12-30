#!/bin/bash
# Local development server for SkyShield Website
# This allows you to preview changes before deploying to production

echo "🚀 Starting local development server..."
echo "📍 Your website will be available at: http://localhost:8000"
echo "🔄 Make changes to your files and refresh the browser to see updates"
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

# Start a simple HTTP server
python3 -m http.server 8000
