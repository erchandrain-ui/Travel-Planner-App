# ✈️ Wanderly — Travel Planner App

Wanderly is a full-stack travel planning application designed to help users create and visualize road-trip itineraries on an interactive map.

The current demo includes a complete route from:

**Ropar → Chandigarh → Ambala → Karnal → Panipat → New Delhi**

The application uses React + Vite on the frontend, Node.js/Express on the backend, Socket.IO for real-time updates, and Leaflet/OpenStreetMap for interactive maps and routing visualization.

---

## ✨ Features

- 🗺️ Interactive map using Leaflet
- 📍 Multiple destination markers
- 🛣️ Real road routing
- 📏 Automatic route distance calculation
- ⏱️ Estimated driving time
- 🧭 Automatic map fitting
- 🚗 Multi-stop road-trip itinerary
- 🔄 Real-time itinerary updates using Socket.IO
- 📌 Destination popups
- 🎨 Modern responsive travel dashboard
- ⚡ React + Vite frontend
- 🖥️ Node.js/Express backend
- 🔌 REST API ready architecture

---

## 🗺️ Current Demo Route

```text
Ropar
  ↓
Chandigarh
  ↓
Ambala
  ↓
Karnal
  ↓
Panipat
  ↓
New Delhi
🏗️ Project Structure
travel-planner-app/
│
├── client/                           # React Frontend (Vite)
│   ├── public/                       # Static assets (favicons, manifest for PWA)
│   │   └── manifest.json             # Offline PWA manifest
│   ├── src/
│   │   ├── assets/                   # Images, icons, global styles
│   │   ├── components/               # Shared / UI Components
│   │   │   ├── common/               # Buttons, Inputs, Modals, Loaders
│   │   │   ├── layout/               # Navbar, Sidebar, Footer
│   │   │   └── map/                  # Leaflet/Mapbox interactive components
│   │   ├── features/                 # Domain-driven feature modules
│   │   │   ├── auth/                 # Login, Register, ProtectedRoutes
│   │   │   ├── itineraries/          # Trip creation, Timeline, Drag-and-Drop
│   │   │   ├── places/               # Search, Place Cards, Recommendations
│   │   │   ├── expenses/             # Budget tracker, Currency converter
│   │   │   └── collaboration/        # Real-time group invite, Socket hooks
│   │   ├── context/                  # Global React Contexts (AuthContext, SocketContext)
│   │   ├── hooks/                    # Custom hooks (useGeolocation, useDebounce, useOffline)
│   │   ├── services/                 # API calls (Axios instances & endpoints)
│   │   ├── utils/                    # Helper functions (date formatting, currency calculations)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
│
└── server/                           # Express Backend
    ├── src/
    │   ├── config/                   # DB connection, Environment vars, Socket.io setup
    │   │   ├── db.js
    │   │   └── socket.js
    │   ├── controllers/              # Request handlers / Business logic trigger
    │   │   ├── authController.js
    │   │   ├── tripController.js
    │   │   ├── placeController.js
    │   │   └── expenseController.js
    │   ├── middlewares/              # Auth verification, Error handling, Rate limiting
    │   │   ├── authMiddleware.js
    │   │   └── errorMiddleware.js
    │   ├── models/                   # Mongoose Schemas
    │   │   ├── User.js
    │   │   ├── Trip.js               # Contains sub-docs for daily itineraries & pins
    │   │   ├── Place.js
    │   │   └── Expense.js
    │   ├── routes/                   # API Route declarations
    │   │   ├── authRoutes.js
    │   │   ├── tripRoutes.js
    │   │   └── expenseRoutes.js
    │   ├── sockets/                  # Real-time WebSocket event listeners (Socket.io)
    │   │   └── tripSocket.js         # Live editing sync between users
    │   ├── utils/                    # Geocoding helpers, Email handlers
    │   └── app.js                    # Express app initialization
    ├── .env
    ├── package.json
    └── server.js                     # Entry point (HTTP + Socket server launch)
    🛠️ Technologies
Frontend
React
Vite
JavaScript
Leaflet
React Leaflet
CSS
Backend
Node.js
Express.js
Socket.IO
Map & Routing
OpenStreetMap
Leaflet
OSRM Routing
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/wanderly
CLIENT_URL=http://localhost:5173
🗺️ Map Routing

The frontend sends the route coordinates to the routing service and receives the road geometry.

Example coordinates:

Ropar        30.9685, 76.5260
Chandigarh   30.7333, 76.7794
Ambala       30.3782, 76.7767
Karnal       29.6857, 76.9905
Panipat      29.3909, 76.9635
New Delhi    28.6139, 77.2090

The route is then displayed on the Leaflet map.

🔄 Real-Time Collaboration

Socket.IO is used for real-time itinerary synchronization.

Example events:

join-trip
update-places
places-updated

This architecture allows multiple users to collaborate on the same trip itinerary.

📱 Application Flow
User
 │
 ▼
React Travel Dashboard
 │
 ├── Trip Itinerary
 │
 ├── Destination List
 │
 └── Interactive Map
        │
        ▼
   Routing Service
        │
        ▼
   Road Route
        │
        ├── Distance
        └── Driving Time
🔮 Future Features
🔐 User authentication
👤 User profiles
🧳 Create multiple trips
➕ Add custom destinations
✏️ Edit itinerary
🗑️ Remove destinations
🔍 Destination search
🌤️ Weather information
🏨 Hotel recommendations
🍽️ Restaurant recommendations
💰 Trip budget planner
🚆 Train and flight information
🚗 Alternative routes
📱 Mobile application
🌙 Dark mode
⭐ Place ratings and reviews
💾 MongoDB trip storage
👥 Multi-user trip collaboration
📤 Export itinerary as PDF
👨‍💻 Author

**Chand Rain**

Travel Planner App — Wanderly

📄 License

This project is intended for educational and development purposes.