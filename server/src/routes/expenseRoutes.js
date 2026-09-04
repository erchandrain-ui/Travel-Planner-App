import {
  Router
} from "express";

import authMiddleware
  from "../middlewares/authMiddleware.js";

import {
  listExpenses,
  createExpense,
  deleteExpense
} from "../controllers/expenseController.js";


const router =
  Router();


router.use(
  authMiddleware
);


/*
GET /api/expenses
*/

router.get(
  "/",
  listExpenses
);


/*
POST /api/expenses
*/

router.post(
  "/",
  createExpense
);


/*
DELETE /api/expenses/:id
*/

router.delete(
  "/:id",
  deleteExpense
);


export default router;