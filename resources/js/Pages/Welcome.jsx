import React, { useState, useEffect } from "react";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Modal from "@/Components/Modal";
import { Head } from "@inertiajs/react";
import NavButton from "@/Components/NavButton/NavButton";
import topArrow from "../images/toparrow.svg";
import BeerCard from "@/Components/BeerCard/BeerCard";
import OpinionForm from "@/Components/OpinionForm";
import TranslationWrapper from "@/Wrappers/TranslationWrapper";

export default function Welcome({ auth, beers, types }) {
    // Estados
    const [isModalOpen, setModalOpen] = useState(true); // Modal de verificación de edad
    const [isOpinionModalOpen, setOpinionModalOpen] = useState(false); // Modal de opinión
    const [filters, setFilters] = useState({ type: "", sortBy: "" }); // Filtros de cervezas
    const [filteredBeers, setFilteredBeers] = useState(beers?.data || []); // Lista filtrada de cervezas
    const [language, setLanguage] = useState("es"); // Cambiar idioma dinámicamente
    const [translate, setTranslate] = useState(false); // Estado para controlar si traducir

    const toggleLanguage = (lang) => {
        setLanguage(lang);
        setTranslate(true); // Activamos la traducción cuando se cambia el idioma
    };
    // Función para obtener una cookie
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        return parts.length === 2 ? parts.pop().split(";").shift() : null;
    };

    // Función para establecer una cookie
    const setCookie = (name, value, maxAge) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + maxAge * 1000); // maxAge en segundos
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
    };

    // Filtrar cervezas según los filtros seleccionados
    const applyFilters = () => {
        if (!beers?.data) return;

        let filtered = [...beers.data];

        // Filtro por tipo
        if (filters.type) {
            filtered = filtered.filter((beer) => beer.type === filters.type);
        }

        // Ordenar por nombre o graduación
        if (filters.sortBy === "name_asc") {
            filtered.sort((a, b) => a.name.localeCompare(b.name)); // Alfabéticamente A-Z
        } else if (filters.sortBy === "name_desc") {
            filtered.sort((a, b) => b.name.localeCompare(a.name)); // Alfabéticamente Z-A
        } else if (filters.sortBy === "graduation_asc") {
            filtered.sort(
                (a, b) => parseFloat(a.graduation) - parseFloat(b.graduation) // Graduación de baja a alta
            );
        } else if (filters.sortBy === "graduation_desc") {
            filtered.sort(
                (a, b) => parseFloat(b.graduation) - parseFloat(a.graduation) // Graduación de alta a baja
            );
        }

        setFilteredBeers(filtered);
    };

    // Manejar cambios en los filtros
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    // Limpiar filtros
    const clearFilters = () => {
        setFilters({ type: "", sortBy: "" });
    };

    // Aplicar filtros cuando cambian
    useEffect(() => {
        applyFilters(); // Filtrar cervezas cada vez que los filtros cambian
    }, [filters, beers]); // Solo se ejecuta cuando los filtros o las cervezas cambian

    // Verificar si la cookie "cookie_edad" existe
    useEffect(() => {
        if (getCookie("cookie_edad")) {
            setModalOpen(false); // Cierra el modal si la cookie existe
        }
    }, []);

    // Configurar la cookie de edad
    const handleYes = () => {
        setModalOpen(false);
        setCookie("cookie_edad", "1", 30 * 24 * 60 * 60); // Cookie válida por 30 días
    };

    const handleNo = () => {
        window.history.back(); // Redirige al usuario
    };

    // Mostrar el modal de opinión tras 1 minuto si no existe la cookie
    useEffect(() => {
        if (!getCookie("cookie_opinion")) {
            const timer = setTimeout(
                () => setOpinionModalOpen(true),
                30 * 1000
            );
            return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
        }
    }, []);

    const handleFeedback = () => {
        // Guardar cookie para no mostrar el modal durante 30 días
        setCookie("cookie_opinion", "1", 30 * 24 * 60 * 60); // Cookie válida por 30 días
        setOpinionModalOpen(false);
    };

    return (
        <>
            <div>
                <button onClick={() => toggleLanguage("en")}>
                    Traducir al Inglés
                </button>
                <button onClick={() => toggleLanguage("es")}>
                    Traducir al Español
                </button>
                <TranslationWrapper language={language} translate={translate}>
                    {/* Metadata y Header */}
                    <Head title="WELCOME" />
                    <Header auth={auth} />

                    {/* Main Content */}
                    <main className="container my-4">
                        {/* Modal de Opinión */}
                        <Modal
                            show={isOpinionModalOpen}
                            maxWidth="md"
                            onClose={() => setOpinionModalOpen(false)}
                        >
                            <OpinionForm onSuccess={handleFeedback} />
                        </Modal>
                        <Modal
                            show={isModalOpen}
                            maxWidth="md"
                            onClose={() => setModalOpen(false)}
                        >
                            <div className="p-4">
                                <h5 className="text-xl font-bold mb-2 text-warning">
                                    ¿Eres mayor de edad?
                                </h5>
                                <p className="mb-4">
                                    Para acceder a este sitio, necesitas ser
                                    mayor de edad.
                                </p>
                                <div className="d-flex justify-content-center gap-3">
                                    <button
                                        className="btn btn-warning text-white"
                                        onClick={handleYes}
                                    >
                                        Sí
                                    </button>
                                    <button
                                        className="btn btn-danger text-white"
                                        onClick={handleNo}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </Modal>

                        {/* Hero Section */}
                        <section className="container py-3">
                            <div className="text-center">
                                <h1 className="display-4 fw-bold">
                                    ¡Bienvenido!
                                </h1>
                                <p className="lead text-muted mt-3">
                                    Descubre y encuentra una gran variedad
                                    cervezas.
                                </p>
                                <hr className="my-4 mx-auto w-50" />
                                <p className="lead text-muted mt-3">
                                    Aquí lo tienes, empieza! 🍻👇🏽
                                </p>
                            </div>
                        </section>

                        {/* Filtros */}
                        <section className="mb-5">
                            <h2 className="text-xl font-bold mb-3">Filtros</h2>
                            <div className="row g-2">
                                {/* Filtro de tipo */}
                                <div className="col-12 col-md-4">
                                    <select
                                        name="type"
                                        value={filters.type}
                                        onChange={handleFilterChange}
                                        className="form-select"
                                    >
                                        <option value="">
                                            Todos los tipos
                                        </option>
                                        {types &&
                                            types.map((type, index) => (
                                                <option
                                                    key={index}
                                                    value={type}
                                                >
                                                    {type}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                {/* Filtro de ordenación */}
                                <div className="col-12 col-md-4">
                                    <select
                                        name="sortBy"
                                        value={filters.sortBy}
                                        onChange={handleFilterChange}
                                        className="form-select"
                                    >
                                        <option value="">Ordenar por</option>
                                        <option value="name_asc">
                                            Nombre {`↑`}
                                        </option>{" "}
                                        {/* Flecha hacia arriba */}
                                        <option value="name_desc">
                                            Nombre {`↓`}
                                        </option>{" "}
                                        {/* Flecha hacia abajo */}
                                        <option value="graduation_asc">
                                            Graduación{`↓`}
                                        </option>{" "}
                                        {/* Flecha hacia arriba */}
                                        <option value="graduation_desc">
                                            Graduación {`↑`}
                                        </option>{" "}
                                        {/* Flecha hacia abajo */}
                                    </select>
                                </div>

                                <div className="col-12 col-md-4 d-flex align-items-center">
                                    <button
                                        onClick={clearFilters}
                                        className="btn btn-secondary w-100"
                                    >
                                        Limpiar filtros
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Lista de Cervezas */}
                        <section>
                            {filteredBeers.length > 0 ? (
                                <div className="row row-cols-2 row-cols-md-3 g-4">
                                    {filteredBeers.map((beer) => (
                                        <div key={beer.id} className="col">
                                            <BeerCard beer={beer} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted">
                                    No hay cervezas que coincidan con los
                                    filtros seleccionados.
                                </p>
                            )}
                        </section>

                        {/* Botón Scroll Top */}
                        <NavButton scrollTop={true} className="btn-scroll-top">
                            <img src={topArrow} alt="Volver arriba" />
                        </NavButton>
                    </main>

                    {/* Footer */}
                    <Footer />
                </TranslationWrapper>
            </div>
        </>
    );
}
