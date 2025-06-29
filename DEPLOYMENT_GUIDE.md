# CSV Upload & Scraper - Deployment Guide

## Project Structure
This is a Next.js 15 application with the following key files:

### Core Application Files
- `src/app/page.tsx` - Home page
- `src/app/layout.tsx` - Root layout
- `src/app/upload/page.tsx` - File upload page
- `src/app/files/page.tsx` - Files listing page
- `src/app/files/[filename]/page.tsx` - CSV data viewer and scraper

### API Routes
- `src/app/api/upload/route.ts` - File upload handler
- `src/app/api/files/route.ts` - List uploaded files
- `src/app/api/csv/[filename]/route.ts` - CSV data parser
- `src/app/api/trigger/route.ts` - Trigger processing

### Configuration Files
- `package.json` - Dependencies and scripts
- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `components.json` - shadcn/ui configuration

### UI Components
- `src/components/ui/` - shadcn/ui components (button, card, table, etc.)
- `src/lib/utils.ts` - Utility functions

## Deployment Options

### 1. Vercel (Recommended for Next.js)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy automatically

### 2. Netlify
1. Build the project: `npm run build`
2. Upload the `.next` folder and other files
3. Configure build settings

### 3. Traditional Hosting
1. Build the project: `npm run build`
2. Upload all files to your server
3. Run: `npm start`

## Environment Setup
1. Node.js 18+ required
2. Install dependencies: `npm install`
3. Create `uploads/` directory for file storage
4. Run development: `npm run dev`
5. Build for production: `npm run build`

## Key Features
- CSV file upload and validation
- File listing and management
- Row-by-row data viewing
- Scraping functionality with progress tracking
- API endpoints for file processing
- Modern UI with Tailwind CSS and shadcn/ui

## File Storage
- Uploaded files are stored in the `uploads/` directory
- Make sure this directory has write permissions
- For production, consider using cloud storage (AWS S3, etc.)

## Security Considerations
- File type validation (CSV only)
- File size limits can be configured
- Consider adding authentication for production use
