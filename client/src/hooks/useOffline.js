import {
  useEffect,
  useState
} from "react";

export default function useOffline() {

  const [offline, setOffline] =
    useState(
      !navigator.onLine
    );

  useEffect(() => {

    const online = () =>
      setOffline(false);

    const offline = () =>
      setOffline(true);

    window.addEventListener(
      "online",
      online
    );

    window.addEventListener(
      "offline",
      offline
    );

    return () => {

      window.removeEventListener(
        "online",
        online
      );

      window.removeEventListener(
        "offline",
        offline
      );

    };

  }, []);

  return offline;
}