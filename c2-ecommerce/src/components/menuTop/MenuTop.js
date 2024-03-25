'use client';
import styles from "./menuTop.css";
import React, { useState } from "react";
import Link from 'next/link'
import img from "../../../public/img-pass.jpg"
import Image from "next/image";

export const MenuTop = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <div className="topnav">
            
            <Image
                src={img}
                width={30} 
                height={30}
                alt="Picture of the author"
                /> 
            
            <Link href="/">Planos e Precos</Link>
            <a href="#contact">Contato</a>
            <a href="#about">Sobre</a>
            <Link href="/login">Faça seu Login</Link>
        </div>
    );
}