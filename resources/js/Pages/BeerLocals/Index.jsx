import React, { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AjaxLoader from "@/Components/AjaxLoader";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Pagination from "@/Components/Pagination/Pagination";
import Rating from "@/Components/Rating/Rating";
import Map from "@/Components/Map/Map";

const Index = ({ beer, locals, name }) => {
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [geoActivated, setGeoActivated] = useState(false);
    const [geoPermissionDenied, setGeoPermissionDenied] = useState(false);
    const [sortedLocals, setSortedLocals] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (beer.data.image) {
                setLoading(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [beer.data.image]);

    useEffect(() => {
        // Cuando se monta el componente, intentamos obtener la ubicación del usuario
        handleGetUserLocation();
    }, []);

    useEffect(() => {
        // Cuando se actualiza la lista de locales o la ubicación del usuario, ordenamos los locales por distancia
        if (locals.data.length > 0 && userLocation) {
            sortLocalsByDistance();
        }
    }, [locals.data, userLocation]);

    const handlePageChange = (url) => {
        if (url) {
            Inertia.get(url, { name }, { preserveState: true });
        }
    };

    const getUserLocation = () => {
        return userLocation;
    };

    const handleGetUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    setGeoActivated(true);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    setGeoPermissionDenied(true);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setGeoPermissionDenied(true);
        }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const deg2rad = (deg) => deg * (Math.PI / 180);

    const sortLocalsByDistance = () => {
        const copyLocals = [...locals.data];

        copyLocals.forEach((local) => {
            local.distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                local.latitude,
                local.longitude
            );
        });

        copyLocals.sort((a, b) => a.distance - b.distance);
        setSortedLocals(copyLocals);
    };

    return (
        <>
            <Head title={beer.data.name} />
            <Header />
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-center mt-8">
                        {beer.data.name}
                    </h1>
                    <div className="flex flex-col items-center justify-center mt-4">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <AjaxLoader />
                            </div>
                        ) : (
                            <img
                                src={beer.data.image}
                                alt={beer.data.name}
                                className="w-32 h-32 rounded-full"
                            />
                        )}
                    </div>
                    <div className="mt-1">
                        <ul>
                            {(geoActivated ? sortedLocals : locals.data).map(
                                (local, index) => (
                                    <li key={`${local.id}-${index}`}>
                                        <Link
                                            href={route("local.show", {
                                                localName: local.name,
                                            })}
                                            className="block mt-4 p-4 bg-gray-100 rounded-md"
                                        >
                                            <h3 className="text-xl font-bold">
                                                {local.name}
                                            </h3>
                                            <p>{local.address}</p>
                                            <div className="flex justify-between items-center">
                                                <Rating rating={local.rating} />
                                                {geoActivated && (
                                                    <p>
                                                        {local.distance.toFixed(
                                                            2
                                                        )}{" "}
                                                        km
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                        <Pagination
                            meta={locals.meta}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    {geoPermissionDenied && (
                        <div className="mt-4 text-red-500">
                            Geolocation is not supported by this browser or
                            permission was denied.
                        </div>
                    )}
                </div>
            </div>
            <Map locales={locals.data} getUserLocation={getUserLocation} />
            <Footer />
        </>
    );
};

export default Index;
