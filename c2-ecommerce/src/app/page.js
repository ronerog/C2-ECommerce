'use client'
import { MenuTop } from "@/components/menuTop/MenuTop";
import styles from "./page.module.css";
import MyCard from "@/components/Card/Card";
import Carousel from "react-elastic-carousel";

export default function Home() {
  return (
    <>
    <header><MenuTop/></header>
    <main>
      <div className="header-main-text">
      <h1>Planos para você e sua família</h1>
      </div>
      <div className="subtitle-div">
        <div className="subtitle-box">Assinatura dos Planos</div>
      </div>
      <Carousel itemsToShow={3}>
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
        <MyCard />
      </Carousel>
    </main>
    </>
    
  );
}