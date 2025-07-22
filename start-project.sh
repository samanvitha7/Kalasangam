#!/bin/bash

echo "🚀 Starting TRADITIONAL-ARTS project..."
echo ""

PROJECT_DIR="/Users/shreyuuu/Desktop/TRADITIONAL-ARTS"

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
}

# Start backend server
echo "1. Starting backend server..."
if check_port 5050; then
    echo "   ✅ Backend server already running on port 5050"
else
    echo "   🔧 Starting backend server on port 5050..."
    cd "$PROJECT_DIR/server"
    npm start > server.log 2>&1 &
    sleep 3
    
    if check_port 5050; then
        echo "   ✅ Backend server started successfully"
    else
        echo "   ❌ Failed to start backend server"
        echo "   📝 Check server.log for errors"
    fi
fi

# Start frontend
echo ""
echo "2. Starting frontend development server..."
if check_port 5173; then
    echo "   ✅ Frontend already running on port 5173"
else
    echo "   🔧 Starting frontend server on port 5173..."
    cd "$PROJECT_DIR/client/kala-sangam"
    npm run dev > frontend.log 2>&1 &
    sleep 5
    
    if check_port 5173; then
        echo "   ✅ Frontend server started successfully"
    else
        echo "   ❌ Failed to start frontend server"
        echo "   📝 Check frontend.log for errors"
    fi
fi

echo ""
echo "🎉 Project startup complete!"
echo ""
echo "📋 Available URLs:"
echo "   🌐 Frontend: http://localhost:5173"
echo "   ⚙️  Backend API: http://localhost:5050/api"
echo ""
echo "📍 Key pages to test:"
echo "   • Home: http://localhost:5173"
echo "   • About: http://localhost:5173/about"
echo "   • Art Gallery: http://localhost:5173/gallery"
echo ""
echo "🔧 To stop the servers:"
echo "   pkill -f 'npm start'"
echo "   pkill -f 'npm run dev'"
