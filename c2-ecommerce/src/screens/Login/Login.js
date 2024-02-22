'use client';
import styles from "./login.css";
import React from "react";

export const Login = () => {

    function HandleClick() {
        alert('Hello world')}
   
    return (
        <div className="sign-in">
            <div className="div">
                <div className="text-wrapper">Seja bem-viado</div>
                <div className="text-wrapper-2">Faça seu Login</div>
                <input className="overlap" name="email" type="email" placeholder="Email" />
                <input className="overlap-group" name="senha" type="password" placeholder="Senha" />
                <div><button type="button" onClick={HandleClick} className="div-wrapper" >Entrar</button></div>
                <div>
                </div>
                <div className="SingUp">
                    <span className="span">Nao tem conta ainda?</span>
                    <a href="google.com" className="text-wrapper-6"> Registre-se</a>
                </div>
            </div>
            
            
        </div>
    );
}