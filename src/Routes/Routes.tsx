import App from "@/App";
import CheckCurrentPrice from "@/Pages/Dashboard/children/CheckCurrentPrice";
import FaqAndCompaints from "@/Pages/Dashboard/children/FaqAndCompaints";
import MyDashboard from "@/Pages/Dashboard/children/ClientDashboard";
import Myschedule from "@/Pages/Dashboard/children/Myschedule";
import Orderdetails from "@/Pages/Dashboard/children/Orderdetails";

import PickupHistory from "@/Pages/Dashboard/children/PickupHistory";
import ConfirmOrderDetails from "@/Pages/Dashboard/children/SchedulePickup/Confirmdetails";
import SchedulePickup from "@/Pages/Dashboard/children/SchedulePickup/SchedulePickup";
import SuccessPage from "@/Pages/Dashboard/children/SchedulePickup/SuccessPage";
import UploadJunkDetails from "@/Pages/Dashboard/children/SchedulePickup/UploadJunkDetails";
import TrackOngoingPickup from "@/Pages/Dashboard/children/TrackOngoingPickup/TrackOngoingPickup";

import Dashboard from "@/Pages/Dashboard/Dashboard";
import Home from "@/Pages/Home/Home";
import ForgotPassword from "@/Pages/LoginAndSignUp/ForgotPassword";
import Login from "@/Pages/LoginAndSignUp/Login";
import LoginAndSignup from "@/Pages/LoginAndSignUp/LoginAndSignUp";
import Register from "@/Pages/LoginAndSignUp/Register";
import { MerchantMainDashBoard } from "@/Pages/MerchantDashboard/children/MerchantMainDashBoard";
import { MerchantDashBoard } from "@/Pages/MerchantDashboard/MerchantDashBoard";
import NotFound from "@/Pages/NotFound/NotFound";
import ManageAddress from "@/Pages/Profile/children/ManageAddress";
import Myprofile from "@/Pages/Profile/children/Myprofile";
import UpdatePassword from "@/Pages/Profile/children/UpdatePassword";
import Profile from "@/Pages/Profile/Profile";
import TermsAndConditions from "@/Pages/TermsAndConditions/TermsAndConditions";
import AdminDashboard from "@/Pages/AdminPages/AdminDashboard/AdminDashboard";
import MyAdminDashboard from "@/Pages/AdminPages/AdminDashboard/children/MyAdminDashboard";
import ManageClients from "@/Pages/AdminPages/AdminDashboard/children/clients";
import ManageMerchants from "@/Pages/AdminPages/AdminDashboard/children/merchants";
import ManageBlockedUsers from "@/Pages/AdminPages/AdminDashboard/children/blockedUsers";
import ManageJunkItems from "@/Pages/AdminPages/AdminDashboard/children/junkItems";
import ManageOrders from "@/Pages/AdminPages/AdminDashboard/children/orders";
import OrderDetails from "@/Pages/AdminPages/AdminDashboard/children/orderDetails";
import UpdateJunkItem from "@/Pages/AdminPages/AdminDashboard/children/updateJunkItem";
import CreateNewJunkItem from "@/Pages/AdminPages/AdminDashboard/children/createNewJunkItem";
import BlockedUserProfile from "@/Pages/AdminPages/AdminDashboard/children/blockedUserProfile";
import MerchantProfile from "@/Pages/AdminPages/AdminDashboard/children/merchantProfile";
import ClientProfile from "@/Pages/AdminPages/AdminDashboard/children/clientProfile";
import { AvailableOrders } from "@/Pages/MerchantDashboard/children/AvailableOrders";
import { AppliedOrders } from "@/Pages/MerchantDashboard/children/AppliedOrders";
import { MerchantOrderDetails } from "@/Pages/MerchantDashboard/children/MerchantOrderDetails";
import ProtectedRoute from "@/Routes/ProtectedRoutes";
import PendingOrders from "@/Pages/Dashboard/children/PendingOrders";
import { ViewMerchants } from "@/Pages/Dashboard/children/ViewMerchants/ViewMerchants";

import { createBrowserRouter } from "react-router-dom";
import AdminProfile from "@/Pages/AdminPages/AdminProfile/AdminProfile";
import MyAdminProfile from "@/Pages/AdminPages/AdminProfile/children/MyAdminProfile";
import TestPage from "@/Pages/AdminPages/TestPAge/TestPage";

import Chat from "@/components/chat/Chat";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { index: true, element: <Home /> },
      {
        path:"chat",
        element:<Chat/>
      },
      {
        path: "/loginandsignup",
        element: <LoginAndSignup />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      {
        path: "/dashboard",
        element:(<ProtectedRoute allowedRoles={["USER"]}>
           <Dashboard />
        </ProtectedRoute>) 
       
        ,
        children: [
          {
            index: true,
            element: <MyDashboard />,
          },
          {
            path: "faq",
            element: <FaqAndCompaints />,
          },
          
          {
            path: "checkprice",
            element: <CheckCurrentPrice />,
          },
          {
            path: "myschedule",
            element: <Myschedule/>,
          },
          {
            path: "viewhistory",
            element: <PickupHistory />,
          },
          {
            path: "orderdetails/:id",
            element: <Orderdetails />,
          },
          {
            path: "pendingOrders",
            element: <PendingOrders/>
          },
          {
            path: "/dashboard/pendingorders/:id",
            element: <ViewMerchants/>
          },
          {
            path: "schedulepickup",
            element: <SchedulePickup />,
            children:[
              {
                index:true,
                element:<UploadJunkDetails/>,
              },
              {
                path:"selectAddress",
                element:<ManageAddress selectaddress={true}/>,
              },
              {
                path:"confirmDetails",
                element:<ConfirmOrderDetails/>
              },
              {
                path:"success",
                element:<SuccessPage/>
              }
            ]
          },
          {
            path:"track",
            element:<TrackOngoingPickup/>
          }
          
        ],
      },
       {path: "/profile",
        element: <ProtectedRoute allowedRoles={["USER", "MERCHANT"]}>
        <Profile />
      </ProtectedRoute>,
        children:[
          {index:true,
            element:<Myprofile/>
          },{
            path:"manageaddress",
            element:<ManageAddress/>
          },{
              path:"updatepassword",
              element:<UpdatePassword/>
            
          }
        ]
      },
      {
        path:"merchant",
        element: <ProtectedRoute allowedRoles={["MERCHANT"]}>
        <MerchantDashBoard />
      </ProtectedRoute>,
        children:[
          {
            index:true,
            element:<MerchantMainDashBoard/>
          },
          {
            path:"/merchant/available-orders",
            element:<AvailableOrders/>
          },
          {
            path:"/merchant/applied-orders",
            element:<AppliedOrders/>
          },
         
          {
            path:"/merchant/apply-order/:id/:amount",
            element:<MerchantOrderDetails/>
          },
          {
            path:"/merchant/applied-order/:id/:amount",
            element:<MerchantOrderDetails/>
          }
          ,
          {
            path:"check-current-rates",
            element:<CheckCurrentPrice/>
          }
        ]  
      },{      
        path:"/admindashboard",
        element: <AdminDashboard />,
        children:[
          {
              index: true,
              element: <MyAdminDashboard />,
          },
          {
            path:"clients",
            element: <ManageClients/>
          },
          {
            path:"clients/:email",
            element: <ClientProfile/>
          },
          {
            path:"merchants",
            element: <ManageMerchants/>
          },
          {
            path:"merchants/:email",
            element: <MerchantProfile/>
          },
          {
            path:"blockedusers",
            element: <ManageBlockedUsers/>
          },
          {
            path:"blockedusers/:email",
            element: <BlockedUserProfile/>
          },
          {
            path:"junkitems",
            element: <ManageJunkItems/>
          },
          {
            path:"junkitems/:id",
            element: <UpdateJunkItem/>
          },
          {
            path:"junkitems/createnewjunk",
            element: <CreateNewJunkItem/>
          },
          {
            path:"orders",
            element: <ManageOrders/>
          },
          {
            path: "orderdetails/:id",
            element: <OrderDetails />,
          },
        ]
      },
      {path: "/adminprofile",
        element: <AdminProfile />,
        children:[
          {index:true,
            element:<MyAdminProfile/>
          },
          {
            path:"updatepassword",
            element:<UpdatePassword/>
          }
        ]
      },
      {
        path:"/testpage",
        element:<TestPage/>
      },
      {
        path:"/tnc",
        element:<TermsAndConditions/>
      },
      { path: "/forgotpassword", element: <ForgotPassword /> },
      { path: "/*", element: <NotFound /> },
    ],
  },
]);
