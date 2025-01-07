# Uber Clone

This project is an Uber clone built using React and Vite. It features a map-based UI for location and distance tracking, data fetching from a server using Axios, and separate authentication for users and captains. Additionally, it includes a search functionality for selecting pickup and destination locations.

## Features

- **Mapbox API Integration**: Utilized for displaying maps and tracking distances.
- **Axios**: Used for fetching data from the server and interacting with the database.
- **Authentication**: Separate authentication mechanisms for users and captains.
- **Search Functionality**: Allows users to search for and select pickup and destination locations.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Vite**: Build tool for faster and leaner development.
- **Mapbox API**: For maps and location tracking.
- **Axios**: For making HTTP requests to the server.
- **Context API**: For state management across the application.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/uber-clone.git
   cd uber-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3.Create a .env file in the root directory and add your Mapbox API key and server URL:

```
VITE_MAPBOX_API_KEY=your_mapbox_api_key
VITE_BASE_URL=your_server_url
```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

```
User Authentication: Users can sign up and log in to book rides.
Captain Authentication: Captains can sign up and log in to accept rides.
Search Locations: Use the search functionality to select pickup and destination locations.
Live Tracking: Track the ride in real-time on the map.
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
```
