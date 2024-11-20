import React, { useState, useEffect } from "react";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Modal from "@/Components/Modal";
import { Head } from "@inertiajs/react";
import NavButton from "@/Components/NavButton/NavButton";
import topArrow from "../images/toparrow.svg";
import BeerCard from "@/Components/BeerCard/BeerCard";

export default function Welcome({ auth, beers, types }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        type: "",
        sortBy: "",
    });
    const [filteredBeers, setFilteredBeers] = useState([]);

    useEffect(() => {
        if (beers && beers.data) {
            setFilteredBeers(beers.data);
        }
    }, [beers]);

    useEffect(() => {
        applyFilters();
    }, [filters, beers.data]);

    const applyFilters = () => {
        let filtered = [...beers.data]; // Clonar la lista de cervezas para evitar mutaciones

        if (filters.type) {
            filtered = filtered.filter((beer) => beer.type === filters.type);
        }

        if (filters.sortBy === "name") {
            filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filters.sortBy === "graduation") {
            filtered = filtered.sort(
                (a, b) => parseFloat(b.graduation) - parseFloat(a.graduation)
            );
        }

        setFilteredBeers(filtered);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const clearFilters = () => {
        setFilters({
            type: "",
            sortBy: "",
        });
        setFilteredBeers(beers.data);
    };

    const handleYes = () => {
        setModalOpen(false);
        document.cookie =
            "cookie_edad=1; max-age=" + 30 * 24 * 60 * 60 + "; path=/";
    };

    const handleNo = () => {
        window.history.back();
    };

    return (
        <>
            <Head title="WELCOME" />
            <Header auth={auth} />
            <main>
                <Modal show={isModalOpen} maxWidth="md" onClose={() => {}}>
                    <div className="p-4">
                        <h5 className="text-xl font-bold mb-2 text-yellow-600">
                            ¿Eres mayor de edad?
                        </h5>
                        <p className="mb-4">
                            Para acceder a este sitio, necesitas ser mayor de
                            edad.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <button
                                className="btn btn-yellow text-white"
                                onClick={handleYes}
                            >
                                Sí
                            </button>
                            <button
                                className="btn btn-red text-white"
                                onClick={handleNo}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </Modal>
                <section className="container my-4">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Filtros:</h2>
                        <div className="row g-2">
                            <div className="col-12 col-md-4">
                                <select
                                    name="type"
                                    value={filters.type}
                                    onChange={handleFilterChange}
                                    className="form-select"
                                >
                                    <option value="">Todos los tipos</option>
                                    {types &&
                                        types.map((type, index) => (
                                            <option key={index} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="col-12 col-md-4">
                                <select
                                    name="sortBy"
                                    value={filters.sortBy}
                                    onChange={handleFilterChange}
                                    className="form-select"
                                >
                                    <option value="">Ordenar por</option>
                                    <option value="name">Nombre</option>
                                    <option value="graduation">
                                        Graduación
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-2">
                            <button
                                onClick={clearFilters}
                                className="btn btn-secondary"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </div>
                    <div className="row row-cols-2 row-cols-md-2 g-4">
                        {filteredBeers.map((beer) => (
                            <div key={beer.id} className="col">
                                <BeerCard beer={beer} />
                            </div>
                        ))}
                    </div>
                </section>
                <NavButton scrollTop={true} className="btn-scroll-top">
                    <img src={topArrow} alt="flecha scroll top" />
                </NavButton>
            </main>
            <Footer />
        </>
    );
}
