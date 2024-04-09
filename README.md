# Banking Application

Welcome to the Banking Application repository! This project comprises both the frontend and backend components of a modern banking application built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

## Overview

The Banking Application is a comprehensive system that allows users to create accounts, manage their finances, perform transactions, and enjoy secure authentication features. The frontend provides a user-friendly interface, while the backend handles data storage, authentication, and API endpoints.

## Features

### Frontend

- User authentication (sign up, sign in) with JWT token-based authorization.
- Account management: view account balance, recent transactions, perform logout.
- Two-factor authentication (2FA) for enhanced security.
- Mobile-friendly design using Bootstrap and responsive layout.
- State management with Redux Toolkit for efficient data flow.

### Backend

- MongoDB database integration for persistent data storage.
- Express.js server to handle API routes and authentication middleware.
- JSON Web Tokens (JWT) for user authentication and authorization.
- Secure password hashing using bcrypt.
- Custom middleware for error handling and validation.
- Centralized database access through a MongoDB client.

## Technologies Used

### Frontend

- React
- Redux Toolkit
- Axios for API communication
- React Router for navigation
- Bootstrap for styling
- Fontsource Poppins for typography

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- dotenv for environment variables

## Getting Started

To run the Banking Application locally, follow these steps:
1. Clone the repository to your local machine.
2. Install dependencies in Sever directory using npm or yarn: `npm install` or `yarn install`.
3. Install dependencies in Client directory using npm or yarn: `npm install` or `yarn install`.
4. go back to Banking_Application_Home_Task directory.
5. run backend and front end with `npm start`.
6. navigate to the linke provided by server terminal.

## Project Structure

- **Frontend:**
  - `public/`: Static assets and index.html.
  - `src/`: React components, Redux store, routes, styles.
  - `package.json`: Dependencies and scripts for development.

- **Backend:**
  - `dbHandler.mjs`: MongoDB connection and database operations.
  - `auth.mjs`: Authentication middleware and JWT token handling.
  - `.env`: Environment variables (e.g., MongoDB URI, JWT secret).
  - `package.json`: Dependencies and scripts for running the server.

