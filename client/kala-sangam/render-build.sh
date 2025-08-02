#!/usr/bin/env bash
# Render build script for React SPA

# Install dependencies
npm install

# Build the application
npm run build

# Copy _redirects file to dist if it doesn't exist
if [ ! -f dist/_redirects ]; then
  echo "/*    /index.html   200" > dist/_redirects
fi
