import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";

export default function OpinionForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
        rating: "",
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(""); // Para manejar los errores

    // Función para establecer la cookie
    const setCookie = (name, value, maxAge) => {
        document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; Secure; SameSite=Strict`;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar si el campo "message" está vacío
        if (!form.message) {
            setError("El mensaje es obligatorio.");
            return;
        }

        try {
            // Enviar la opinión
            await Inertia.post("/opinions", {
                ...form,
                name: form.name || "Anónimo", // Establecer "Anónimo" si el nombre está vacío
            });
            setSuccess(true);
            setError(""); // Limpiar mensaje de error en caso de éxito

            // Crear la cookie para no mostrar el modal de opinión otra vez durante 30 días
            setCookie("cookie_opinion", "1", 30 * 24 * 60 * 60);

            // Limpiar formulario después de enviar
            setForm({
                name: "",
                email: "",
                message: "",
                rating: "",
            });
        } catch (error) {
            setError(
                "Hubo un problema al enviar la opinión. Inténtalo de nuevo."
            );
            console.error(error);
        }
    };

    return (
        <div className="container p-3">
            <h2 className="text-center">Deja tu opinión</h2>

            {/* Mostrar mensaje de éxito */}
            {success && (
                <div className="alert alert-success" role="alert">
                    ¡Opinión enviada con éxito!
                </div>
            )}

            {/* Mostrar mensaje de error */}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Campo de Nombre */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Nombre (Opcional)
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Anónimo si se deja vacío"
                    />
                </div>

                {/* Campo de Correo Electrónico */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Correo electrónico (Opcional)
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Tu correo (opcional)"
                    />
                </div>

                {/* Campo de Mensaje */}
                <div className="mb-3">
                    <label htmlFor="message" className="form-label text-danger">
                        Mensaje <span className="text-danger">*</span>
                    </label>
                    <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                    <small className="text-muted">
                        Este campo es obligatorio.
                    </small>
                </div>

                {/* Campo de Valoración */}
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">
                        Valoración (Opcional)
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="rating"
                        name="rating"
                        value={form.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        placeholder="Del 1 al 5"
                    />
                </div>

                {/* Botón de Enviar */}
                <button type="submit" className="btn btn-primary">
                    Enviar
                </button>
            </form>
        </div>
    );
}
