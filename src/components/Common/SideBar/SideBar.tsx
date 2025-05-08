import React, { } from 'react'
import styles from './sideBar.module.css'
// import MenuItems from './menuItem/MenuItem';
type SideBarProps = {
  children: React.ReactNode
  className?: string
}
const SideBar:React.FC<SideBarProps>=({className,children})=>{

  return (
    <div className={`${styles.container} items-center justify-center pr-8 ${className}`}>
     {children}
    </div>
  )
}
export default SideBar;