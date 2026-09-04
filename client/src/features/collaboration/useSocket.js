import {
  io
} from "socket.io-client";

import {
  useEffect
} from "react";

export default function useSocket(
  event,
  callback
) {

  useEffect(() => {

    const socket =
      io("http://localhost:5000");

    socket.on(
      event,
      callback
    );

    return () => {
      socket.disconnect();
    };

  }, [
    event,
    callback
  ]);

}