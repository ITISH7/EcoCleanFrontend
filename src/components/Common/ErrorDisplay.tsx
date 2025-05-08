import React from 'react'
import image404 from "@/assets/images/404page.gif"

interface ErrorDisplayProps {
  errorMsg: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMsg }) => {
  return (
    <div className="items-center justify-center flex flex-col h-screen">
  <h1 className=" font-bold text-2xl md:text-4xl">{errorMsg}</h1>
  <img src={image404} alt="404 page" />
  </div>
  )
}
