import { useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wallet from "@/assets/icons/wallet.svg";
import notification from "@/assets/icons/notification.svg";
import settings from "@/assets/icons/settings.svg";
import user from "@/assets/icons/user.svg";
import hamburgur from "@/assets/icons/hamburgur.svg";
import close from "@/assets/icons/close.svg";
import Cookies from "universal-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navlist, navlistDashboard, navlistProfile } from "./navList";
import { redirectBasedOnRole } from "@/utils/Authentication/Authentication";
import { useDispatch} from "react-redux";
import { setIsLogin } from "@/slice/loginSlice";
import { roleBasedProfileRouting } from "@/utils/Authentication/Authentication";

const Navbar = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const cookiesToken = cookies.get("token");
  

  const handleOnClickLogin = () => {
    navigate("/loginandsignup/login");
    setIsOpen(false);
  };

  const handleOnClickSignUp = () => {
    navigate("/loginandsignup/register");
    setIsOpen(false);
  };

  const handleLogout = () => {
    cookies.remove("token", { path: "/" });
    cookies.remove("role", { path: "/" });
    navigate("/"); 
  };

  const handleDashboardRedirect = () => {
    redirectBasedOnRole(navigate); // Redirect to the appropriate dashboard based on role
  };

  const handleProfileRedirect = () => {
    roleBasedProfileRouting(navigate); // Redirect to the appropriate profile based on role
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  
  useEffect(()=>{
    if(cookies.get("token")){dispatch(setIsLogin());}
  },[])
  const isInDashboard = location.pathname.startsWith("/dashboard");
  const isInProfile = location.pathname.startsWith("/profile");
  const isInHome = location.pathname === "/";
  
  const roleBasedProfileRouting=()=>{
    switch(cookies.get("role")){
      case "USER":
        navigate("/profile");
        break;
      case "ADMIN":
        navigate("/adminprofile");
        break;
    }
  }
  return (
    <nav className={``}>
      {!cookiesToken ? (
        <div className={`hidden lg:block space-x-4 mr-10`}>
          <Button onClick={handleOnClickLogin} label="Login" />
          <Button
            className={``}
            onClick={handleOnClickSignUp}
            label="Sign Up"
          />
        </div>
      ) : (
        <div className="hidden lg:flex space-x-8 mr-20 items-center">
          <button
            onClick={handleDashboardRedirect}
            className="hover:underline font-bold pt-1 cursor-pointer"
          >
            {isInDashboard ? "Home" : "Dashboard"}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
              <img
                src={wallet}
                alt="wallet icon"
                className="focus:outline-none"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>₹0.0/-</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <img
            src={notification}
            alt="notifications icon"
            className="cursor-pointer"
          />
          <img src={settings} alt="settings icon" className="cursor-pointer" />
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
              <img src={user} alt="user icon" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileRedirect}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="lg:hidden pr-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {isOpen ? <img src={close} /> : <img src={hamburgur} />}
        </button>
      </div>
      <div
        className={`max-w-screen-xl mx-auto fixed top-0 right-0 h-full w-64 z-50 bg-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="focus:outline-none"
          >
            <img src={close} />
          </button>
        </div>
        {!cookiesToken ? (
          <div className="p-4 space-y-4">
            <p
              className="hover:underline font-bold cursor-pointer"
              onClick={handleOnClickLogin}
            >
              Login
            </p>
            <p
              className="hover:underline font-bold cursor-pointer"
              onClick={handleOnClickSignUp}
            >
              Register
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            <div className="flex flex-col space-y-4">
              {isInProfile &&
                navlistProfile.map((item, index) => (
                  <>
                    <Link
                      key={index}
                      to={item.link}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="hover:underline font-semibold cursor-pointer"
                    >
                      {item.label}
                    </Link>
                    <hr />
                  </>
                ))}
              {isInHome &&
                navlist.map((item, index) => (
                  <>
                    <Link
                      key={index}
                      to={item.link}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="hover:underline font-semibold cursor-pointer"
                    >
                      {item.label}
                    </Link>
                    <hr />
                  </>
                ))}
              {isInDashboard &&
                navlistDashboard.map((item, index) => (
                  <>
                    <Link
                      key={index}
                      to={item.link}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="hover:underline font-semibold cursor-pointer"
                    >
                      {item.label}
                    </Link>
                    <hr />
                  </>
                ))}
            </div>
            <p
              className="hover:underline font-bold cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        )}
      </div>

      {/* Overlay when Sidebar is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;