import React from "react";

import {
  Link
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const trips = [

  {
    id: "1",
    city: "Paris, France",
    date: "12–17 Oct 2026",
    img:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80"
  },

  {
    id: "2",
    city: "Bali, Indonesia",
    date: "04–10 Dec 2026",
    img:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80"
  }

];

export default function Dashboard() {

  const { user } = useAuth();

  return (

    <>

      <div className="page-head">

        <div>

          <h1>
            Good evening,{" "}
            {user?.name?.split(" ")[0]} 👋
          </h1>

          <div className="muted">
            Ready for your next adventure?
          </div>

        </div>

        <Link
          className="btn btn-primary"
          to="/trips/new"
        >
          + Plan Trip
        </Link>

      </div>


      <div className="grid stats">

        <div className="card">

          <div className="muted">
            My trips
          </div>

          <div className="stat-num">
            08
          </div>

        </div>


        <div className="card">

          <div className="muted">
            Countries
          </div>

          <div className="stat-num">
            12
          </div>

        </div>


        <div className="card">

          <div className="muted">
            Places saved
          </div>

          <div className="stat-num">
            46
          </div>

        </div>


        <div className="card">

          <div className="muted">
            Budget used
          </div>

          <div className="stat-num">
            ₹42K
          </div>

        </div>

      </div>


      <div className="grid dashboard-grid">

        <section className="card">

          <h2>
            Upcoming trips
          </h2>

          <div className="list">

            {trips.map(trip => (

              <div
                className="trip-card"
                key={trip.id}
              >

                <img
                  className="trip-img"
                  src={trip.img}
                  alt={trip.city}
                />

                <div
                  style={{
                    flex: 1
                  }}
                >

                  <h3>
                    {trip.city}
                  </h3>

                  <div className="muted">
                    {trip.date}
                  </div>

                  <span className="pill">
                    Planned
                  </span>

                </div>

                <Link
                  className="btn btn-light"
                  to={
                    "/trips/" +
                    trip.id
                  }
                >
                  View
                </Link>

              </div>

            ))}

          </div>

        </section>


        <section className="card">

          <h2>
            Quick actions
          </h2>

          <div className="list">

            <Link
              className="btn btn-light"
              to="/places"
            >
              📍 Find places
            </Link>

            <Link
              className="btn btn-light"
              to="/expenses"
            >
              💳 Track expenses
            </Link>

            <Link
              className="btn btn-light"
              to="/trips/new"
            >
              🗓 Build itinerary
            </Link>

          </div>

        </section>

      </div>

    </>
  );
}