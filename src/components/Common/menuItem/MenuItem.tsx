import React from 'react'
import {MenuItem} from "@/utils/constants/MenuItemdata";
const MenuItems:React.FC<MenuItem>= ({ icon, isactive, label="loading" ,onClick ,activeicon,className}) => {
  return (
    <div className={`${className||""}`&&isactive?`${'flex items-center text-seconday-green shadow-lg h-[60px] w-[85%] cursor-pointer mt-4 mx-8  bg-white rounded-lg  hover:text-seconday-green hover:shadow-lg font-primary'}`:'flex items-center   h-[60px] w-[85%] cursor-pointer mt-4 mx-8  bg-white rounded-lg  hover:text-seconday-green hover:shadow-lg hover:font-primary '} onClick={onClick}>
        {isactive&&<div className={'relative  bg-secondary-green h-[80%] w-1.25'}> </div>}
        {isactive&&activeicon&&<img className={isactive?`${'px-2'}`:`${'px-2'}`} src={activeicon} alt="icon"/>}
        {!isactive&&icon&&<img className={isactive?`${'px-2'} ${''}`:`${'px-2'}`} src={icon} alt="icon"/>}
        <div className={isactive?`${'text-secondary-green font-primary-medium font-bold px-2'} ${''}`:`${'px-2'}`}>{label}</div>
    </div>
  )
}
export default MenuItems;
