#!/bin/bash

# KalaSangam Project Setup Fix Script
# Run this script if you're having issues with the project setup

echo "🎨 KalaSangam Setup Fix Script"
echo "================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -d "client/kala-sangam" ] && [ ! -d "server" ]; then
    print_error "Please run this script from the TRADITIONAL-ARTS root directory"
    exit 1
fi

print_status "Checking Node.js version..."
node_version=$(node --version 2>/dev/null)
if [ $? -eq 0 ]; then
    print_success "Node.js found: $node_version"
else
    print_error "Node.js not found! Please install Node.js from https://nodejs.org/"
    exit 1
fi

print_status "Checking npm version..."
npm_version=$(npm --version 2>/dev/null)
if [ $? -eq 0 ]; then
    print_success "npm found: $npm_version"
else
    print_error "npm not found! Please install npm"
    exit 1
fi

# Fix client setup
print_status "Setting up frontend (client)..."
cd client/kala-sangam

if [ ! -f "package.json" ]; then
    print_error "package.json not found in client/kala-sangam!"
    exit 1
fi

# Remove problematic config files if they exist
if [ -f "postcss.config.js" ]; then
    print_warning "Removing conflicting postcss.config.js..."
    rm postcss.config.js
fi

if [ -f "tailwind.config.js" ]; then
    print_warning "Removing conflicting tailwind.config.js..."
    rm tailwind.config.js
fi

# Clean and reinstall dependencies
print_status "Cleaning client dependencies..."
rm -rf node_modules package-lock.json
npm cache clean --force

print_status "Installing client dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Client dependencies installed successfully!"
else
    print_error "Failed to install client dependencies"
    exit 1
fi

# Test build
print_status "Testing client build..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_success "Client build test passed!"
else
    print_warning "Client build test failed - but the dev server might still work"
fi

# Fix server setup
print_status "Setting up backend (server)..."
cd ../../server

if [ ! -f "package.json" ]; then
    print_error "package.json not found in server!"
    exit 1
fi

# Clean and reinstall dependencies
print_status "Cleaning server dependencies..."
rm -rf node_modules package-lock.json
npm cache clean --force

print_status "Installing server dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Server dependencies installed successfully!"
else
    print_error "Failed to install server dependencies"
    exit 1
fi

# Check .env file
if [ ! -f ".env" ]; then
    print_warning "Creating default .env file..."
    cat > .env << EOL
PORT=5050
MONGODB_URI=mongodb://localhost:27017/kalasangam
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
EOL
    print_success "Default .env file created. Please update with your actual values."
else
    print_success ".env file already exists"
fi

cd ..

print_success "Setup complete! 🎉"
echo ""
echo "Next steps:"
echo "1. Terminal 1: cd server && npm start"
echo "2. Terminal 2: cd client/kala-sangam && npm run dev"
echo "3. Open http://localhost:5173/home in your browser"
echo ""
echo "If you still have issues, check the SETUP_GUIDE.md file"
