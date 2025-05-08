import styles from "./Button.module.css"
import React from "react"

type ButtonType ={
    button_type?:"submit"|"button"|"reset",
    label?:string,
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=> void,
    className?: string,
    disabled?:boolean,
    children?:React.ReactNode,
}

const Button:React.FC<ButtonType> =({
    button_type = "button",
    label,
    onClick,
    className,
    disabled = false,
    children,
    
  })=>{
    return <button className={className?`${styles.button} ${className}`:`${styles.button}`} onClick={onClick} type={button_type} disabled={disabled}>{children || label}</button> 
}
export default Button