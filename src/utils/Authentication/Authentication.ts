import Cookies from "universal-cookie";
import { NavigateFunction } from "react-router-dom";

const cookies = new Cookies();

export const redirectBasedOnRole = (navigate: NavigateFunction) => {
  const role = cookies.get("role"); // Assuming the role is stored in cookies

  switch (role) {
    case "USER":
      navigate("/dashboard"); // Redirect to client dashboard
      break;
    case "MERCHANT":
      navigate("/merchant"); // Redirect to merchant dashboard
      break;
    case "ADMIN":
      navigate("/admindashboard"); // Redirect to admin dashboard (if applicable)
      break;
    default:
      navigate("/"); // Redirect to home or login if no role is found
      break;
  }
};
export const roleBasedProfileRouting=(navigate: NavigateFunction)=>{
  switch(cookies.get("role")){
    case "USER":
      navigate("/profile");
      break;
    case "MERCHANT":
      navigate("/profile");
      break;
    case "ADMIN":
      navigate("/adminprofile");
      break;
  }
}