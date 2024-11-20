import { Link } from "@inertiajs/react";
import "./style.css";

export default function NavButton({
    routeName,
    children,
    className,
    scrollTop = false,
}) {
    const handleClick = () => {
        if (scrollTop) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    return (
        <Link
            href={scrollTop ? null : route(routeName)}
            className={className}
            onClick={handleClick}
        >
            {children}
        </Link>
    );
}
