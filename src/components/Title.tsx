import React from 'react'
type title={
    title:string
    className?:string
}
const Title:React.FC<title>=({title,className})=>{
  return (
    <h1 className={`font-medium  text-[38px] mt-6  ${className||"mx-7"}`}>{title}</h1> 
  )
}
export default Title;