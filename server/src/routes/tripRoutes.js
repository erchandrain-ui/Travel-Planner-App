import {
  Router
} from "express";

import authMiddleware
  from "../middlewares/authMiddleware.js";

import {
  listTrips,
  createTrip,
  getTrip,
  updateTrip,
  deleteTrip
} from "../controllers/tripController.js";


const router =
  Router();


router.use(
  authMiddleware
);


/*
GET /api/trips
*/

router.get(
  "/",
  listTrips
);


/*
POST /api/trips
*/

router.post(
  "/",
  createTrip
);


/*
GET /api/trips/:id
*/

router.get(
  "/:id",
  getTrip
);


/*
PUT /api/trips/:id
*/

router.put(
  "/:id",
  updateTrip
);


/*
DELETE /api/trips/:id
*/

router.delete(
  "/:id",
  deleteTrip
);


export default router;