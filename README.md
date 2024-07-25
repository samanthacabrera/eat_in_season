# eatBySeason

## Overview
EatBySeason is a web application designed to help users make informed choices about seasonal produce. By providing information about which fruits and vegetables are in season based on the user's location, the application promotes healthier eating habits and supports local agriculture.

(link to site)  

## Table of Contents
Features
Tech Stack
Installation
Configuration
Usage
API Endpoints
Development
Contributing
License


## Features

Location-Based Recommendations: Automatically detects your location to provide relevant seasonal produce information.
Filters: Filter produce by type and season for a customized experience.
User-Friendly Interface: Built with React for a dynamic and responsive user experience.

## Tech Stack

Frontend: React, Vite
Backend: Python (Flask)
Database: Supabase (PostgreSQL)
Deployment: Choose your preferred hosting solution (e.g., Vercel, Netlify for frontend; Heroku, AWS for backend)

## Installation

In order to run this application, you will first need: 
- Node.js and npm (or Yarn)
- Python 3.x
- Supabase account

### Frontend Setup

$ git clone https://github.com/samanthacabrera/eatbyseason.git (Clones the repository)
$ cd eatbyseason
$ cd client
$ npm install (Installs frontend dependencies) 
$ npm run dev (Starts the development server)

The frontend will be available at http://localhost:3000.

### Backend Setup
$ cd server 
$ pipenv shell (Creates a virtual environment)
$ pipenv install (Installs backend dependencies)

The backend will be available at http://localhost:5000.

### Configuration
Supabase Setup: 
Create a Supabase account and set up a new project.
Create a .env file in the backend directory with your Supabase project URL and key.

## Usage
Open your browser and navigate to http://localhost:3000 to access the EatBySeason web application.
Allow location access to get personalized seasonal produce recommendations.
Use the filters to explore fruits and vegetables by type and season.

## Contributing

If you would like to contribute to this project, ensure that you follow the guidelines below: 
- Write clear commit messages describing the changes you made.
- Include tests for new features or bug fixes.

