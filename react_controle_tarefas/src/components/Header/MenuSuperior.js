import React, { useState } from "react";


const MenuSuperior = () => {
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);

    const toggleLoginDropdown = () => {
        setLoginDropdownOpen(!loginDropdownOpen);
    };

    const closeLoginDropdown = () => {
        setLoginDropdownOpen(false);
    };

    const toggleMenuDropdown = () => {
        setMenuDropdownOpen(!menuDropdownOpen);
    };

    const closeMenuDropdown = () => {
        setMenuDropdownOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-sm bg-success navbar-dark sticky-top">
            <div className="container">
                <div className="navbar-brand">
                    Controle Pessoal de Tarefas
                </div>

                <div className={`dropdown ${loginDropdownOpen ? "show" : ""}`}
                    onClick={toggleLoginDropdown}
                >
                    <a
                        className="nav-link dropdown-toggle"
                        href="Login"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded={loginDropdownOpen}
                    >
                        Login
                    </a>
                    
                    <form className="dropdown-menu p-4">
                        <div class="mb-3">
                            <label for="exampleDropdownFormEmail2" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com"/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleDropdownFormPassword2" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleDropdownFormPassword2" placeholder="Password"/>
                        </div>
                        <div class="mb-3">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="dropdownCheck2"/>
                                    <label class="form-check-label" for="dropdownCheck2">
                                        Remember me
                                    </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Sign in</button>
                    </form>
                </div>

                <ul className="navbar-nav">
                    <li
                        className={`nav-item dropdown ${menuDropdownOpen ? "show" : ""}`}
                        onClick={toggleMenuDropdown}
                    >
                        <a
                            className="nav-link dropdown-toggle"
                            href="menu"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded={menuDropdownOpen}
                        >
                            Menu
                        </a>
                        <div
                            className={`dropdown-menu ${menuDropdownOpen ? "show" : ""}`}
                        >
                            {/* Menu dropdown content */}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default MenuSuperior;
