import React from "react";
import "./style.css";
export default function Rating({ totalStars = 5, rating }) {
    return (
        <div className="d-flex justify-content-center mt-3">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <svg
                        key={index}
                        className={`w-6 h-6 ${
                            starValue <= rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.175 3.622a1 1 0 00.95.69h3.8c.969 0 1.371 1.24.588 1.81l-3.073 2.23a1 1 0 00-.364 1.118l1.176 3.622c.3.921-.755 1.688-1.539 1.118l-3.073-2.23a1 1 0 00-1.176 0l-3.073 2.23c-.784.57-1.838-.197-1.539-1.118l1.176-3.622a1 1 0 00-.364-1.118L2.49 9.05c-.783-.57-.38-1.81.588-1.81h3.8a1 1 0 00.95-.69l1.175-3.623z" />
                    </svg>
                );
            })}
        </div>
    );
}
