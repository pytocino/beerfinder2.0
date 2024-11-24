import React, { useEffect, useState } from "react";
import AjaxLoader from "../AjaxLoader";
import { Link } from "@inertiajs/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BeerCard = ({ beer }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (beer.image) {
                setLoading(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [beer.image]);

    return (
        <Link
            href={route("beerlocals.index", { name: beer.name })}
            className="text-decoration-none text-dark"
        >
            <div className="card h-100">
                <div className="card-body d-flex flex-column align-items-center">
                    <div className="mb-3">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <AjaxLoader />
                            </div>
                        ) : (
                            <LazyLoadImage
                                src={beer.image}
                                alt={beer.name}
                                className="img-fluid "
                            />
                        )}
                    </div>
                    <h5 className="card-title">{beer.name}</h5>
                    <p className="card-text">
                        <strong>Tipo:</strong> {beer.type}
                    </p>
                    {/* <p className="card-text">
                        <strong>Color:</strong> {beer.color}
                    </p> */}
                    <p className="card-text">
                        <strong>Graduacion:</strong> {beer.graduation}%
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default BeerCard;
