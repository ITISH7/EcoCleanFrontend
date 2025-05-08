import React, { useEffect } from "react";
import SideBar from "../../components/Common/SideBar/SideBar";

import {Link, Outlet} from 'react-router-dom';
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { MenuItemData } from "@/components/Common/SideBar/menuItem/MenuItemdata";
import MenuItems from "@/components/Common/SideBar/menuItem/MenuItem";
import { Button } from "@/components/ui/button";
import plus from "@/assets/icons/plus.svg";
const Dashboard: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
    
  const navigate = useNavigate()
  const cookies = new Cookies();
  const handlActiveindex = (index:number)=>{
    setActiveIndex(index);
    if(MenuItemData[index].link){
    navigate(MenuItemData[index].link);
    }
    else if(MenuItemData[index].label=="Logout"){
      cookies.remove("token");
      cookies.remove("role");
      navigate("/");
    }
  }
  useEffect(()=>{
    if(!cookies.get("token")){
      navigate("/loginandsignup/login");
    }
  },[])
  return (
    <div className='flex pt-24'>
      <SideBar className="hidden lg:block">
      {MenuItemData.map((item,index)=>{ return <MenuItems key={index} icon={item.icon} isactive={index==activeIndex} label={item.label} onClick={()=>handlActiveindex(index)} activeicon={item.activeicon}/> }) }
      <div className="flex flex-col p-5 items-center">
        <hr/>
        <Link to="/dashboard/schedulepickup">
        <Button className=" flex-col mt-5  h-auto bg-secondary-green text-white w-[100%] rounded-2xl text-[20px] hover:bg-primary-green p-4">
          <img src={plus} alt="plus icon" className="mr-2"/>
          <p>Schedule new pickup</p>
          </Button>
        </Link>
      </div>
        </SideBar>
      <Outlet/>
    </div>
  );
};

export default Dashboard;
