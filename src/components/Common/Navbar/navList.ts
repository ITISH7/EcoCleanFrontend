
type navListItems={
    link:string;
    label:string;
}
export const navlistHome:navListItems[]=[
    {
        link:"/",
        label:"Home"
    },
    {
      link:"/dashboard",
      label:"Dashboard"  
    },
]
export const navlistDashboard:navListItems[]=[
    {
        link:"/",
        label:"Home"
    },
    {
        link:"/profile",
        label:"Profile"
    },
    {
        link:"/dashboard/shedulePickup",
        label:"Shedule Pickup"
    },
    {
        link:"/dashboard/track",
        label:"track ongoing pickup"
    }
    ,{
        link:"/dashboard/pickupHistory",
        label:"pickup history"
    },{
        link:"/dashboard/checkCurrentPrices",
        label:"check current prices"
    }
]
export const navlistProfile:navListItems[]=[
    {
        link:"/",
        label:"Home"
    },
    {
      link:"/dashboard",
      label:"Dashboard"  
    },
    {
        link:"/profile",
        label:"Profile"
    },
    {
        link:"/profile/manageaddress",
        label:"Manage Address"
    },
    {
        link:"/profile/updatepassword",
        label:"Change Password"
    }
]
export const navlist:navListItems[]=[
    {
      link:"/dashboard",
      label:"Dashboard"  
    },
]