"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

type MapProps = {
  position?: LatLngTuple;
  locations?: LatLngTuple[];
  zoom?: number;
  onClick?: (index: number) => void;
};

export default function Map({
  position,
  locations = [],
  zoom = 18,
  onClick,
}: MapProps) {

  if (position === null) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <h1 className="flex flex-row">Loading ...</h1>
        </div>
      </>
    )
  }

  return (
    <>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        {
          locations.map((location, index) => (
            <Marker
              key={index}
              position={location}
              draggable={false}
              eventHandlers={{
                click: () => onClick && onClick(index),
              }}
            />
          ))
        }
      </MapContainer >
    </>
  );
};
