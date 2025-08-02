# Pinterest-Inspired Login Components

This directory contains the modular components for the new Pinterest-inspired login page design.

## Components

### 1. `BackgroundImageGrid.jsx`
- **Purpose**: Creates a responsive masonry-style image grid similar to Pinterest
- **Features**:
  - **Database Integration**: Fetches real traditional arts images from your artforms API
  - Dynamic image loading with loading skeleton animations
  - Responsive design: 4 columns (desktop), 3 columns (tablet), 2 columns (mobile)
  - Hover effects with smooth transitions and tooltips showing art form names
  - Various image heights for authentic masonry layout
  - Fallback to placeholder images if API fails
  - Performance optimized (limits to 20 random images)

### 2. `OverlayText.jsx`
- **Purpose**: Displays attractive overlay text over the background images
- **Features**:
  - "Log in to get your ideas" messaging
  - Responsive typography (text scales with screen size)
  - Backdrop blur effect for better readability
  - Uses your existing `font-lora` family

### 3. `LoginCard.jsx`
- **Purpose**: Modern, clean login form component
- **Features**:
  - Email and password fields with validation
  - Show/hide password toggle
  - "Forgot Password?" link
  - "Continue with Google" button (placeholder for OAuth integration)
  - Link to Sign Up page
  - Uses your existing color scheme (`deep-teal`, `coral-pink`, etc.)
  - Proper error handling and loading states

### 4. `LoginPage.jsx` (Updated)
- **Purpose**: Main layout component that orchestrates all login components
- **Features**:
  - Desktop: Side-by-side layout (image grid left, login card right)
  - Mobile: Full-screen background with centered login card
  - Fully responsive design
  - Integrates with your existing authentication system

## Color Scheme
The components use your existing Tailwind color palette:
- `deep-teal` (#134856) - Primary buttons and accents
- `coral-pink` (#E05264) - Hover states and links
- `blush-peach` (#F8E6DA) - Background tints
- `lotus-green` (#1D7C6F) - Button hover states

## Responsive Breakpoints
- **Mobile**: < 768px (md) - Stacked layout with background overlay
- **Tablet**: 768px - 1024px (md-lg) - 3-column image grid
- **Desktop**: > 1024px (lg+) - Side-by-side layout with 4-column grid

## Integration
The components are designed to work seamlessly with your existing:
- Authentication context (`useAuth`)
- Form validation (`isEmailValid`)
- Toast notifications (`react-toastify`)
- Routing (`react-router-dom`)

## Customization
To customize the images in `BackgroundImageGrid.jsx`, simply replace the Unsplash URLs with your own traditional arts and food images. The component is structured to handle various aspect ratios automatically.

## Google OAuth Integration
The Google login button in `LoginCard.jsx` includes a placeholder function. Replace the `handleGoogleLogin` function with your actual Google OAuth implementation.
