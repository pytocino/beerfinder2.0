import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react"; // Importa usePage en lugar de router
import Rating from "@/Components/Rating/Rating";
import AjaxLoader from "@/Components/AjaxLoader";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { Inertia } from "@inertiajs/inertia";

const Show = ({ local, beers }) => {
    if (!local || !beers) {
        return <AjaxLoader />;
    }

    const [values, setValues] = useState({
        rating: 5,
        comment: "",
        error: "",
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (values.rating < 0 || values.rating > 5) {
            setValues({
                ...values,
                error: "Rating must be between 0 and 5",
            });
            return;
        }

        // Enviar datos a través de Inertia.js
        Inertia.post("/local-ratings", {
            local_id: local.data.id,
            rating: values.rating,
            comment: values.comment,
        });
    };

    return (
        <>
            <Head title={local.data.name} />
            <Header />
            <main className="bg-gray-100 min-h-screen">
                <div className="container py-12">
                    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Left Column - Local Information */}
                            <div className="p-6">
                                <h1 className="text-3xl font-bold mb-4">
                                    {local.data.name}
                                </h1>
                                <div className="mb-4">
                                    <p className="text-gray-600">
                                        <strong>Address:</strong>{" "}
                                        {local.data.address}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>City:</strong> {local.data.city}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Phone:</strong>{" "}
                                        {local.data.phone}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Email:</strong>{" "}
                                        {local.data.email}
                                    </p>
                                    <p className="text-gray-600">
                                        <strong>Website:</strong>{" "}
                                        {local.data.website}
                                    </p>
                                </div>
                                <p className="text-gray-700">
                                    {local.data.description}
                                </p>
                                <Rating rating={local.data.rating} />
                                <form onSubmit={handleSubmit} className="mt-6">
                                    <div className="mb-4">
                                        <label
                                            htmlFor="rating"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Rating
                                        </label>
                                        <input
                                            type="number"
                                            id="rating"
                                            name="rating"
                                            value={values.rating}
                                            onChange={handleChange}
                                            min="0"
                                            max="5"
                                            step="0.5"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>

                            {/* Right Column - Beers List */}
                            <div className="p-6 bg-gray-50">
                                <h2 className="text-xl font-bold mb-4">
                                    Otras Cervezas
                                </h2>
                                <ul className="divide-y divide-gray-200">
                                    {beers.data.map((beer) => (
                                        <li
                                            key={beer.id}
                                            className="py-2 flex items-center justify-between"
                                        >
                                            {beer.name}
                                            <span className="text-gray-500 text-sm">
                                                {beer.graduation}%
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Show;
