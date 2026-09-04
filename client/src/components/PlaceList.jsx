import React from "react";

export default function PlaceList({ places = [] }) {
  return (
    <div>
      {places.map((place, index) => (
        <div
          key={`${place.name}-${index}`}
          style={{
            position: "relative",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "14px",
            marginBottom: "12px",
            boxShadow: "0 6px 20px rgba(15,23,42,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                minWidth: "38px",
                borderRadius: "12px",
                background: "#eef2ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4f46e5",
                fontWeight: "800",
              }}
            >
              {index + 1}
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: "#0f172a",
                }}
              >
                {place.name}
              </h3>

              <div
                style={{
                  marginTop: "4px",
                  fontSize: "11px",
                  color: "#64748b",
                }}
              >
                {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
              </div>
            </div>
          </div>

          {index < places.length - 1 && (
            <div
              style={{
                position: "absolute",
                left: "32px",
                bottom: "-13px",
                height: "14px",
                borderLeft: "2px dashed #c7d2fe",
                zIndex: 2,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
