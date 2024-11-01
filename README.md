# Address Management System

A full-stack application for managing addresses with an interactive map interface using React, Node.js, and OpenStreetMap.

## Features

- 📍 Interactive map with draggable markers
- 📝 Add, edit, and delete addresses
- ⭐ Favorite address management
- 🔍 Address search using OpenStreetMap geocoding
- 📱 Responsive design
- 🗺️ Real-time map updates

## Tech Stack

- Frontend:
  - React with TypeScript
  - Redux Toolkit for state management
  - Tailwind CSS for styling
  - Leaflet for maps
  - Vite for development

- Backend:
  - Node.js
  - Express
  - OpenStreetMap Geocoding

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   GEOCODER_PROVIDER=openstreetmap
   ```

4. Start the development servers:
   ```bash
   npm run dev
   ```

This will start both the frontend (http://localhost:5173) and backend (http://localhost:5000) servers concurrently.

## API Endpoints

- `GET /api/addresses` - Get all addresses
- `POST /api/addresses` - Create new address
- `PATCH /api/addresses/:id` - Update address
- `DELETE /api/addresses/:id` - Delete address
- `PATCH /api/addresses/:id/toggle-favorite` - Toggle address favorite status
- `GET /api/addresses/search` - Search addresses using geocoding

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

