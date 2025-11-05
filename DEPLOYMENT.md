# TDI Vendor Management System - Deployment Guide

## Overview
This document provides instructions for deploying the TDI Vendor Management System to a production environment. The application consists of:
- A React/Vite frontend
- A Node.js/Express backend
- PostgreSQL database

## Prerequisites

### Server Requirements
- Node.js (v18 or higher)
- PostgreSQL database
- Nginx (for serving static files and reverse proxy, recommended)
- PM2 (for process management, optional but recommended)

### Environment Setup
Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=4000
FRONTEND_URL=https://yourdomain.com

# Database Configuration
DB_HOST=your-db-host
DB_PORT=5432
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# CORS Configuration (comma-separated list of allowed origins)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## Deployment Methods

### Method 1: Using the Deployment Script

1. Make sure you have the required dependencies installed:
```bash
npm install
```

2. Run the automated deployment script:
```bash
./deploy.sh
```

3. Start the backend server:
```bash
npm run backend
```

### Method 2: Manual Deployment

1. Install dependencies:
```bash
npm install
```

2. Build the frontend:
```bash
npm run build
```

3. Build the backend:
```bash
npm run backend:build
```

4. Install production-only dependencies:
```bash
npm ci --only=production
```

5. Start the backend server:
```bash
npm run backend
```

## Frontend Hosting

### Using Nginx (Recommended)
Serve the built frontend files from the `dist/` directory using a web server like Nginx:

1. Build the frontend: `npm run build`
2. Configure Nginx to serve files from the `dist/` directory
3. Set up reverse proxy to forward API requests to the backend server

Example Nginx configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Serve static files
    location / {
        root /path/to/your/app/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://localhost:4000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Using a Static Hosting Service
The contents of the `dist/` folder can be deployed to any static hosting service (Vercel, Netlify, AWS S3, etc.) with proper configuration for SPA routing.

## Backend Process Management

### Using PM2 (Recommended)
For production environments, use PM2 to manage the backend process:

1. Install PM2 globally: `npm install -g pm2`
2. Start the backend: `pm2 start server/server.ts --name vms-backend`
3. Generate startup script: `pm2 startup`
4. Save the process list: `pm2 save`

### Using Systemd (Linux)
Create a systemd service file at `/etc/systemd/system/vms-backend.service`:

```ini
[Unit]
Description=TDI Vendor Management System Backend
After=network.target

[Service]
Type=simple
User=your-app-user
WorkingDirectory=/path/to/your/app
ExecStart=/usr/bin/npm run backend
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Then enable and start the service:
```bash
sudo systemctl enable vms-backend
sudo systemctl start vms-backend
```

## Database Setup

1. Create the PostgreSQL database
2. Run any required migrations (if applicable)
3. Verify the database connection using the health check endpoint: `GET /api/db-test`

## Health Checks

The backend provides health check endpoints:
- `GET /api/health` - General health status
- `GET /api/db-test` - Database connection status

## SSL/HTTPS Setup

For production deployments:
1. Obtain an SSL certificate (from Let's Encrypt, etc.)
2. Configure your web server (Nginx/Apache) for HTTPS
3. Update the `FRONTEND_URL` in your environment variables

## Monitoring & Logs

The application logs are output to the console. For production:
- Use a logging service or redirect logs to files
- Monitor the health endpoints for uptime
- Set up alerts for critical errors

## Troubleshooting

### Common Issues
- Ensure the PostgreSQL database is running and accessible
- Check that all environment variables are properly set
- Verify that ports are not blocked by firewall
- Confirm CORS settings match your domain

### Health Check Endpoints
- Backend health: `http://your-server:4000/api/health`
- Database status: `http://your-server:4000/api/db-test`

## Rollback Procedure

To rollback to a previous version:
1. Stop the current application
2. Revert to the previous code version
3. Rebuild the application
4. Restart the services