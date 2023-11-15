# Next, Node & Auth System
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Starter Script that includes Next, Node, Express & MongoDB and features a basic authentication system with emails and more.



## Table of Contents
- [Next, Node \& Auth System](#next-node--auth-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Configuration](#configuration)
    - [Backend](#backend)
    - [Next / Frontend](#next--frontend)
  - [Development](#development)
  - [Deployment](#deployment)
    - [Environmental Variables](#environmental-variables)
    - [CI/CD](#cicd)
    - [Nginx Reverse Proxy](#nginx-reverse-proxy)
    - [Docker](#docker)

## Features
- Easy configuration for both Front and Backend
- OAuth Support for Discord, GitHub and Google
- Email/Password Authentication
- Session Management with JWT
- - Optional Guest Account Support
- Email Support via SendGrid
- Built-in configured Nextjs frontend
- Built-in components & contexts for Authentication
- - Including client-side error handling
- Built-in GDPR and Deletion Process
- Built-in SEO Support
- Included Google Analytics tracking
- Included Tailwind v3 with PostCSS
- Included Profile & Settings page
- Netlify deployment configured
- Pre-configured Prettier and ESLint
- Pre-configured CI/CD via PM2 & GitHub Actions
- Pre-configured dev/build scripts for Windows, macOS and Linux
- Pre-configured Nginx Block support
- Pre-configured Docker support

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

## Configuration
### Backend
There are two files that are necessary for configuration. The first one is the general environmental file.
You will want to create a copy of `./server/.env.example` to `./server/.env` and modify however you desire.

One you configure your environmental variables, the next step is the core configuration file that will give you a few options but mainly just configuration for the name and forms of routing.

`./server/src/config.ts`

There is quite a few options, most however should be self-explanatory. If a contributor wants to help expand on this then they can feel free to do so.

### Next / Frontend
You can modify the configuration at `./next/src/Config.ts` - again the options are self explanatory however a contributor may feel free to expand on this if they want to.

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
There is a lot of online guides that can help in this area. However below is some information on what we have pre-configured for you and the next steps. That being said, **if you are not experienced in deployment or CI/CD** then this may not be as easy to understand.

### Environmental Variables
PM2 and GitHub Actions is already pre-configured to work with **GitHub Secrets** so if you so desire you can use that. Otherwise you can create a script that will pre-generate a `./server/.env` file as well.

### CI/CD
This is the only part **we can't** do for you, you will need to create a self-hosted runner and follow the steps provided by GitHub.

PM2 is a process management system that is used for both the front and backend. These aren't configured for use in development and are only configured to be used alongside CI/CD.

### Nginx Reverse Proxy
Inside of `./http/conf` you will find 4 server blocks across 2 configs. To give a brief description of this

1. Backend Server 
2. CDN/Files Server
3. Next/Frontend Server
4. Catch All Block

This is not recommended for people who are not familiar with Nginx. However if you have basic knowledge then this base configuration will help you.

**If you are only using this template for the frontend, then you can easily deploy via Netlify for free without having to go through the Nginx configuration.**

### Docker
There is now a quick 1-command option to build all of your docker images and launch them as located in `docker-compose.yml` 

You can start a production build doing `npm run start:production`