import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ places }) {
  const center = places.length > 0 ? [places[0].lat, places[0].lng] : [48.8566, 2.3522];

  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {places.map((place, idx) => (
        <Marker key={idx} position={[place.lat, place.lng]}>
          <Popup>
            <strong>{place.name}</strong><br />Day {place.day}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}