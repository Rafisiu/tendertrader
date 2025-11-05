#!/bin/bash

# Production startup script for the backend server

echo "🚀 Starting TDI VMS Backend Server..."

# Ensure we're in the correct directory
cd "$(dirname "$0")"

# Start the backend server using tsx
exec npx tsx server/server.ts