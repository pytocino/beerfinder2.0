import { useState } from "react";

export default function BeerFinder({ beerNames }) {
    const [selectedBeer, setSelectedBeer] = useState("");

    const handleChange = (event) => {
        setSelectedBeer(event.target.value);
    };

    const handleReset = () => {
        setSelectedBeer("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = route("beerlocals.index");
        window.location.href = `${url}?name=${encodeURIComponent(
            selectedBeer
        )}`;
    };

    return (
        <div className="my-4">
            <form
                className="text-white text-center form form-control text-center bg-dark"
                onSubmit={handleSubmit}
            >
                <label
                    htmlFor="name"
                    className="form-label fw-semibold display-5 my-3"
                >
                    ¿QUÉ CERVEZA TE APETECE?
                </label>
                <select
                    className="form-select my-2"
                    id="name"
                    name="name"
                    value={selectedBeer}
                    onChange={handleChange}
                    required
                >
                    <option value="">Escoge una</option>
                    {beerNames.map((beername) => (
                        <option key={beername.name} value={beername.name}>
                            {beername.name}
                        </option>
                    ))}
                </select>
                <button
                    type="reset"
                    className="btn btn-danger fw-semibold my-2"
                    onClick={handleReset}
                >
                    Borrar
                </button>
                <button
                    type="submit"
                    className="btn btn-success fw-semibold my-2"
                >
                    ENCUÉNTRALA
                </button>
            </form>
        </div>
    );
}
