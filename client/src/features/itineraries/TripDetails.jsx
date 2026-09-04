import React, {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link
} from "react-router-dom";

export default function TripDetails() {

  const { id } = useParams();

  const [trip, setTrip] =
    useState(null);

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "trip_" + id
      );

    if (saved) {
      setTrip(JSON.parse(saved));
    }

  }, [id]);

  if (!trip) {

    return (

      <div className="card empty">

        Demo trip details —
        choose "Plan Trip"
        to create your own itinerary.

      </div>

    );
  }

  return (

    <>

      <div className="page-head">

        <div>

          <h1>
            {trip.destination}
          </h1>

          <div className="muted">
            {trip.start} → {trip.end}
          </div>

        </div>

        <Link
          className="btn btn-light"
          to="/trips/new"
        >
          New trip
        </Link>

      </div>


      <div className="grid dashboard-grid">

        <section className="card">

          <h2>
            Itinerary
          </h2>

          <div className="timeline">

            <div className="timeline-item">

              <b>
                Day 1 — Arrival
              </b>

              <p className="muted">
                Check in, explore the
                city center and enjoy dinner.
              </p>

            </div>


            <div className="timeline-item">

              <b>
                Day 2 — Explore
              </b>

              <p className="muted">
                Add attractions,
                restaurants and activities here.
              </p>

            </div>


            <div className="timeline-item">

              <b>
                Day 3 — Local experience
              </b>

              <p className="muted">
                Reserve time for a local
                tour and free exploration.
              </p>

            </div>

          </div>

        </section>


        <section className="card">

          <h2>
            Trip summary
          </h2>

          <p>
            <b>Budget:</b>{" "}
            ₹
            {Number(
              trip.budget || 0
            ).toLocaleString("en-IN")}
          </p>

          <p>
            <b>Notes:</b>{" "}
            {trip.notes ||
              "No notes yet."}
          </p>

        </section>

      </div>

    </>
  );
}