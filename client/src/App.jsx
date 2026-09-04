import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import MapView from "./components/MapView";
import PlaceList from "./components/PlaceList";

const socket = io("http://localhost:5000", {
  autoConnect: true,
});

const TRIP_ID = "ropar-delhi-trip";

export default function App() {
  const [places, setPlaces] = useState([
    {
      name: "Ropar",
      lat: 30.9685,
      lng: 76.5260,
      day: 1,
    },
    {
      name: "Chandigarh",
      lat: 30.7333,
      lng: 76.7794,
      day: 1,
    },
    {
      name: "Ambala",
      lat: 30.3782,
      lng: 76.7767,
      day: 1,
    },
    {
      name: "Karnal",
      lat: 29.6857,
      lng: 76.9905,
      day: 1,
    },
    {
      name: "Panipat",
      lat: 29.3909,
      lng: 76.9635,
      day: 1,
    },
    {
      name: "New Delhi",
      lat: 28.6139,
      lng: 77.2090,
      day: 1,
    },
  ]);

  useEffect(() => {
    socket.emit("join-trip", TRIP_ID);

    const handlePlacesUpdated = (updatedPlaces) => {
      if (Array.isArray(updatedPlaces) && updatedPlaces.length > 0) {
        setPlaces(updatedPlaces);
      }
    };

    socket.on("places-updated", handlePlacesUpdated);

    return () => {
      socket.off("places-updated", handlePlacesUpdated);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        background: "#f8fafc",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: "hidden",
      }}
    >
      <aside
        style={{
          width: "320px",
          minWidth: "320px",
          padding: "25px 18px",
          overflowY: "auto",
          background: "#f8fafc",
          borderRight: "1px solid #e2e8f0",
        }}
      >
        <div style={{ marginBottom: "22px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "800",
              color: "#6366f1",
              letterSpacing: "1.5px",
              marginBottom: "5px",
            }}
          >
            WANDERLY
          </div>

          <h2
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "25px",
            }}
          >
            Road Trip
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Ropar → New Delhi
          </p>
        </div>

        <PlaceList places={places} />
      </aside>

      <main
        style={{
          flex: 1,
          padding: "18px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "20px",
            overflow: "hidden",
            background: "#e2e8f0",
            boxShadow: "0 12px 40px rgba(15, 23, 42, 0.10)",
          }}
        >
          <MapView places={places} />
        </div>
      </main>
    </div>
  );
}
