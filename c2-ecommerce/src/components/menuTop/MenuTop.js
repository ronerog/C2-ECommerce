'use client';
import styles from "./menuTop.css";
import React from "react";

export const MenuTop = () => {
    return (
        <div className="topnav">
        <a className="active" href="#home">Entrar</a>
        <a href="#news">Planos e Precos</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>
    );
  }