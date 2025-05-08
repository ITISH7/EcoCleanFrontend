import MenuItems from "@/components/Common/SideBar/menuItem/MenuItem"
import { MerchantMenuItemData } from "@/components/Common/SideBar/merchantMenuItems/menchantMenuItems"
import SideBar from "@/components/Common/SideBar/SideBar"
import React from "react"
import { Outlet, useNavigate } from "react-router-dom"


export const  MerchantDashBoard:React.FC= () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    
  const navigate = useNavigate()
  const handlActiveindex = (index:number)=>{
    setActiveIndex(index);
    if(MerchantMenuItemData[index].link){
    navigate(MerchantMenuItemData[index].link);
    }
  }
  return (
    <div className="flex pt-24">
        <SideBar className="hidden lg:block">
            {MerchantMenuItemData.map((item,index)=>{ return <MenuItems key={index} icon={item.icon} isactive={index==activeIndex} label={item.label} onClick={()=>handlActiveindex(index)} activeicon={item.activeicon}/> }) }
        </SideBar>
        <Outlet/>
    </div>
  )
}
