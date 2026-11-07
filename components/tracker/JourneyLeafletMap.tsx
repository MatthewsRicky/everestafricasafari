"use client";

import { useEffect, useMemo } from "react";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import type { JourneyStop } from "@/types/journey";

type Coordinate = [number, number];

function MapBounds({ positions }: { positions: Coordinate[] }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length === 1) {
      map.setView(positions[0], 9);
      return;
    }

    if (positions.length > 1) {
      map.fitBounds(positions, {
        padding: [40, 40],
      });
    }
  }, [map, positions]);

  return null;
}

export default function JourneyLeafletMap({ stops }: { stops: JourneyStop[] }) {
  const mappedStops = stops.filter(
    (
      stop,
    ): stop is JourneyStop & {
      latitude: number;
      longitude: number;
    } => stop.latitude !== null && stop.longitude !== null,
  );

  if (!mappedStops.length) {
    return (
      <div className="rounded-xl bg-gray-100 p-8 text-center">
        <p className="text-sm text-gray-500">
          A journey map will be available once destination coordinates have been
          added.
        </p>
      </div>
    );
  }

  const positions = useMemo<Coordinate[]>(
    () => mappedStops.map((stop) => [stop.latitude, stop.longitude]),
    [mappedStops],
  );

  const center = positions[0];

  return (
    <div className="h-[420px] overflow-hidden rounded-xl border border-gray-200">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapBounds positions={positions} />

        {positions.length > 1 && (
          <Polyline
            positions={positions}
            pathOptions={{
              color: "#8b5e3c",
              weight: 4,
              opacity: 0.8,
            }}
          />
        )}

        {mappedStops.map((stop, index) => (
          <CircleMarker
            key={stop.id}
            center={[stop.latitude, stop.longitude]}
            radius={9}
            pathOptions={{
              color: "#ffffff",
              weight: 3,
              fillColor: "#7b3038",
              fillOpacity: 1,
            }}
          >
            <Popup>
              <div>
                <strong>
                  {index + 1}. {stop.location}
                </strong>

                {stop.arrival_date && <p>{stop.arrival_date}</p>}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
