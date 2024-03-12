'use client';
import styles from "./footer.css";
import Link from 'next/link'
import Image from "next/image";
import img from "../../../public/icon.png"

export const Footer = () => {

    return (
        <>  
          <Image
                src={img}
                width={50} 
                height={50}
                alt="Picture of the author"
                />      
        <p>&copy; 2023 - Todos os direitos reservados</p>
        <nav>
            <ul className="ul-footer">
                <li className="li-footer"><a className="a-footer" href="#">Termos de uso</a></li>
                <li className="li-footer"><a className="a-footer" href="#">Política de privacidade</a></li>
                <li className="li-footer"><a className="a-footer" href="#">Contato</a></li>
                <li className="li-footer"><a className="a-footer" href="#">Sobre nós</a></li>
            </ul>
        </nav>
    </>
    );
}

