import Expense from "../models/Expense.js";


/*
|--------------------------------------------------------------------------
| Get expenses
|--------------------------------------------------------------------------
*/

export async function listExpenses(
  req,
  res,
  next
) {

  try {

    const expenses =
      await Expense.find({
        user: req.user.id
      })
      .populate(
        "trip",
        "destination start end"
      )
      .sort({
        createdAt: -1
      });


    const total =
      expenses.reduce(
        (sum, expense) =>
          sum +
          Number(
            expense.amount
          ),

        0
      );


    res.json({

      success: true,

      count:
        expenses.length,

      total,

      expenses

    });

  } catch (error) {

    next(error);

  }

}


/*
|--------------------------------------------------------------------------
| Create expense
|--------------------------------------------------------------------------
*/

export async function createExpense(
  req,
  res,
  next
) {

  try {

    const {
      trip,
      name,
      amount,
      currency,
      category
    } = req.body;


    if (
      !name ||
      amount === undefined
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Expense name and amount are required"

      });

    }


    if (
      Number(amount) < 0
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Amount cannot be negative"

      });

    }


    const expense =
      await Expense.create({

        user:
          req.user.id,

        trip:
          trip || null,

        name,

        amount:
          Number(amount),

        currency:
          currency || "INR",

        category:
          category || "Other"

      });


    res.status(201).json({

      success: true,

      message:
        "Expense added successfully",

      expense

    });

  } catch (error) {

    next(error);

  }

}


/*
|--------------------------------------------------------------------------
| Delete expense
|--------------------------------------------------------------------------
*/

export async function deleteExpense(
  req,
  res,
  next
) {

  try {

    const expense =
      await Expense.findOneAndDelete({

        _id:
          req.params.id,

        user:
          req.user.id

      });


    if (!expense) {

      return res.status(404).json({

        success: false,

        message:
          "Expense not found"

      });

    }


    res.json({

      success: true,

      message:
        "Expense deleted successfully"

    });

  } catch (error) {

    next(error);

  }

}