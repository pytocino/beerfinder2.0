import { Link } from "@inertiajs/react";
import ApplicationLogo from "./ApplicationLogo";
import NavButton from "./NavButton/NavButton";

export default function Header({ auth = {} }) {
    return (
        <header className="bg-beer sticky-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center align-items-center">
                            <Link href="/">
                                <ApplicationLogo className="my-3" />
                            </Link>
                            {auth.user ? (
                                <NavButton
                                    routeName="dashboard"
                                    className="button-dashboard d-none d-lg-block position-absolute top-50 end-0 translate-middle-y mr-2"
                                >
                                    Dashboard
                                </NavButton>
                            ) : (
                                <NavButton
                                    routeName="login"
                                    className="button-dashboard d-none d-lg-block position-absolute top-50 end-0 translate-middle-y mr-2"
                                >
                                    Login
                                </NavButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
