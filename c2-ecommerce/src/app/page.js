import { MenuTop } from "@/components/menuTop/MenuTop";
import styles from "./page.module.css";
import { Login } from "@/screens/Login/Login";

export default function Home() {
  return (
    <>
    <MenuTop/>
    <Login />
    </>
    
  );
}