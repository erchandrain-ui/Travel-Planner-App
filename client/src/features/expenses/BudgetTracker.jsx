import React, {
  useState
} from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

import {
  Link
} from "react-router-dom";

delete L.Icon.Default.prototype
  ._getIconUrl;

L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

});


const places = [

  {
    name: "Eiffel Tower",
    city: "Paris",
    lat: 48.8584,
    lng: 2.2945,
    img:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=500&q=80"
  },

  {
    name: "Ubud Rice Terrace",
    city: "Bali",
    lat: -8.5069,
    lng: 115.2625,
    img:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80"
  },

  {
    name: "India Gate",
    city: "Delhi",
    lat: 28.6129,
    lng: 77.2295,
    img:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=500&q=80"
  }

];


export default function PlaceSearch() {

  const [query, setQuery] =
    useState("");

  const list =
    places.filter(place =>

      (
        place.name +
        " " +
        place.city
      )
        .toLowerCase()
        .includes(
          query.toLowerCase()
        )

    );

  return (

    <>

      <div className="page-head">

        <div>

          <h1>
            Explore places
          </h1>

          <div className="muted">
            Discover attractions
            and save ideas.
          </div>

        </div>

        <Link
          className="btn btn-primary"
          to="/trips/new"
        >
          Plan Trip
        </Link>

      </div>


      <div className="field">

        <input
          placeholder="Search destination or attraction..."
          value={query}
          onChange={event =>
            setQuery(
              event.target.value
            )
          }
        />

      </div>


      <div
        className="grid"
        style={{
          gridTemplateColumns:
            "1fr 1fr"
        }}
      >

        {list.map(place => (

          <div
            className="card place-card"
            key={place.name}
          >

            <img
              src={place.img}
              alt={place.name}
            />

            <div>

              <h3
                style={{
                  margin:
                    "0 0 5px"
                }}
              >
                {place.name}
              </h3>

              <div className="muted">
                {place.city}
              </div>

            </div>

          </div>

        ))}

      </div>


      <div className="map">

        <MapContainer
          center={[
            28.6139,
            77.209
          ]}
          zoom={3}
          style={{
            height: "100%",
            width: "100%"
          }}
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {places.map(place => (

            <Marker
              key={place.name}
              position={[
                place.lat,
                place.lng
              ]}
            >

              <Popup>
                {place.name},{" "}
                {place.city}
              </Popup>

            </Marker>

          ))}

        </MapContainer>

      </div>

    </>
  );
}