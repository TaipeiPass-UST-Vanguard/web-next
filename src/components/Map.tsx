"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
  posix?: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const Map = ({ posix, zoom = 18 }: MapProps) => {
  const [position, setPosition] = useState<LatLngTuple | null>(null);

  useEffect(() => {
    if (!posix) {
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
    } else {
      setPosition(posix as LatLngTuple);
    }
  }, [posix]);

  if (position === null) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      <Marker position={position} draggable={false}>
        <Popup>Hey ! I study here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
