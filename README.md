# UBER-Clone

A full-stack ride-sharing application built with React, Node.js, Express, MongoDB, and Socket.IO. This project implements real-time ride matching, live location tracking, captain and user authentication, and fare estimation.

## Features

### User Features
- **Registration & Authentication**: Secure user registration with JWT-based auth and password hashing (bcrypt)
- **Ride Booking**: Search for rides, view fare estimates by vehicle type, and confirm rides
- **Real-time Updates**: Socket.IO integration for live ride status (matched, started, completed)
- **Live Tracking**: View captain location on Google Maps in real-time during active rides
- **Ride History**: Track all past rides with details

### Captain (Driver) Features
- **Registration & Authentication**: Captain signup with vehicle details
- **Ride Acceptance**: Accept incoming ride requests from users
- **OTP Verification**: Verify rides using one-time password (OTP)
- **Live Tracking**: Share real-time location with users
- **Navigation**: View pickup and destination addresses during rides

### Backend Features
- **Fare Estimation**: Google Distance Matrix integration to calculate distances and fares
- **Geolocation**: Google Maps Geocoding API for address resolution
- **Token Blacklisting**: 24-hour TTL on logged-out JWTs to prevent reuse
- **RESTful APIs**: Well-documented endpoints for all user/captain operations
- **Real-time Communication**: Socket.IO server for live events and messaging

## Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **GSAP** for animations
- **Socket.IO Client** for real-time communication
- **Axios** for HTTP requests
- **Google Maps API** (@react-google-maps/api) for maps and geolocation
- **Remixicon** for icons

### Backend
- **Node.js & Express.js** for API server
- **MongoDB & Mongoose** for database
- **Socket.IO** for real-time events
- **JWT** for authentication
- **bcrypt** for password hashing
- **express-validator** for input validation
- **Axios** for external API calls (Google Maps)
- **cookie-parser** for cookie handling

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB running locally or Atlas connection string
- Google Maps API key (with Geocoding and Distance Matrix enabled)
- Google API key for frontend maps

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/uber-clone
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Start the server:

```bash
npm start
# or
node server.js
```

The backend runs on `http://localhost:3000`.

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
VITE_BASE_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Start the development server:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

## API Documentation

### User Routes (`/users`)

#### Register User
- **POST** `/users/register`
- **Body**: `{ fullname: { firstname, lastname }, email, password }`
- **Response**: `{ token, user }`
- **Status**: 201 Created

#### Login User
- **POST** `/users/login`
- **Body**: `{ email, password }`
- **Response**: `{ token, user }`
- **Status**: 200 OK

#### Get Profile
- **GET** `/users/profile`
- **Auth**: Required (Bearer token)
- **Response**: User object
- **Status**: 200 OK

#### Logout User
- **GET** `/users/logout`
- **Auth**: Required
- **Response**: `{ message: "User logged out successfully" }`
- **Status**: 200 OK
- **Side Effect**: Token is blacklisted (24-hour TTL)

### Captain Routes (`/captains`)

#### Register Captain
- **POST** `/captains/register`
- **Body**: `{ fullname: { firstname, lastname }, email, password, vehicle: { color, plate, capacity, vehicleType } }`
- **Response**: `{ token, captain }`
- **Status**: 201 Created

#### Login Captain
- **POST** `/captains/login`
- **Body**: `{ email, password }`
- **Response**: `{ token, captain }`
- **Status**: 200 OK

#### Get Profile
- **GET** `/captains/profile`
- **Auth**: Required
- **Response**: Captain object
- **Status**: 200 OK

#### Logout Captain
- **GET** `/captains/logout`
- **Auth**: Required
- **Response**: `{ message: "Logged out successfully" }`
- **Status**: 200 OK

### Maps Routes (`/maps`)

#### Get Address Suggestions
- **GET** `/maps/get-suggestions`
- **Query**: `input` (address string)
- **Auth**: Required
- **Response**: Array of autocomplete suggestions
- **Status**: 200 OK

#### Get Coordinates
- **GET** `/maps/get-coordinates`
- **Query**: `address` (address string)
- **Auth**: Required
- **Response**: `{ latitude, longitude }`
- **Status**: 200 OK

### Rides Routes (`/rides`)

#### Get Fare Estimate
- **GET** `/rides/get-fare`
- **Query**: `pickup` (string), `destination` (string)
- **Auth**: Required
- **Response**: `{ ubergo, uberxl, comfort }` (fares by vehicle type)
- **Status**: 200 OK

#### Create Ride
- **POST** `/rides/create`
- **Body**: `{ pickup, destination, vehicleType }`
- **Auth**: Required
- **Response**: Ride object
- **Status**: 201 Created
- **Event**: Emits `ride-created` via Socket.IO

#### Start Ride
- **GET** `/rides/start-ride`
- **Query**: `rideId`, `otp`
- **Auth**: Required
- **Response**: Ride object
- **Status**: 200 OK
- **Event**: Emits `ride-started` via Socket.IO

## Socket.IO Events

### User Events
- **`join`**: Register user/captain on connect with userType and userId
- **`ride-confirmed`**: Ride has been accepted by a captain
- **`ride-started`**: Ride has started
- **`captain-location`** / **`driver-location`**: Receive captain's real-time location
- **`ride-completed`**: Ride has been completed

### Captain Events
- **`join`**: Register captain on connect
- **`new-ride`**: New ride request available
- **`ride-started`**: Ride has started (shared with user)

## Database Models

### User
```javascript
{
  fullname: { firstname, lastname },
  email: String (unique),
  password: String (hashed, not selected by default),
  socketId: String
}
```

### Captain
```javascript
{
  fullname: { firstname, lastname },
  email: String (unique),
  password: String (hashed, not selected by default),
  vehicle: {
    color: String,
    plate: String,
    capacity: Number,
    vehicleType: String
  },
  socketId: String
}
```

### Ride
```javascript
{
  user: ObjectId (ref: User),
  captain: ObjectId (ref: Captain),
  pickup: String,
  destination: String,
  fare: Number,
  distance: Number,
  duration: Number,
  otp: String,
  status: String (pending | accepted | started | completed),
  paymentMethod: String (cash | card)
}
```

### BlacklistToken
```javascript
{
  token: String (unique),
  createdAt: Date (TTL: 24 hours)
}
```

## Project Structure

```
UBER-Clone/
├── Backend/
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express routes
│   ├── controllers/         # Route handlers
│   ├── services/            # Business logic
│   ├── middlewares/         # Auth & validation
│   ├── db/                  # Database connection
│   ├── socket.js            # Socket.IO setup
│   ├── app.js               # Express app
│   ├── server.js            # HTTP server & startup
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/           # React pages (Home, Riding, etc.)
    │   ├── components/      # Reusable components
    │   ├── context/         # React contexts (User, Captain, Socket)
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.local           # Environment variables
    └── package.json
```

## Authentication

- **JWT (JSON Web Token)**: Used for stateless authentication
- **Password Hashing**: bcrypt with salt rounds = 10
- **Token Storage**: localStorage on client, cookies optional
- **Token Blacklist**: Logout stores token with 24-hour TTL to prevent reuse

## Real-time Communication

- **Socket.IO Server**: Runs alongside the HTTP server
- **CORS**: Configured to allow `http://localhost:5173`
- **Events**: Namespaced by user type (user vs captain)
- **Location Sharing**: Captain location streamed in real-time to user

## Geolocation & Maps

- **Google Geocoding API**: Convert addresses to coordinates
- **Google Distance Matrix API**: Calculate distance/time between locations
- **Browser Geolocation**: User device shares real-time position
- **Fare Calculation**: Based on distance and time, with per-mile/per-minute rates

## Environment Variables

### Backend (.env)
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/uber-clone
JWT_SECRET=your_secret_key_here
GOOGLE_MAPS_API_KEY=your_google_api_key
```

### Frontend (.env.local)
```
VITE_BASE_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=your_google_api_key
```

## Running the Application

### Terminal 1: Backend
```bash
cd Backend
npm install
npm start
```

### Terminal 2: Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Testing the Flow

1. **Register as User**: Go to signup, create a user account
2. **Register as Captain**: In another browser/incognito, create a captain account
3. **User Books Ride**: User enters pickup/destination, views fares, confirms ride
4. **Captain Accepts**: Captain sees ride request, enters OTP, starts ride
5. **Live Tracking**: Both see real-time location updates on Google Map
6. **Complete Ride**: Captain completes ride, payment is confirmed

## Known Limitations & Future Improvements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Rating & review system
- [ ] Rider history with detailed receipts
- [ ] Dynamic fare surge pricing
- [ ] Multiple ride preferences (shared rides, etc.)
- [ ] In-app messaging between user and captain
- [ ] Admin dashboard for monitoring
- [ ] SMS/Email notifications
- [ ] Deployment to cloud (AWS, Heroku, Vercel)

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is open-source and available under the MIT License.

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

## Author

**Chamanjeet Singh**  
GitHub: [@Chamanjeet-Singh](https://github.com/Chamanjeet-Singh)

---

**Happy Coding! 🚗💨**
