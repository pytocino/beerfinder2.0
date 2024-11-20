import React from "react";
import "./style.css";

export default function Pagination({ meta, onPageChange }) {
    if (meta.last_page <= 1) return null;

    const prevLabel = "«";
    const nextLabel = "»";

    return (
        <div className="my-3 flex justify-center">
            {meta.links.map((link, index) => {
                let label = link.label;

                if (label === "&laquo; Previous") {
                    label = prevLabel;
                } else if (label === "Next &raquo;") {
                    label = nextLabel;
                }

                return (
                    <button
                        key={index}
                        onClick={() => onPageChange(link.url)}
                        disabled={!link.url}
                        className={`px-4 py-2 mx-1 rounded-md ${
                            link.active
                                ? "bg-beer text-white"
                                : "bg-dark text-white"
                        }`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
