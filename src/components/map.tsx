"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

type MapProps = {
  locations?: LatLngTuple[];
  zoom?: number;
  onClick?: (index: number) => void;
};

export default function Map({
  locations = [],
  zoom = 18,
  onClick,
}: MapProps) {
  const [position, setPosition] = useState<LatLngTuple | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(`Location: ${pos.coords.latitude}, ${pos.coords.longitude}`);
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  if (position === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
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
