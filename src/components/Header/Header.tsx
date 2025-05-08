import SearchBar from "../Common/SearchBar/SearchBar";
import styles from "./Header.module.css";
import React from "react";
import Navbar from "@/components/Common/Navbar/Navbar";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
   const location =useLocation();
  return (
    <header className={`${styles.header} h-[10vh] fixed  w-full  bg-white shadow-md top-0 left-0 z-50`}>
      <div className={`${styles.logoAndSearchBar} `}>
        <Link to="/">
          <div className={`${styles.logoContainer} `}>
            <p className={`${styles.logo} text-xl md:text-3xl lg:text-4xl`}>ECOCLEAN</p>
          </div>
        </Link>
        {location.pathname.includes("/dashboard")?<SearchBar />:<></>}
      </div>
      <div>

      <Navbar />
      </div>
    </header>
  );
};

export default Header;
