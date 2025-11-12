# Render.com Deployment Guide

## Problem: "Not Found" on Page Refresh

When you refresh a page (F5) on routes like `/auth/login`, Render.com tries to find that file on the server, but it doesn't exist because Vue Router handles routing client-side.

## Solution Options

### Option 1: Web Service (Recommended - Works with Express Server)

1. Go to your Render.com dashboard
2. Click "New +" → "Web Service" (NOT Static Site)
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: betadmin
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: (leave empty)

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = (Render sets this automatically)

The Express server (`server.js`) will handle all routes and serve `index.html` for SPA routing.

### Option 2: Static Site (Alternative - Requires Dashboard Configuration)

If you prefer to use Static Site hosting:

1. Go to your Render.com dashboard
2. Click "New +" → "Static Site"
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **IMPORTANT**: In your Static Site settings, go to "Redirects/Rewrites" and add:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`

This tells Render to serve `index.html` for all routes.

## Troubleshooting

If you still see "Not Found":

1. **For Web Service:**
   - Check Render.com logs to verify the server started
   - Verify `express` is in dependencies (it is)
   - Make sure build completed successfully
   - Check that `dist` folder exists after build

2. **For Static Site:**
   - Verify redirect rule is configured in dashboard
   - Check that `dist/index.html` exists after build
   - Make sure publish directory is set to `dist`

3. **General:**
   - Clear browser cache
   - Check browser console for errors
   - Verify the URL is correct (no typos)

