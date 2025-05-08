import React, { useEffect } from "react";
import SideBar from "@/components/Common/SideBar/SideBar";
import {Outlet} from 'react-router-dom';
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { AdminMenuItemData } from "@/components/Common/SideBar/adminMenuItem/adminMenuItemdata";
import AdminMenuItems from "@/components/Common/SideBar/adminMenuItem/adminMenuItem";

const AdminDashboard: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);  
  const navigate = useNavigate()
  const cookies = new Cookies();
  const handlActiveindex = (index:number)=>{
    setActiveIndex(index);
    if(AdminMenuItemData[index].link){
    navigate(AdminMenuItemData[index].link);
    }
    else if(AdminMenuItemData[index].label=="Logout"){
      cookies.remove("token");
      cookies.remove("role");
      navigate("/");
    }
  }
  useEffect(()=>{
    if(!cookies.get("token") && cookies.get("role")!=="ADMIN"){
      cookies.remove("token");
      cookies.remove("role");
      navigate("/loginandsignup/login");
    }
  },[])
  return (
    <div className='flex pt-24'>
      <SideBar className="hidden lg:block">
      {AdminMenuItemData.map((item,index)=>{ return <AdminMenuItems key={index} icon={item.icon} isactive={index==activeIndex} label={item.label} onClick={()=>handlActiveindex(index)} activeicon={item.activeicon}/> }) }
      </SideBar>
      <Outlet/>
    </div>
  );
};

export default AdminDashboard;
