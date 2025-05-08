import React, { useEffect, useRef } from "react";
import HeroSection from "@/components/HeroSection/HeroSection";
import LandingDetails from "@/components/LandingDetails/LandingDetails";
import BenefitsSection from "@/components/BenifitsSection/BenefitsSection";
import GettingStarted from "@/components/GetStartedSection/GettingStarted";
import Cookies from "universal-cookie";
import { setIsLogout } from "@/slice/loginSlice";
import { useDispatch } from "react-redux";
const Home: React.FC=()=> {
  const getStartedRef = useRef<HTMLDivElement>(null);
  const LandingDetailsRef = useRef<HTMLDivElement>(null);
  const cookies = new Cookies();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!cookies.get("token")){
      dispatch(setIsLogout());
    }
  },[])
  return (
    <div className="mx-3">
    <HeroSection scrollToGetStarted={()=>{ getStartedRef.current?.scrollIntoView({ behavior: "smooth" })}} scrollToLandingDetails ={()=>{LandingDetailsRef.current?.scrollIntoView({behavior:"smooth"})}}/>
    <LandingDetails ref={LandingDetailsRef}/>
    <BenefitsSection/>
    <GettingStarted ref={getStartedRef}/>
    </div>
  )
}
export default Home;    
