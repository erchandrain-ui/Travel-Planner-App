import Trip from "../models/Trip.js";


/*
|--------------------------------------------------------------------------
| Get all trips
|--------------------------------------------------------------------------
*/

export async function listTrips(
  req,
  res,
  next
) {

  try {

    const trips =
      await Trip.find({
        user: req.user.id
      })
      .sort({
        createdAt: -1
      });


    res.json({

      success: true,

      count: trips.length,

      trips

    });

  } catch (error) {

    next(error);

  }

}


/*
|--------------------------------------------------------------------------
| Create trip
|--------------------------------------------------------------------------
*/

export async function createTrip(
  req,
  res,
  next
) {

  try {

    const {
      destination,
      start,
      end,
      budget,
      notes,
      itinerary
    } = req.body;


    if (
      !destination ||
      !start ||
      !end
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Destination, start date and end date are required"

      });

    }


    if (
      new Date(end) <
      new Date(start)
    ) {

      return res.status(400).json({

        success: false,

        message:
          "End date cannot be before start date"

      });

    }


    const trip =
      await Trip.create({

        user:
          req.user.id,

        destination,

        start,

        end,

        budget:
          Number(budget || 0),

        notes:
          notes || "",

        itinerary:
          itinerary || []

      });


    res.status(201).json({

      success: true,

      message:
        "Trip created successfully",

      trip

    });

  } catch (error) {

    next(error);

  }

}


/*
|--------------------------------------------------------------------------
| Get single trip
|--------------------------------------------------------------------------
*/

export async function getTrip(
  req,
  res,
  next
) {

  try {

    const trip =
      await Trip.findOne({

        _id:
          req.params.id,

        user:
          req.user.id

      });


    if (!trip) {

      return res.status(404).json({

        success: false,

        message:
          "Trip not found"

      });

    }


    res.json({

      success: true,

      trip

    });

  } catch (error) {

    next(error);

  }

}


/*
|--------------------------------------------------------------------------
| Update trip
|--------------------------------------------------------------------------
*/

export async function updateTrip(
  req,
  res,
  next
) {

  try {

    const trip =
      await Trip.findOneAndUpdate(

        {
          _id:
            req.params.id,

          user:
            req.user.id
        },

        req.body,

        {
          new: true,

          runValidators: true
        }

      );


    if (!trip) {

      return res.status(404).json({

        success: false,

        message:
          "Trip not found"

      });

    }


    res.json({

      success: true,

      message:
        "Trip updated successfully",

      trip

    });

  } catch (error) {

    next(error);

  }

}


/*
|--------------------------------------------------------------------------
| Delete trip
|--------------------------------------------------------------------------
*/

export async function deleteTrip(
  req,
  res,
  next
) {

  try {

    const trip =
      await Trip.findOneAndDelete({

        _id:
          req.params.id,

        user:
          req.user.id

      });


    if (!trip) {

      return res.status(404).json({

        success: false,

        message:
          "Trip not found"

      });

    }


    res.json({

      success: true,

      message:
        "Trip deleted successfully"

    });

  } catch (error) {

    next(error);

  }

}