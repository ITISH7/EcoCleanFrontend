import { useNavigate } from "react-router-dom"
import Button from "@/components/Common/UI/Button/Button";
import styles from "./Slider.module.css"
import { useContext, useEffect } from "react";
import { LoginPageContext } from "@/Context/LoginContext";

const Slider:React.FC=()=>{
    const navigate = useNavigate();
    const contextState= useContext(LoginPageContext);
    
    useEffect(() => {
        if (contextState?.isLoginPage) {
            navigate("/loginandsignup/login");
        }
    }, []);

    const handleLogin = ()=>{
        contextState===null ? null :contextState.setIsLoginPage(true);
        navigate("/loginandsignup/login");

    }
    const handleRegister = ()=>{
        contextState===null ? null :contextState.setIsLoginPage(false);
        navigate("/loginandsignup/register");
    }
    return(
        <div className={`${styles.slider}`}>
                <Button className={contextState===null ? "" :contextState.isLoginPage?styles.active:""} onClick={handleLogin} label="Login" />
                <Button className={contextState===null ? "" :contextState.isLoginPage?"":styles.active} onClick={handleRegister} label="Register" />
        </div>
    )
}
export default Slider