import mongoose from "mongoose";

const itineraryItemSchema =
  new mongoose.Schema(
    {
      day: {
        type: Number,
        required: true
      },

      title: {
        type: String,
        required: true,
        trim: true
      },

      items: {
        type: [String],
        default: []
      }
    },

    {
      _id: false
    }
  );


const tripSchema =
  new mongoose.Schema(

    {
      user: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true
      },

      destination: {
        type: String,

        required: true,

        trim: true
      },

      start: {
        type: Date,

        required: true
      },

      end: {
        type: Date,

        required: true
      },

      budget: {
        type: Number,

        default: 0,

        min: 0
      },

      notes: {
        type: String,

        default: ""
      },

      itinerary: {
        type: [itineraryItemSchema],

        default: []
      }

    },

    {
      timestamps: true
    }

  );


export default mongoose.model(
  "Trip",
  tripSchema
);