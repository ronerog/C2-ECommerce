'use client';
import styles from "./menuTop.css";
import React, { useState } from "react";

export const MenuTop = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <div className="topnav">
            {isLoggedIn ? (
                <a href="#logout" onClick={handleLogin}>Sair</a>
            ) : (
                <a className="active" href="#login" onClick={handleLogin}>Entrar</a>
            )}
            <a href="#news">Planos e Preços</a>
            <a href="#contact">Contato</a>
            <a href="#about">Sobre</a>
        </div>
    );
}