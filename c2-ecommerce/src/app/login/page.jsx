'use client';
import styles from "./login.css";
import React from "react";
import { MenuTop } from '@/components/menuTop/MenuTop';
import { Footer } from '@/components/Footer/Footer'
import img from "../../../public/img-pass.jpg"
import Link from 'next/link'
import Image from "next/image";
import { useRouter } from 'next/navigation'

export default function Login() {

    const router = useRouter()

    function HandleClick() {
        router.push('/homepage')
    }
   
    return (
        <>
        <header>
        <MenuTop />
        <MenuTop />
        <MenuTop />
        <MenuTop />
        </header>
        <div className="sign-in">
            <div className="div">
            <Image
                src={img}
                width={70} 
                height={70}
                alt="Picture of the author"
                />    
                <div className="text-wrapper">Seja bem-vindo</div>
                <div className="text-wrapper-2">Faça seu Login</div>
                <input className="overlap-group" name="email" type="email" placeholder="Email" />
                <input className="overlap-group" name="senha" type="password" placeholder="Senha" />
                <div><button type="button" onClick={HandleClick} className="div-wrapper" >Entrar</button></div>
                <div>
                </div>
                <div className="SingUp">
                    <span className="span">Nao tem conta ainda?</span>
                    <Link className="text-wrapper-6" href="/register"> Registre-se</Link>
                </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
            </>
    );
}