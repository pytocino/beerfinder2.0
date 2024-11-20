import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import chincheta from "../../images/marker.png";
import chincheta2 from "../../images/marker2.png";
import { icon } from "leaflet";

const Map = ({ locales, getUserLocation }) => {
    const [userLocation, setUserLocation] = useState();
    const mapRef = useRef(null);

    useEffect(() => {
        const location = getUserLocation(); // Assuming getUserLocation returns { latitude, longitude }
        if (location) {
            setUserLocation(location);
        }
    }, [getUserLocation]);

    useEffect(() => {
        if (userLocation && mapRef.current) {
            mapRef.current.flyTo(
                [userLocation.latitude, userLocation.longitude],
                14
            ); // Fly to userLocation with zoom level 14
        }
    }, [userLocation]);

    if (!userLocation) {
        return null; // No render the map if userLocation is not available
    }

    return (
        <div className="position-relative m-3 p-3">
            <MapContainer
                center={[userLocation.latitude, userLocation.longitude]}
                zoom={10}
                style={{ height: "500px" }}
                ref={mapRef}
            >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

                {locales.map((local) => (
                    <Marker
                        key={local.id}
                        position={[local.latitude, local.longitude]}
                        icon={icon({
                            iconUrl: chincheta,
                            iconRetinaUrl: chincheta2,
                            iconSize: [101 / 4, 127 / 4],
                            iconAnchor: [40 / 4, 126 / 4],
                            popupAnchor: [1, -34],
                            tooltipAnchor: [16, -28],
                        })}
                    >
                        <Popup>{local.name}</Popup>
                    </Marker>
                ))}
                <Marker
                    position={[userLocation.latitude, userLocation.longitude]}
                    icon={icon({
                        iconUrl: chincheta,
                        iconRetinaUrl: chincheta2,
                        iconSize: [101 / 4, 127 / 4],
                        iconAnchor: [40 / 4, 126 / 4],
                        popupAnchor: [1, -34],
                        tooltipAnchor: [16, -28],
                    })}
                >
                    <Popup>You are here</Popup>
                </Marker>
            </MapContainer>
            <div className="leaflet-top leaflet-right">
                <button
                    className="leaflet-control leaflet-bar bg-white border border-gray-300 rounded px-3 py-2"
                    onClick={() =>
                        mapRef.current.flyTo(
                            [userLocation.latitude, userLocation.longitude],
                            15
                        )
                    }
                >
                    Center Map
                </button>
            </div>
        </div>
    );
};

export default Map;
