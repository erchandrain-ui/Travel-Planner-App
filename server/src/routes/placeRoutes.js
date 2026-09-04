import {
  Router
} from "express";

import {
  listPlaces,
  getPlace
} from "../controllers/placeController.js";


const router =
  Router();


/*
GET /api/places?q=Paris
*/

router.get(
  "/",
  listPlaces
);


/*
GET /api/places/:id
*/

router.get(
  "/:id",
  getPlace
);


export default router;