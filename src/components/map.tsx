"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useHandleConnectionData } from "@/composables/useHandleConnectionData";
import { useConnectionMessage } from "@/composables/useConnectionMessage";

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
    const handlePosition = (event: { data: string }) => {
      try {
        const result = JSON.parse(event.data);
        console.log(result);
        if (result.name === 'location') {
          setPosition([result.data.latitude, result.data.longitude]);
        }
      } catch (error) {
        console.error('Error handling message:', error);
      }
    };

    useHandleConnectionData(handlePosition);
    useConnectionMessage('location', null);
  }, []);

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
