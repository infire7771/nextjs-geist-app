# System Requirements & Preparation Guide

## Operating System Requirements

The application can run on any of these operating systems:

### Windows
- Windows 10 or later (64-bit)
- Windows Server 2016 or later

### macOS
- macOS 10.15 (Catalina) or later
- Both Intel and Apple Silicon (M1/M2) supported

### Linux
- Ubuntu 20.04 or later
- Debian 10 or later
- CentOS/RHEL 8 or later
- Any modern Linux distribution with systemd

## Required Software

1. **Node.js**
   - Version: 18.x or later (LTS recommended)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Version 8.x or later
   - Verify installation: `npm --version`

3. **Git** (optional, but recommended)
   - Latest version
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

## System Requirements

### Minimum Hardware Requirements
- CPU: 2 cores
- RAM: 2GB
- Storage: 1GB free space

### Recommended Hardware
- CPU: 4 cores
- RAM: 4GB or more
- Storage: 5GB free space

## Pre-Installation Steps

1. **Check Node.js Installation**
   ```bash
   node --version  # Should be 18.x or higher
   npm --version   # Should be 8.x or higher
   ```

2. **System Packages (Linux/macOS)**
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install -y build-essential

   # CentOS/RHEL
   sudo yum groupinstall "Development Tools"
   ```

3. **Create Application Directory**
   ```bash
   mkdir csv-scraper
   cd csv-scraper
   ```

4. **Set Directory Permissions**
   ```bash
   # Linux/macOS
   chmod 755 .
   
   # Windows
   # Ensure you have write permissions to the directory
   ```

## Network Requirements

1. **Ports**
   - Default: 3000 (configurable)
   - Ensure the port is available and accessible

2. **Firewall Settings**
   ```bash
   # Ubuntu/Debian
   sudo ufw allow 3000/tcp

   # CentOS/RHEL
   sudo firewall-cmd --permanent --add-port=3000/tcp
   sudo firewall-cmd --reload
   ```

## Environment Setup

1. **Environment Variables**
   - No special environment variables required by default
   - Can be configured via `.env` file if needed

2. **File System**
   - Ensure write permissions for the `uploads` directory
   - Recommended: Set up regular backups of the `uploads` directory

## Post-Installation Verification

1. **Check Application**
   ```bash
   npm run dev
   ```

2. **Verify Access**
   - Open browser: http://localhost:3000
   - Should see the application homepage

## Troubleshooting Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using port 3000
   sudo lsof -i :3000    # Linux/macOS
   netstat -ano | findstr :3000    # Windows
   ```

2. **Permission Issues**
   ```bash
   # Fix uploads directory permissions
   chmod 755 uploads
   ```

3. **Node.js Version Mismatch**
   ```bash
   # Install nvm (Node Version Manager)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   
   # Install and use correct Node.js version
   nvm install 18
   nvm use 18
   ```

## Production Deployment Considerations

1. **Process Manager**
   - Install PM2: `npm install -g pm2`
   - Start application: `pm2 start npm --name "csv-scraper" -- start`

2. **Reverse Proxy**
   - Nginx or Apache recommended
   - Configure SSL/TLS certificates

3. **Monitoring**
   - Set up application monitoring
   - Configure error logging

## Security Recommendations

1. **File Upload Security**
   - Limited to CSV files
   - Maximum file size limits
   - Virus scanning (optional)

2. **Access Control**
   - Consider adding authentication
   - Implement rate limiting

3. **Regular Updates**
   ```bash
   npm audit
   npm update
   ```

## Backup Recommendations

1. **Regular Backups**
   - Back up the `uploads` directory
   - Back up any configuration files

2. **Automated Backup Script**
   ```bash
   # Example backup script
   tar -czf backup-$(date +%Y%m%d).tar.gz uploads/
   ```

For additional support or questions, refer to the documentation or create an issue in the repository.
