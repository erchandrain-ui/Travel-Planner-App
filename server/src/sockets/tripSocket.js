export default function tripSocket(io) {

  io.on(
    "connection",
    socket => {

      console.log(
        "New Socket.IO connection:",
        socket.id
      );


      /*
      Join a trip room
      */

      socket.on(
        "join-trip",
        tripId => {

          if (!tripId) {
            return;
          }

          socket.join(
            `trip:${tripId}`
          );

          console.log(
            `${socket.id} joined trip:${tripId}`
          );

        }
      );


      /*
      Leave a trip room
      */

      socket.on(
        "leave-trip",
        tripId => {

          if (!tripId) {
            return;
          }

          socket.leave(
            `trip:${tripId}`
          );

        }
      );


      /*
      Send trip update
      */

      socket.on(
        "trip-update",
        data => {

          if (
            !data ||
            !data.tripId
          ) {

            return;

          }


          socket
            .to(
              `trip:${data.tripId}`
            )
            .emit(
              "trip-updated",
              data
            );

        }
      );


      /*
      Typing event
      */

      socket.on(
        "trip-typing",
        data => {

          if (
            !data ||
            !data.tripId
          ) {

            return;

          }


          socket
            .to(
              `trip:${data.tripId}`
            )
            .emit(
              "trip-user-typing",
              data
            );

        }
      );


      /*
      Disconnect
      */

      socket.on(
        "disconnect",
        reason => {

          console.log(
            `Socket disconnected: ${socket.id}`,
            reason
          );

        }
      );

    }
  );

}