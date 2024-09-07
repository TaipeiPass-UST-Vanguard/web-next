"use client";

import { useConnectionMessage } from "@/composables/useConnectionMessage";
import { useHandleConnectionData } from "@/composables/useHandleConnectionData";
import { LatLngTuple } from "leaflet";
import { createContext, useState } from "react";

const defaultLocation: LatLngTuple = [25.021721, 121.535205];

export const PositionContext = createContext<LatLngTuple>(defaultLocation);

export default function PositionProvider({ children }: { children: React.ReactNode }) {
    const [position, setPosition] = useState<LatLngTuple>(defaultLocation);

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

    return (
        <PositionContext.Provider value={position}>
            {children}
        </PositionContext.Provider>
    )
}
