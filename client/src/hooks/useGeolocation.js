import {
  useEffect,
  useState
} from "react";

export default function useGeolocation() {

  const [position, setPosition] =
    useState(null);

  useEffect(() => {

    if (
      !navigator.geolocation
    ) {
      return;
    }

    navigator.geolocation
      .getCurrentPosition(
        location => {

          setPosition({
            lat:
              location.coords.latitude,

            lng:
              location.coords.longitude
          });

        }
      );

  }, []);

  return position;
}