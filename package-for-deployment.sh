#!/bin/bash

# CSV Upload & Scraper - Deployment Package Script
echo "Creating deployment package for CSV Upload & Scraper..."

# Create deployment directory
mkdir -p csv-upload-scraper-deployment
cd csv-upload-scraper-deployment

# Copy all necessary files and directories
echo "Copying application files..."

# Root configuration files
cp ../package.json .
cp ../package-lock.json .
cp ../next.config.js .
cp ../tsconfig.json .
cp ../tailwind.config.ts .
cp ../postcss.config.mjs .
cp ../components.json .
cp ../eslint.config.mjs .
cp ../.gitignore .
cp ../README.md .
cp ../DEPLOYMENT_GUIDE.md .

# Copy source code
cp -r ../src .

# Copy public assets
cp -r ../public .

# Create uploads directory
mkdir -p uploads

# Copy sample CSV file if it exists
if [ -f ../07-03-2025.csv ]; then
    cp ../07-03-2025.csv uploads/
fi

# Create deployment instructions
cat > DEPLOY_INSTRUCTIONS.txt << 'EOF'
CSV Upload & Scraper - Deployment Instructions
=============================================

1. UPLOAD FILES:
   - Upload all files in this directory to your server
   - Maintain the folder structure

2. INSTALL DEPENDENCIES:
   - Run: npm install

3. BUILD THE APPLICATION:
   - Run: npm run build

4. START THE APPLICATION:
   - For production: npm start
   - For development: npm run dev

5. ENVIRONMENT SETUP:
   - Ensure Node.js 18+ is installed
   - Make sure the 'uploads' directory has write permissions
   - The application will run on port 3000 by default

6. ACCESS THE APPLICATION:
   - Open your browser to: http://your-domain:3000
   - Or configure your web server to proxy to this port

7. FEATURES:
   - Upload CSV files
   - View and manage uploaded files
   - Process CSV data row by row
   - Trigger API functionality

For detailed deployment options, see DEPLOYMENT_GUIDE.md
EOF

echo "Deployment package created successfully!"
echo "Directory: csv-upload-scraper-deployment"
echo "Files included:"
ls -la

cd ..
echo ""
echo "To deploy:"
echo "1. Zip the 'csv-upload-scraper-deployment' directory"
echo "2. Upload to your server"
echo "3. Follow the instructions in DEPLOY_INSTRUCTIONS.txt"
