---
# ICI Sanity CMS Setup

## What this folder contains
Schema definitions for five collections: announcements, 
events, insights, testimonials, and faculty.

## How to connect to your Sanity Studio

1. Go to https://sanity.io/manage and create a project 
   (or use your existing project).

2. Copy your Project ID and add it to .env.local:
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-write-token

3. Import the schemas from sanity/schemas/ into your 
   Sanity Studio's schemaTypes array.

4. Deploy your Studio: npx sanity deploy

## Collections
- announcements — controls the announcement bar
- events — controls the /events page
- insights — controls /resources articles
- testimonials — IMPORTANT: featured defaults to false. 
  Only set to true for real verified graduates with consent.
- faculty — controls /faculty profiles
---
