import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function OpinionForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
        rating: "",
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Función para manejar cambios en el formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    // Función para establecer una cookie
    const setCookie = (name, value, maxAge) => {
        document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; Secure; SameSite=Strict`;
    };

    // Envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar campos
        if (!form.message.trim()) {
            setError("El mensaje es obligatorio.");
            return;
        }

        // Enviar datos usando Inertia
        Inertia.post(
            "/opinions",
            {
                ...form,
                name: form.name || "Anónimo",
                email: form.email || "Anónimo",
            },
            {
                onSuccess: () => {
                    setSuccess(true);
                    setError(""); // Limpiar mensajes de error
                    setCookie("cookie_opinion", "1", 30 * 24 * 60 * 60); // Guardar cookie
                    setForm({ name: "", email: "", message: "", rating: "" }); // Reiniciar formulario
                },
                onError: (errors) => {
                    console.error(errors);
                    setError(
                        "Hubo un problema al enviar la opinión. Intenta nuevamente."
                    );
                },
            }
        );
    };

    return (
        <div className="container p-3">
            <h2 className="text-center mb-4">¡Tu opinión es importante!</h2>

            {/* Mensaje de éxito */}
            {success && (
                <div className="alert alert-success text-center" role="alert">
                    ¡Opinión enviada con éxito! 🎉
                </div>
            )}

            {/* Mensaje de error */}
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
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
                        placeholder="Escribe tu nombre o déjalo vacío"
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
                        placeholder="ejemplo@correo.com"
                    />
                </div>

                {/* Campo de Mensaje */}
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                        Mensaje <span className="text-danger">*</span>
                    </label>
                    <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="Escribe tu opinión o sugerencia"
                        rows="4"
                    ></textarea>
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
                        max="10"
                        placeholder="Valor del 1 al 10"
                    />
                </div>

                {/* Botón de Enviar */}
                <button type="submit" className="btn btn-primary w-100">
                    Enviar
                </button>
            </form>
        </div>
    );
}
