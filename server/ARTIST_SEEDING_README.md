# Artist Database Seeding

This directory contains scripts to populate your TRADITIONAL-ARTS database with realistic sample artist data.

## What Gets Created

The seeding script creates **26 diverse artist accounts** with complete, realistic data:

### Artist Profiles
- **Authentic names**: Indian names representing different regions
- **Signup methods**: Mix of email and phone number signups (not both)
- **Complete profiles**: No empty fields
  - Professional bio (150+ words each)
  - Profile picture (randomuser.me portraits)
  - Cover images (high-quality Unsplash images)
  - Location (city, state)
  - Specialization (traditional art form)
  - Social media links (Instagram, Website, Behance, LinkedIn, YouTube)
  - Role set to "Artist"

### Artworks
- **3-6 artworks per artist** (30-60 total artworks)
- **Realistic metadata**:
  - Descriptive names and descriptions
  - Random high-quality images (picsum.photos)
  - Authentic art categories, forms, and origins
  - Materials, dimensions, creation year
  - Pricing information
  - Tags and classification

### Social Interactions
- **Likes**: Random likes from other artists (0-8 per artwork)
- **Follows**: Each artist follows 2-5 other artists
- **Bookmarks**: Each artist bookmarks 1-4 artworks from others
- **No self-interactions**: Artists don't like their own work

## Artist Profiles Created

1. **Priya Sharma** (email) - Madhubani artist from Bihar
2. **Rajesh Kumar** (phone) - Warli artist from Maharashtra  
3. **Ananya Patel** (email) - Pattachitra artist from Odisha
4. **Mohammed Hassan** (phone) - Kalamkari artist from Andhra Pradesh
5. **Lakshmi Devi** (email) - Tanjore painting artist from Tamil Nadu
6. **Vikram Singh** (phone) - Miniature painter from Rajasthan
7. **Sneha Banerjee** (email) - Bengal school artist from West Bengal
8. **Arjun Gond** (phone) - Gond tribal artist from Madhya Pradesh
9. **Kavitha Nair** (email) - Kerala mural artist from Kerala
10. **Deepak Gupta** (phone) - Sculptor from Gujarat
11. **Nikita Verma** (email) - Kathak dancer from Uttar Pradesh
12. **Amit Desai** (phone) - Textile artist from Rajasthan
13. **Kamala Natarajan** (email) - Bharatanatyam dancer from Tamil Nadu
14. **Rohan Mehta** (phone) - Fusion musician from Maharashtra
15. **Leela Pandey** (email) - Tapestry artist from Uttar Pradesh
16. **Aravind Joshi** (phone) - Santoor musician from Maharashtra
17. **Meera Shah** (email) - Heritage crafts specialist from Gujarat
18. **Suresh Yadav** (phone) - Potter from Madhya Pradesh
19. **Aanya Chaudhary** (email) - Gond painter from Madhya Pradesh
20. **Ravi Krishnan** (phone) - Woodcarver from Kerala
21. **Pooja Agarwal** (email) - Phad painter from Rajasthan
22. **Kiran Das** (phone) - Metal sculptor from Odisha
23. **Rashmi Kulkarni** (email) - Handloom weaver from Maharashtra
24. **Sudhir Rao** (phone) - Kathputli puppeteer from Rajasthan
25. **Indira Menon** (email) - Kuchipudi dancer from Andhra Pradesh
26. **Harish Bhatt** (phone) - Stone sculptor from Rajasthan

## Usage

### Option 1: Using npm scripts (Recommended)
```bash
# Navigate to server directory
cd /path/to/TRADITIONAL-ARTS/server

# Seed only artists and artworks
npm run seed:artists

# Seed art forms first, then artists
npm run seed:all
```

### Option 2: Direct execution
```bash
# Navigate to server directory
cd /path/to/TRADITIONAL-ARTS/server

# Run the seeding script directly
node seedArtistsRunner.js

# Or run the data script directly
node data/seedArtists.js
```

## Prerequisites

1. **MongoDB connection**: Ensure your `.env` file has a valid `MONGO_URI`
2. **Dependencies installed**: Run `npm install` in the server directory
3. **Database access**: Make sure your MongoDB instance is running

## Database Impact

⚠️ **Warning**: This script will:
- Delete ALL existing users with roles 'Artist' or 'Viewer'
- Delete ALL existing artworks
- Preserve Admin users and other data

## Sample .env Configuration

```env
MONGO_URI=mongodb://localhost:27017/traditional-arts
# or
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/traditional-arts
```

## Output

The script provides detailed console output:
- ✅ Successful operations
- ❌ Failed operations with error details
- 📊 Final statistics (artists created, artworks created, likes distributed)

## Customization

To modify the seeding data:

1. **Edit artist profiles**: Modify the `artistsData` array in `/data/seedArtists.js`
2. **Adjust artwork count**: Change the `getRandomNumber(3, 6)` range
3. **Modify interaction patterns**: Adjust like/follow/bookmark ranges
4. **Add more art forms**: Extend the `artForms`, `origins`, or `materials` arrays

## Troubleshooting

### Common Issues

1. **MongoDB connection error**
   - Verify `MONGO_URI` in `.env`
   - Ensure MongoDB is running
   - Check network connectivity

2. **Duplicate key errors**
   - The script cleans existing data first
   - Ensure no manual artist accounts exist with the same emails/phones

3. **Missing dependencies**
   - Run `npm install` in the server directory

### Getting Help

If you encounter issues:
1. Check the console output for specific error messages
2. Verify your MongoDB connection string
3. Ensure all required environment variables are set

## Integration with Frontend

After seeding, you can:
- Test login with any artist account (password: "password123")
- Browse artworks in the gallery
- Test like/follow/bookmark functionality
- View artist profiles and their works

The seeded data provides a realistic testing environment for all social features of the platform.
