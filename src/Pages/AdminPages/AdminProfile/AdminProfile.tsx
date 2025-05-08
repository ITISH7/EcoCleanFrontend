import MenuItems from "@/components/Common/menuItem/MenuItem"
import SideBar from "@/components/Common/SideBar/SideBar";
import { adminProfileMenuItemData } from "@/utils/constants/MenuItemdata";
import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const Profile:React.FC=() =>{
  const [activeIndex, setActiveIndex] = React.useState(0);
  const navigate = useNavigate()
  const cookies = new Cookies();
  const handlActiveindex = (index:number)=>{
    setActiveIndex(index);
    if(adminProfileMenuItemData[index].link){
    navigate(adminProfileMenuItemData[index].link);
    }
    else if(adminProfileMenuItemData[index].label=="Logout"){
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
    
    <div className="flex pt-24 w-[100vw]">
      <SideBar className="hidden lg:block ">
      { adminProfileMenuItemData.map((item,index)=>{ return (<MenuItems key={index}  isactive={index==activeIndex} label={item.label} onClick={()=>handlActiveindex(index)} />) }) }
      </SideBar>
      <Outlet/>
    </div>
  )
}
export default Profile;
