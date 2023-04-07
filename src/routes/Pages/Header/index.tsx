import React from "react";
import "./style.css";
import logo from ".//..//Header/DsCatalog.png";
import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <nav className="navbar">
            <img src={logo} className={`imagemlogo`} />
            <div className="container">
                <NavLink
                    to="/"
                    className={({ isActive }: any) =>
                        isActive ? "active" : "disabled" }
                >
                    HOME
                </NavLink>
                <NavLink to="/catalogo"  className={({ isActive }: any) =>
                        isActive ? "active" : "disabled" } >
                    CATÁLOGO
                </NavLink>
                <NavLink to="/admin"  className={({ isActive }: any) =>
                        isActive ? "active" : "disabled" } >
                    ADMIN
                </NavLink>
            </div>
        </nav>
    );
}


