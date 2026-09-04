export async function geocode(
  place
) {

  if (!place) {

    throw new Error(
      "Place name is required"
    );

  }


  return {

    query: place,

    message:
      "Connect a geocoding provider here for live coordinates.",

    coordinates: null

  };

}