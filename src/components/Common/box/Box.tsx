import React from "react"

interface BoxProps{
    children?:React.ReactNode,
    className?:string
}
const Box:React.FC<BoxProps>=({children,className})=>{
  return (
    <div className={`box-border h-[70%] mt-1 bg-white border border-black rounded-[25px] md:mt-4 md:w-[97%]  mb-16 md:h-[90%] pt-4 pb-8 scrollbar-visible ${className}`}>
    {children}
    </div>
  )
}
export default Box;
/* Rectangle 4360 */

