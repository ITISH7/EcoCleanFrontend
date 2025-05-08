import { Link, useNavigate } from "react-router-dom";
import TextInput from "@/components/Common/UI/TextInput/TextInput";
import Button from "@/components/Common/UI/Button/Button";
import styles from "@/Pages/LoginAndSignUp/LoginandSignup.module.css";
import { ChangeEvent, FormEvent, useEffect, useReducer, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLoginUser } from "@/utils/api/authenticationController/authenticateUser";
import { validateLoginFields } from "@/utils/FormValidations";
import { LoginFormState } from "./Interfaces";
import Cookies from "universal-cookie";
import { toast } from "sonner";
import axios from "axios";
import { redirectBasedOnRole } from "@/utils/Authentication/Authentication";
import { useDispatch } from "react-redux";
import { setIsLogin } from "@/slice/loginSlice";

 const initialState:LoginFormState={
  email:"",
  password:"",
 }
 const formReducer=(state:LoginFormState, action:{type:string, payload:string})=>{
  switch(action.type){
    case 'email': return {...state, email:action.payload}
    case 'password': return {...state, password:action.payload}
    case 'reset': return initialState
    default : return state
  }

 }
const Login: React.FC = () => {
  const [ishidden, setIsHidden] = useState(true);
  const [isRemembered, setIsRemembered] = useState(false)
  const[formState,dispatch]=useReducer(formReducer,initialState);
  const [errors,setErrors]=useState<{[key:string]:string}>({});
  const {mutate:loginUser}= useLoginUser();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatchLogin = useDispatch();
  
  useEffect(()=>{
    if(cookies.get("email") && cookies.get("password")){
      dispatch({type:"email",payload:cookies.get("email")});
      dispatch({type:"password",payload:cookies.get("password")});
    }
  },[])
  const togglePassword = () => {
    setIsHidden(!ishidden); 
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch({ type: e.target.name, payload: e.target.value });
    setErrors({...errors, [e.target.name]:""});
  };
  const roleBasedRouting=()=>{
    switch(cookies.get("role")){
      case "USER":
        navigate("/dashboard");
        break;
      case "ADMIN":
        navigate("/admindashboard");
        break;
      default:
        navigate("/loginandsignup/login");
    }
  }
  const handleSubmit= async (e:FormEvent<HTMLFormElement>)=>{
          e.preventDefault();
          const validationErrors = validateLoginFields(formState);
          if (Object.keys(validationErrors).length === 0) {      
            const data={
              email: formState.email,
              password: formState.password 
            }    
            loginUser( data,{
              onSuccess:()=>{
                dispatch({type:"reset",payload:""});
                dispatchLogin(setIsLogin());
                dispatchLogin(setIsLogin());
                toast.success("Welcome back");
                redirectBasedOnRole(navigate);
                if(isRemembered){
                  let expiry = new Date();
                  expiry.setDate(expiry.getDate()+1);
                  cookies.set("email",formState.email,);
                  cookies.set("password",formState.password,{expires:expiry}); 
                }
              },
              onError: (error) => {
                if (axios.isAxiosError(error)) {
                  if (error.response?.status === 400) {
                    toast.error("Incorrect Email or password! Please re-enter Credentials!");
                    dispatch({ type: "reset", payload: "" });
                  } else {
                    toast.error(`Error during Login: ${error.response?.data?.message || "Something went wrong"}`);
                    dispatch({ type: "reset", payload: "" });
                  }
                } else {
                  toast.error(`Error during Login: ${error.message || "Something went wrong"}`);
                  dispatch({ type: "reset", payload: "" });
                }
              }
              
            })
          } else {
            setErrors(validationErrors);
          }
       }    

  return (
    <form onSubmit={handleSubmit}> 
      <div  className="sm:justify-items-end">
        <div className="sm:w-[80%] mt-10 mb-10">  
          <p className={`${styles.headings} w-full`}>Log in to manage your junk, track pickups, and contribute to a greener planet.</p>
          <div className="mt-5">
            <h3 className={`${styles.headings}`}>Email</h3>
            <TextInput name ="email" placeholder="Enter your Email" onChange={handleChange} value={formState.email}/>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
            <div className="mt-5">
            <h3 className={`${styles.headings}`} >Password</h3>
            <div className={`${styles.PasswordDiv}`}>
              <TextInput name ="password"
                className={`${styles.PasswordInput}`}
                input_type={ishidden ? "password" : "text"}
                placeholder="Enter your Password" onChange={handleChange}
                value={formState.password}
              />
              <Button className={`${styles.Eye}`} onClick={togglePassword}>
                {ishidden ? <VisibilityOff /> : <Visibility />}
              </Button>
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div className={`${styles.rememberForgot} mt-5`}>
            <label><input type="checkbox" onClick={()=>{setIsRemembered(true)}}/> Remember me</label>
            <span>
              <Link to="/loginandsignup/login/forgotpassword" >Forgot password</Link>
            </span>
          </div>
        </div>

      <div className={`${styles.login}`}>
          <Button button_type="submit" label="Login" />
      </div>
    </div>
    </form>
  );
};

export default Login;
