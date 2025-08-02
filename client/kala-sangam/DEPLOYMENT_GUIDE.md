# Deployment Troubleshooting Guide

## 404 Errors on Direct Route Access

The 404 errors you're experiencing are common with Single Page Applications (SPAs) when users directly access routes like `/gallery`, `/artists`, etc., or refresh the page on these routes.

### Solution Files Created:

1. **`vercel.json`** - For Vercel deployment
2. **`netlify.toml`** - For Netlify deployment
3. **`public/.htaccess`** - For Apache servers
4. **`public/_redirects`** - For Netlify (already existed)

### Platform-Specific Instructions:

#### For Vercel:
- The `vercel.json` file will handle all routing automatically
- Deploy using: `vercel --prod`

#### For Netlify:
- The `netlify.toml` and `public/_redirects` files will handle routing
- Deploy by connecting your Git repository or drag-and-drop the `dist` folder

#### For Apache Servers (Shared Hosting):
- The `public/.htaccess` file will handle routing
- Upload the contents of the `dist` folder to your public_html directory
- Ensure the `.htaccess` file is in the root directory

#### For Nginx:
Add this to your nginx configuration:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### For Firebase Hosting:
Add this to your `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Build Process:
1. Run `npm run build`
2. Upload the `dist` folder contents to your hosting provider
3. Ensure the appropriate configuration file is in place

### Header Position:
The header has been adjusted to be positioned slightly lower:
- Scrolled state: `top-2` (8px from top)
- Non-scrolled state: `top-0` (at the top)

### Testing Locally:
To test the routing locally with the built files:
```bash
npm run build
npx serve dist
```

This will serve the built files and simulate the production environment.
