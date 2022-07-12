# Next, Node & Auth System
Starter Script that includes Next, Node, Express & MongoDB and features a basic authentication system with emails and more.

## Features
- Easy configuration for both Front and Backend
- OAuth Support for Discord, GitHub and Google
- Email/Password Authentication
- Session Management with JWT
- Email Support via SendGrid
- Built in configured Nextjs frontend
- Built-in components & contexts for Authentication
- Included Tailwind v3 with PostCSS
- Netlify deployment configured
- Pre-configured Prettier and ESLint
- Pre-configured CI/CD via PM2 & GitHub Actions
- Pre-configured dev/build scripts for Windows, macOS and Linux
- Pre-configured Nginx Block support

## Prerequisites
- Node.js (v16.13 or later)
- NPM (v8.1 or later)
- MongoDB (v4.4 or later)
- Nginx (for deployment)

## Setup
To install the dependencies for everything, you can do
```sh
# Windows
npm run install:windows

# macOS
npm run install:mac

# Linux
npm run install:linux
```

## Development
Once the prerequisites are installed and the base depedencies are installed. You can easily start the server and frontend via:
```sh
# Server & Next/Frontend
npm run dev

# Server Only
npm run dev:server

# Next/Frontend Only
npm run dev:next
```

## Deployment
There is a lot of online guides that can help in this area. However below is some information on what we have pre-configured for you and the next steps. That being said, **if you are not experienced** in deployment or CI/CD then this may not be as easy to understand.

### CI/CD
This is the only part **we can't** do for you, you will need to create a self-hosted runner and follow the steps provided by GitHub.

PM2 is a process management system that is used for both the front and backend. These aren't configured for use in development and are only configured to be used alongside CI/CD.

### Nginx Reverse Proxy
Inside of `nginx.conf` you will find 5 server blocks. To give a brief description of this

1. Backend Server 
2. CDN/Files Server (for personal files)
3. Next/Frontend Server
4. Catch All Block
5. Catch All Block

This is not recommended for people who are not familiar with Nginx. However if you have basic knowledge then this base configuration will help you.

**If you are only using this template for the frontend, then you can easily deploy via Netlify for free without having to go through the Nginx configuration.**

## Roadmap / Todo
- Docker Configuration
