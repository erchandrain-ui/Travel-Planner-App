import Place from "../models/Place.js";


/*
|--------------------------------------------------------------------------
| Search places
|--------------------------------------------------------------------------
*/

export async function listPlaces(
  req,
  res,
  next
) {

  try {

    const query =
      req.query.q || "";


    const regex =
      new RegExp(
        query,
        "i"
      );


    const places =
      await Place.find({

        $or: [

          {
            name: regex
          },

          {
            city: regex
          },

          {
            country: regex
          }

        ]

      })
      .limit(50)
      .sort({
        createdAt: -1
      });


    res.json({

      success: true,

      count: places.length,

      places

    });

  } catch (error) {

    next(error);

  }

}


/*
|--------------------------------------------------------------------------
| Get place
|--------------------------------------------------------------------------
*/

export async function getPlace(
  req,
  res,
  next
) {

  try {

    const place =
      await Place.findById(
        req.params.id
      );


    if (!place) {

      return res.status(404).json({

        success: false,

        message:
          "Place not found"

      });

    }


    res.json({

      success: true,

      place

    });

  } catch (error) {

    next(error);

  }

}