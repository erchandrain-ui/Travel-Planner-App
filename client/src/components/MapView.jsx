import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FitMap({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    const bounds = L.latLngBounds(points);

    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 10,
    });
  }, [points, map]);

  return null;
}

export default function MapView({ places = [] }) {
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const center = [29.8, 76.8];

  useEffect(() => {
    if (places.length < 2) return;

    const getRoute = async () => {
      setLoading(true);
      setError("");

      try {
        // OSRM requires longitude,latitude
        const coordinates = places
          .filter(
            (place) =>
              typeof place.lat === "number" &&
              typeof place.lng === "number"
          )
          .map((place) => `${place.lng},${place.lat}`)
          .join(";");

        const url =
          `https://router.project-osrm.org/route/v1/driving/` +
          `${coordinates}?overview=full&geometries=geojson`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Routing service unavailable");
        }

        const data = await response.json();

        if (data.code !== "Ok" || !data.routes?.length) {
          throw new Error("No driving route found");
        }

        const selectedRoute = data.routes[0];

        const roadCoordinates =
          selectedRoute.geometry.coordinates.map(([lng, lat]) => [
            lat,
            lng,
          ]);

        setRoute(roadCoordinates);
        setDistance(selectedRoute.distance);
        setDuration(selectedRoute.duration);
      } catch (err) {
        console.error("Route error:", err);
        setError("Unable to load road route.");
        setRoute([]);
      } finally {
        setLoading(false);
      }
    };

    getRoute();
  }, [places]);

  const markerPoints = places
    .filter(
      (place) =>
        typeof place.lat === "number" &&
        typeof place.lng === "number"
    )
    .map((place) => [place.lat, place.lng]);

  const formatDistance = (meters) => {
    if (!meters) return "0 km";

    return `${(meters / 1000).toFixed(1)} km`;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0 min";

    const totalMinutes = Math.round(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) {
      return `${minutes} min`;
    }

    if (minutes === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${minutes} min`;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "500px",
        position: "relative",
      }}
    >
      <MapContainer
        center={center}
        zoom={7}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "500px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitMap points={markerPoints} />

        {route.length > 0 && (
          <Polyline
            positions={route}
            pathOptions={{
              weight: 6,
              opacity: 0.9,
            }}
          />
        )}

        {places.map((place, index) => (
          <Marker
            key={`${place.name}-${index}`}
            position={[place.lat, place.lng]}
            icon={defaultIcon}
          >
            <Popup>
              <div
                style={{
                  minWidth: "170px",
                  padding: "4px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#6366f1",
                    fontWeight: "700",
                    marginBottom: "4px",
                  }}
                >
                  STOP {index + 1}
                </div>

                <strong
                  style={{
                    fontSize: "16px",
                  }}
                >
                  {place.name}
                </strong>

                <div
                  style={{
                    marginTop: "6px",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  Day {place.day || 1}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Route Information */}
      <div
        style={{
          position: "absolute",
          top: "18px",
          right: "18px",
          zIndex: 1000,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          padding: "16px 18px",
          minWidth: "220px",
          boxShadow: "0 10px 30px rgba(15,23,42,0.18)",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: "800",
            color: "#6366f1",
            letterSpacing: "1px",
            marginBottom: "8px",
          }}
        >
          ROAD TRIP
        </div>

        <div
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "#0f172a",
          }}
        >
          Ropar → New Delhi
        </div>

        <div
          style={{
            display: "flex",
            gap: "18px",
            marginTop: "12px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "11px",
                color: "#64748b",
              }}
            >
              DISTANCE
            </div>

            <strong
              style={{
                fontSize: "17px",
                color: "#0f172a",
              }}
            >
              {loading ? "..." : formatDistance(distance)}
            </strong>
          </div>

          <div>
            <div
              style={{
                fontSize: "11px",
                color: "#64748b",
              }}
            >
              DRIVE TIME
            </div>

            <strong
              style={{
                fontSize: "17px",
                color: "#0f172a",
              }}
            >
              {loading ? "..." : formatDuration(duration)}
            </strong>
          </div>
        </div>

        {loading && (
          <div
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#6366f1",
            }}
          >
            Calculating road route...
          </div>
        )}

        {error && (
          <div
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#dc2626",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
