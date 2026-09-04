import mongoose from "mongoose";

const expenseSchema =
  new mongoose.Schema(

    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true
      },

      trip: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Trip",

        default: null
      },

      name: {
        type: String,

        required: true,

        trim: true
      },

      amount: {
        type: Number,

        required: true,

        min: 0
      },

      currency: {
        type: String,

        default: "INR"
      },

      category: {
        type: String,

        default: "Other"
      }

    },

    {
      timestamps: true
    }

  );


export default mongoose.model(
  "Expense",
  expenseSchema
);