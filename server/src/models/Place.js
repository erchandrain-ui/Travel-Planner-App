import mongoose from "mongoose";

const placeSchema =
  new mongoose.Schema(

    {
      name: {
        type: String,

        required: true,

        trim: true
      },

      city: {
        type: String,

        required: true,

        trim: true
      },

      country: {
        type: String,

        default: ""
      },

      lat: {
        type: Number
      },

      lng: {
        type: Number
      },

      image: {
        type: String,

        default: ""
      },

      description: {
        type: String,

        default: ""
      }

    },

    {
      timestamps: true
    }

  );


export default mongoose.model(
  "Place",
  placeSchema
);