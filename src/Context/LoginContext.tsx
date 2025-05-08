import { createContext, ReactNode, useState } from "react";
type ContextType={
    isLoginPage:boolean,
    isLoggedIn:boolean,
    setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    }
export const LoginPageContext = createContext<ContextType|null>(null);

type ProviderType={
    children:ReactNode
}
export const LoginPageContextProvider:React.FC<ProviderType> =({children})=>{
    const [isLoginPage, setIsLoginPage]= useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return(
        <LoginPageContext.Provider value={{isLoginPage,setIsLoginPage,isLoggedIn,setIsLoggedIn}} >
            {children}
        </LoginPageContext.Provider>
    )
}