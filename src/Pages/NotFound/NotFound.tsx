import { Link } from "react-router-dom";
import image404 from "@/assets/images/404page.gif"
const NotFound:React.FC=()=>{
    return(
        <div className="items-center justify-center flex flex-col h-screen">
            <h1 className=" font-bold text-2xl md:text-4xl">OOPS! Page Not Found</h1>
            <img src={image404} alt="404 page" />
            <Link to="/" className="underline font-bold">Return to Home page</Link>
        </div>
    )
}
export default NotFound