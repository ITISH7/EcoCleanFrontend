import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import "./global.css";
import Footer from "./components/Common/Footer/Footer";
export default function App() {
  return (
      <>
      <Header/>
      <Outlet/>
      <Footer/>
      </>
  );
}
