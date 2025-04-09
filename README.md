# MERN Authentication App

A full-stack MERN (MongoDB, Express.js, React, Node.js) application with JWT authentication. This application demonstrates user authentication, protected routes, and a modern React frontend.

## Features

- User registration and login with JWT authentication
- Protected routes for authenticated users
- Modern React frontend with responsive design
- Secure password hashing
- MongoDB database integration
- Express.js backend API

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd MERN-Auth-Challenge
```

2. Install dependencies for both client and server:

```bash
npm run install
```

3. Create a `.env` file in the server directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001
```

## Available Scripts

- `npm run develop` - Starts both client and server in development mode
- `npm run build` - Builds both client and server
- `npm start` - Starts the server in production mode
- `npm run prod` - Builds and starts the application in production mode

## Development

To run the application in development mode:

```bash
npm run develop
```

This will start:

- Client on http://localhost:5173
- Server on http://localhost:3001

## Production

To run the application in production mode:

```bash
npm run prod
```

## Deployment

This application is configured for deployment on Render.

### Render Deployment Settings

1. Build Command:

```bash
npm run render-build
```

2. Start Command:

```bash
npm start
```

3. Environment Variables to set in Render:

- MONGODB_URI
- JWT_SECRET
- PORT (Render will set this automatically)

## Project Structure

```
MERN-Auth-Challenge/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   └── App.jsx       # Main App component
│   └── package.json
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # MongoDB models
│   │   └── server.js     # Server entry point
│   └── package.json
└── package.json          # Root package.json
```

## License

MIT

## Author

Wilson Crase
