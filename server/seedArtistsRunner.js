#!/usr/bin/env node

/**
 * Artist Data Seeding Script Runner
 * 
 * This script creates multiple sample artist accounts with complete, realistic data:
 * - 10 diverse artists with authentic Indian names and backgrounds
 * - Mix of email and phone number signups (not both)
 * - Complete profiles with bios, display pictures, locations, and specializations
 * - 3-6 artworks per artist with realistic descriptions and metadata
 * - Random likes from other artists (0-8 likes per artwork)
 * - Artist follows (2-5 follows per artist)
 * - Bookmarks (1-4 bookmarked artworks from other artists)
 * - No empty fields - all data is complete and human-like
 * 
 * Usage: node seedArtistsRunner.js
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log('🚀 Starting Artist Database Seeding Process...');
console.log('📍 Current directory:', __dirname);
console.log('🔌 MongoDB URI:', process.env.MONGO_URI ? 'Connected' : 'Not found');

if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI not found in environment variables');
    console.log('💡 Make sure you have a .env file with MONGO_URI set');
    process.exit(1);
}

// Import and run the seeding script
require('./data/seedArtists.js');
