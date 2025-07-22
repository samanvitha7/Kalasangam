const mongoose = require("mongoose");
const User = require("../models/User");
const Art = require("../models/Art");
const Event = require("../models/Event");
require("dotenv").config();

// Utility functions
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Sample data arrays
const artCategories = ['painting', 'sculpture', 'textile', 'pottery', 'jewelry', 'woodwork', 'metalwork', 'dance', 'music', 'other'];
const artForms = ['Madhubani', 'Warli', 'Pattachitra', 'Kalamkari', 'Tanjore', 'Mysore', 'Rajasthani', 'Bengali', 'Gond', 'Miniature'];
const origins = ['Bihar', 'Maharashtra', 'Odisha', 'Andhra Pradesh', 'Tamil Nadu', 'Karnataka', 'Rajasthan', 'West Bengal', 'Madhya Pradesh', 'Gujarat'];
const materials = ['Canvas', 'Paper', 'Silk', 'Cotton', 'Wood', 'Clay', 'Metal', 'Stone', 'Glass', 'Fabric'];
const coverImages = [
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=400&fit=crop'
];

const createFakeArtists = async () => {
    console.log('🧹 Cleaning existing data...');
    await User.deleteMany({ role: { $in: ['Artist', 'Viewer'] } });
    await Art.deleteMany({});
    await Event.deleteMany({});

    const artistsData = [
        {
            name: "Priya Sharma",
            email: "priya.sharma@artistmail.com",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
            bio: "Traditional Madhubani artist from Bihar with 15 years of experience. I specialize in depicting mythological stories through vibrant natural colors and intricate patterns. My work has been exhibited in galleries across India and internationally.",
            location: "Darbhanga, Bihar",
            specialization: "Madhubani Painting",
            socialLinks: {
                instagram: "@priya.madhubani",
                website: "https://priyamadhubani.com"
            }
        },
        {
            name: "Rajesh Kumar",
            phoneNumber: "+91-9876543210",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            bio: "Master craftsman specializing in Warli art from Maharashtra. I learned this ancient tribal art form from my grandfather and have been practicing for over 20 years. My paintings tell stories of rural life, nature, and traditional festivals.",
            location: "Thane, Maharashtra",
            specialization: "Warli Art"
        },
        {
            name: "Ananya Patel",
            email: "ananya.patel@gmail.com",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
            bio: "Contemporary artist blending traditional Pattachitra techniques with modern themes. Based in Bhubaneswar, I create artwork that bridges the gap between ancient Odishan art and contemporary expression. Winner of State Art Award 2022.",
            location: "Bhubaneswar, Odisha",
            specialization: "Pattachitra"
        },
        {
            name: "Mohammed Hassan",
            phoneNumber: "+91-8765432109",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/4.jpg",
            bio: "Third-generation Kalamkari artist from Andhra Pradesh. I practice both Srikalahasti and Machilipatnam styles of Kalamkari. My work focuses on mythological narratives and natural motifs using traditional hand-painting and block-printing techniques.",
            location: "Srikalahasti, Andhra Pradesh",
            specialization: "Kalamkari"
        },
        {
            name: "Lakshmi Devi",
            email: "lakshmi.traditional@yahoo.com",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/5.jpg",
            bio: "Renowned Tanjore painting artist with expertise in gold leaf work and gem stone inlay. I have been creating devotional art for over 25 years, specializing in portraits of deities and traditional themes. My studio offers workshops for aspiring artists.",
            location: "Thanjavur, Tamil Nadu",
            specialization: "Tanjore Painting"
        },
        {
            name: "Vikram Singh",
            phoneNumber: "+91-7654321098",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/6.jpg",
            bio: "Rajasthani miniature painter trained in the Mewar school of painting. I create intricate miniatures depicting royal court scenes, folk tales, and nature. My work is inspired by the rich cultural heritage of Rajasthan and uses traditional pigments and techniques.",
            location: "Udaipur, Rajasthan",
            specialization: "Miniature Painting"
        },
        {
            name: "Sneha Banerjee",
            email: "sneha.banerjee@artlover.in",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/7.jpg",
            bio: "Bengal school artist focusing on wash paintings and tempera techniques. I draw inspiration from Rabindranath Tagore's artistic vision and create works that reflect Bengali culture, literature, and philosophy. Currently pursuing a PhD in Fine Arts.",
            location: "Kolkata, West Bengal",
            specialization: "Bengal School"
        },
        {
            name: "Arjun Gond",
            phoneNumber: "+91-6543210987",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/8.jpg",
            bio: "Gond tribal artist from Madhya Pradesh creating contemporary interpretations of traditional Gond art. My paintings feature bold lines, vibrant colors, and intricate patterns that tell stories of nature, animals, and tribal folklore passed down through generations.",
            location: "Bhopal, Madhya Pradesh",
            specialization: "Gond Art"
        },
        {
            name: "Kavitha Nair",
            email: "kavitha.nair@keralart.com",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/9.jpg",
            bio: "Kerala mural artist specializing in traditional temple art and modern adaptations. Trained in classical techniques, I create large-scale murals for temples, hotels, and private collections. My work preserves ancient artistic traditions while making them accessible to modern audiences.",
            location: "Kochi, Kerala",
            specialization: "Kerala Murals"
        },
        {
            name: "Deepak Gupta",
            phoneNumber: "+91-5432109876",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/10.jpg",
            bio: "Multi-disciplinary artist working with traditional wood carving, metal work, and contemporary sculpture. Based in Gujarat, I create pieces that blend traditional craftsmanship with modern artistic expression. My works are displayed in museums and private collections worldwide.",
            location: "Ahmedabad, Gujarat",
            specialization: "Sculpture  Crafts"
        },
        {
            name: "Nikita Verma",
            email: "nikita.verma@artworld.com",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/11.jpg",
            bio: "Trained Kathak dancer who incorporates traditional movements into modern dance performances. I strive to bridge the ancient and contemporary through rhythm and emotion.",
            location: "Lucknow, Uttar Pradesh",
            specialization: "Kathak Dance"
        },
        {
            name: "Amit Desai",
            phoneNumber: "+91-1234567891",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/12.jpg",
            bio: "Textile expert focusing on sustainable practices and designs inspired by Indian traditions. Based in Jaipur, I create eco-friendly and culturally steeped fabric art.",
            location: "Jaipur, Rajasthan",
            specialization: "Textile Art"
        },
        {
            name: "Kamala Natarajan",
            email: "kamala.nat@traditionmail.com",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/13.jpg",
            bio: "Pioneer in using digital mediums to reinterpret traditional Bharatanatyam compositions. My work is a visual exploration of dance history and modern technology.",
            location: "Chennai, Tamil Nadu",
            specialization: "Bharatanatyam"
        },
        {
            name: "Rohan Mehta",
            phoneNumber: "+91-9988776655",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/14.jpg",
            bio: "Versatile musician known for merging Indian classical sounds with Western instruments. My compositions tell stories of harmony between different worlds.",
            location: "Mumbai, Maharashtra",
            specialization: "Fusion Music"
        },
        {
            name: "Leela Pandey",
            email: "leela.p@tapestry.co",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/15.jpg",
            bio: "Acclaimed creator of modern tapestry artwork rooted in the rich weaving traditions of India. Each piece is a blend of history, tradition, and personal narrative.",
            location: "Varanasi, Uttar Pradesh",
            specialization: "Tapestry"
        },
        {
            name: "Aravind Joshi",
            phoneNumber: "+91-8877665544",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/16.jpg",
            bio: "Santoor virtuoso with an ear for collaborative arts and contemporary fusion. My music brings traditional santoor sounds to a new generation of enthusiasts.",
            location: "Pune, Maharashtra",
            specialization: "Santoor Music"
        },
        {
            name: "Meera Shah",
            email: "meera.shah@heritageart.in",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/17.jpg",
            bio: "Custodian of heritage art through preservation and education. My mission is to keep traditional Indian crafts alive through workshops and community events.",
            location: "Surat, Gujarat",
            specialization: "Heritage Crafts"
        },
        {
            name: "Suresh Yadav",
            phoneNumber: "+91-7766554433",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/17.jpg",
            bio: "Potter creating innovative designs using Rahatgarh’s clay, inspired by traditional pottery but adapted to modern tastes and functionality.",
            location: "Rahatgarh, Madhya Pradesh",
            specialization: "Pottery"
        },
        {
            name: "Aanya Chaudhary",
            email: "aanya.chaudhary@nativearts.com",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/18.jpg",
            bio: "Rising artist in the field of Gond painting, using vibrant storytelling to depict folklore and natural surroundings.",
            location: "Hoshangabad, Madhya Pradesh",
            specialization: "Gond Art"
        },
        {
            name: "Ravi Krishnan",
            phoneNumber: "+91-6655443322",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/19.jpg",
            bio: "Master woodcarver from Kerala specializing in traditional temple architecture and decorative panels. My intricate carvings preserve centuries-old techniques passed down through generations of craftsmen.",
            location: "Kozhikode, Kerala",
            specialization: "Wood Carving"
        },
        {
            name: "Pooja Agarwal",
            email: "pooja.agarwal@folkart.in",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/19.jpg",
            bio: "Folk artist reviving the ancient Phad painting tradition of Rajasthan. I create large narrative scrolls that tell epic stories of local heroes and deities, keeping oral traditions alive through visual art.",
            location: "Bhilwara, Rajasthan",
            specialization: "Phad Painting"
        },
        {
            name: "Kiran Das",
            phoneNumber: "+91-5544332211",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/20.jpg",
            bio: "Contemporary metal sculptor combining traditional lost-wax casting techniques with modern design aesthetics. My sculptures explore the relationship between ancient craft methods and contemporary artistic expression.",
            location: "Bhubaneswar, Odisha",
            specialization: "Metal Sculpture"
        },
        {
            name: "Rashmi Kulkarni",
            email: "rashmi.kulkarni@handloom.co",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/20.jpg",
            bio: "Handloom weaver creating contemporary interpretations of traditional Paithani sarees. My work bridges heritage textile techniques with modern color palettes and design sensibilities for today's fashion conscious buyers.",
            location: "Aurangabad, Maharashtra",
            specialization: "Handloom Weaving"
        },
        {
            name: "Sudhir Rao",
            phoneNumber: "+91-4433221100",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/21.jpg",
            bio: "Puppeteer and puppet maker specializing in Kathputli - the traditional string puppet art of Rajasthan. I create handcrafted puppets and perform folk tales that have entertained audiences for centuries.",
            location: "Jodhpur, Rajasthan",
            specialization: "Kathputli Puppetry"
        },
        {
            name: "Indira Menon",
            email: "indira.menon@classicaldance.org",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/women/21.jpg",
            bio: "Acclaimed Kuchipudi dancer and choreographer bringing classical Indian dance to global stages. My performances blend traditional storytelling with contemporary themes, making ancient art forms relevant to modern audiences.",
            location: "Vijayawada, Andhra Pradesh",
            specialization: "Kuchipudi Dance"
        },
        {
            name: "Harish Bhatt",
            phoneNumber: "+91-3322110099",
            password: "password123",
            role: "Artist",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
            bio: "Stone sculptor working with traditional Rajasthani sandstone to create architectural elements and decorative pieces. My work can be found in heritage hotels, temples, and private residences across India.",
            location: "Makrana, Rajasthan",
            specialization: "Stone Sculpture"
        }
    ];

    console.log('👥 Creating artist accounts...');
    const createdArtists = [];
    
    for (let i = 0; i < artistsData.length; i++) {
        const artistData = artistsData[i];
        try {
            // Add random cover image if not already set
            if (!artistData.coverImage) {
                artistData.coverImage = getRandomItem(coverImages);
            }
            
            // Add random social links if not already set
            if (!artistData.socialLinks) {
                const socialPlatforms = ['instagram', 'website', 'behance', 'linkedin', 'youtube'];
                const selectedPlatforms = getRandomItems(socialPlatforms, getRandomNumber(1, 3));
                artistData.socialLinks = {};
                
                selectedPlatforms.forEach(platform => {
                    switch(platform) {
                        case 'instagram':
                            artistData.socialLinks.instagram = `@${artistData.name.toLowerCase().replace(' ', '.')}`;
                            break;
                        case 'website':
                            artistData.socialLinks.website = `https://${artistData.name.toLowerCase().replace(' ', '')}.com`;
                            break;
                        case 'behance':
                            artistData.socialLinks.behance = `${artistData.name.toLowerCase().replace(' ', '_')}`;
                            break;
                        case 'linkedin':
                            artistData.socialLinks.linkedin = `https://linkedin.com/in/${artistData.name.toLowerCase().replace(' ', '-')}`;
                            break;
                        case 'youtube':
                            artistData.socialLinks.youtube = `@${artistData.name.toLowerCase().replace(' ', '')}`;
                            break;
                    }
                });
            }
            
            const artist = new User(artistData);
            await artist.save();
            createdArtists.push(artist);
            console.log(`✅ Created artist: ${artist.name}`);
        } catch (error) {
            console.error(`❌ Failed to create artist ${artistData.name}:`, error.message);
        }
    }

    console.log('🎨 Creating artworks for each artist...');
    const allArtworks = [];
    
    for (let i = 0; i < createdArtists.length; i++) {
        const artist = createdArtists[i];
        const artworkCount = getRandomNumber(3, 6); // Each artist gets 3-6 artworks
        
        for (let j = 0; j < artworkCount; j++) {
            const artworkData = {
                name: `${artist.specialization || 'Traditional Art'} Creation ${j + 1}`,
                description: `A beautiful piece showcasing ${artist.specialization || 'traditional Indian art'} techniques. This artwork represents the rich cultural heritage and artistic traditions passed down through generations. Created with meticulous attention to detail and authentic materials.`,
                photoUrl: [`https://picsum.photos/800/600?random=${i}${j}`],
                origin: getRandomItem(origins),
                category: getRandomItem(artCategories),
                artForm: getRandomItem(artForms),
                artist: artist._id,
                likes: [],
                tags: [`${artist.specialization}`, 'traditional', 'handmade', 'authentic', 'cultural'],
                materials: getRandomItems(materials, getRandomNumber(2, 4)),
                dimensions: {
                    height: getRandomNumber(20, 100),
                    width: getRandomNumber(20, 100),
                    unit: 'cm'
                },
                yearCreated: getRandomNumber(2020, 2024),
                isForSale: Math.random() > 0.5,
                price: getRandomNumber(5000, 50000),
                currency: 'INR'
            };
            
            try {
                const artwork = new Art(artworkData);
                await artwork.save();
                allArtworks.push(artwork);
                console.log(`🎨 Created artwork: ${artwork.name} by ${artist.name}`);
            } catch (error) {
                console.error(`❌ Failed to create artwork for ${artist.name}:`, error.message);
            }
        }
    }

    console.log('📅 Creating events for each artist...');
    const eventTypes = ['Workshop', 'Exhibition', 'Gallery Opening', 'Art Fair', 'Cultural Festival', 'Live Demonstration', 'Art Class', 'Artist Talk'];
    const venues = ['Cultural Center', 'Art Gallery', 'Community Hall', 'Museum', 'Artist Studio', 'Heritage Center', 'Public Park', 'University Campus'];
    const allEvents = [];
    
    for (let i = 0; i < createdArtists.length; i++) {
        const artist = createdArtists[i];
        const eventCount = getRandomNumber(2, 5); // Each artist gets 2-5 events
        
        for (let j = 0; j < eventCount; j++) {
            // Generate random future dates (next 6 months)
            const startDate = new Date();
            startDate.setDate(startDate.getDate() + getRandomNumber(7, 180));
            
            const eventType = getRandomItem(eventTypes);
            const venue = getRandomItem(venues);
            
            const eventData = {
                name: `${eventType}: ${artist.specialization || 'Traditional Art'} by ${artist.name.split(' ')[0]}`,
                description: `Join us for an inspiring ${eventType.toLowerCase()} featuring the incredible work of ${artist.name}. Experience the beauty and tradition of ${artist.specialization || 'Indian traditional art'} through live demonstrations, interactive sessions, and exclusive artwork displays. This event celebrates our rich cultural heritage and provides an opportunity to meet the artist personally.`,
                date: startDate,
                time: `${getRandomNumber(10, 18)}:${['00', '30'][getRandomNumber(0, 1)]}`,
                location: `${venue}, ${artist.location}`,
                type: eventType,
                image: `https://picsum.photos/600/400?random=event${i}${j}`,
                artist: artist._id,
                attendees: [],
                maxAttendees: getRandomNumber(20, 100),
                ticketPrice: eventType === 'Workshop' || eventType === 'Art Class' ? getRandomNumber(500, 2000) : 0,
                isPublic: true,
                tags: [eventType.toLowerCase(), artist.specialization?.toLowerCase(), 'traditional-art', 'cultural', 'live']
            };
            
            try {
                const event = new Event(eventData);
                await event.save();
                allEvents.push(event);
                console.log(`📅 Created event: ${event.name}`);
            } catch (error) {
                console.error(`❌ Failed to create event for ${artist.name}:`, error.message);
            }
        }
    }

    console.log('❤️ Adding likes, follows, and bookmarks...');
    
    // Add random likes to artworks
    for (let artwork of allArtworks) {
        const likersCount = getRandomNumber(0, 8);
        const likers = getRandomItems(createdArtists, likersCount);
        
        for (let liker of likers) {
            if (!artwork.likes.includes(liker._id) && !artwork.artist.equals(liker._id)) {
                artwork.likes.push(liker._id);
            }
        }
        
        artwork.likesCount = artwork.likes.length;
        await artwork.save();
    }
    
    // Add follows and bookmarks
    for (let user of createdArtists) {
        // Random follows (2-5 other artists)
        const followCount = getRandomNumber(2, 5);
        const toFollow = getRandomItems(createdArtists.filter(a => !a._id.equals(user._id)), followCount);
        user.follows = toFollow.map(a => a._id);
        
        // Random bookmarks (1-4 artworks from other artists)
        const bookmarkCount = getRandomNumber(1, 4);
        const otherArtworks = allArtworks.filter(art => !art.artist.equals(user._id));
        const toBookmark = getRandomItems(otherArtworks, Math.min(bookmarkCount, otherArtworks.length));
        user.bookmarks = toBookmark.map(art => art._id);
        
        await user.save();
    }

    console.log('📊 Final Statistics:');
    console.log(`👥 Created ${createdArtists.length} artists`);
    console.log(`🎨 Created ${allArtworks.length} artworks`);
    console.log(`📅 Created ${allEvents.length} events`);
    console.log(`❤️ Total likes distributed: ${allArtworks.reduce((sum, art) => sum + art.likesCount, 0)}`);
    console.log('🌟 Successfully seeded database with realistic artist data!');
};

mongoose.connect(process.env.MONGO_URI).then(async () => {
    await createFakeArtists();
    process.exit();
}).catch(error => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});

