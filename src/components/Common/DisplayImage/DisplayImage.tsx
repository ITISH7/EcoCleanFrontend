import React from 'react'
import heroImage from "@/assets/images/hero.svg";
import styles from "./displayImage.module.css";
type DisplayImageProps = {
    src?:string;
    className?:string;
}
export const DisplayImage:React.FC<DisplayImageProps> = ({src,className}) => {
  return (
    <img src={src ? src : heroImage} className={`${styles.heroImage} ${className}`} alt="hero image" />
  )
}
