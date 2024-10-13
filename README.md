# News Aggregator API

## Description
This project is a News Aggregator API built as part of the backend engineering launchpad assignment. It allows users to register, login, and fetch news articles using the GNews API.

## Features
- User registration and login
- Fetching top headlines from GNews API
- MongoDB integration for user data storage

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- GNews API
- Axios for HTTP requests
- dotenv for environment variable management

## Setup and Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   GNEWS_API_KEY=your_gnews_api_key
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## API Endpoints
- POST `/api/v1/register`: Register a new user
- POST `/api/v1/login`: Login an existing user

## Project Structure
- `app.js`: Main application file
- `routes/user.js`: User-related routes
- `models/user.js`: User model schema
- `.env`: Environment variables (not included in repository)

## Future Improvements
- Implement JWT for authentication
- Add password hashing for improved security
- Create endpoints for fetching and managing news preferences
- Implement error handling middleware

## Contributing
Contributions are welcome. Please fork the repository and create a pull request with your changes.

## License
ISC
