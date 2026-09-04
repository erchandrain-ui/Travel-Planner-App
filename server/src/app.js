import express from "express";

import cors from "cors";

import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";

import tripRoutes from "./routes/tripRoutes.js";

import placeRoutes from "./routes/placeRoutes.js";

import expenseRoutes from "./routes/expenseRoutes.js";

import errorMiddleware from "./middlewares/errorMiddleware.js";


const app = express();


/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",

    credentials: true
  })
);


/*
|--------------------------------------------------------------------------
| Body Parser
|--------------------------------------------------------------------------
*/

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true
  })
);


/*
|--------------------------------------------------------------------------
| Rate Limiting
|--------------------------------------------------------------------------
*/

const limiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    max: 300,

    message: {
      message:
        "Too many requests. Please try again later."
    }
  });

app.use(limiter);


/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get(
  "/",
  (req, res) => {

    res.json({
      success: true,

      message:
        "Wanderly Travel Planner API is running",

      version: "1.0.0"
    });

  }
);


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/trips",
  tripRoutes
);

app.use(
  "/api/places",
  placeRoutes
);

app.use(
  "/api/expenses",
  expenseRoutes
);


/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use(
  (req, res) => {

    res.status(404).json({
      success: false,
      message: "API route not found"
    });

  }
);


/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use(
  errorMiddleware
);


export default app;