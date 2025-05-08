import React from "react"
import { Outlet } from "react-router-dom"
import styles from "@/Pages/LoginAndSignUp/LoginandSignup.module.css"
import { DisplayImage } from "@/components/Common/DisplayImage/DisplayImage"

const LoginAndSignup:React.FC=()=>{
    
    return(
            <div className="flex justify-around sm: md:flex-wrap lg:flex-wrap xl:flex-wrap pt-30">
                <div className="max-md:w-0">
                    <DisplayImage className={`${styles.heroImage} invisible md:visible`} />
                </div>
                <div className={`${styles.interactive} w-170`}>
                    <div >
                        <div className="self-center ">
                            <p style={{justifySelf:"center",fontSize: 25, fontFamily: "var(--poppins-regular)" }} >Welcome to <span style={{color:"var(--Secondary-green)"}} >EcoClean</span></p>
                            
                        </div>
                        
                        <Outlet />
                    </div>
                </div>
            </div>
    )
}
export default LoginAndSignup