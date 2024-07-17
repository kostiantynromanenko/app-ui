## Application - Frontend
This is the frontend part of the system, built using Vite, React, and TypeScript. It provides a user interface to create, store, and manage game metadata, as well as manage docker-compose files for PostgreSQL databases.

## Requirements
- Node.js (v14 or later)
- npm or Yarn

## Dependencies
- MongoDB
- MinIO

# Configuration
The application requires the following environment variables to be set:
- `VITE_API_URL` - the URL of the backend API

## Installation

- Install the dependencies
```bash
npm install
or 
yarn install
```
- Start development server
```bash
npm run dev
or
yarn dev
```

## Usage
Navigate to http://localhost:5173 in your web browser.
Use the interface to create games.
Fill out the forms to generate and manage docker-compose files.