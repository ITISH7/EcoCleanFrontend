import energy from '@/assets/icons/energy.svg';
import energyactive from '@/assets/icons/energyActive.svg';
import clock from '@/assets/icons/clock.svg';
import clockactive from '@/assets/icons/clockActive.svg';


type MenuItem= {
    icon ?: string,
    label : string,
    onClick? : ()=>void,
    isactive? : boolean,
    activeicon?:string,
    link?:string
    className?:string
}
const dashboardMenuItemData = [{
    icon : energy,
    activeicon:energyactive,
    label : "Dashboard",
    link:"/dashboard" ,
},
{
    icon : clock,
    activeicon:clockactive,
    label : "My Schedule",
    link:"/dashboard/myschedule",

},
{
    icon : energy,
    activeicon:energyactive,
    label : "Faq and Complaints",
    link:"/dashboard/faq",

}
]
const profileMenuItemData = [{
    label : "My Profile",
    link:"/profile" ,
},
{
    label : "Manage Address",
    link:"/profile/manageaddress",

},
{
    label : "Change Password",
    link:"/profile/updatepassword",
}
]
const adminProfileMenuItemData = [{
    label : "My Profile",
    link:"/adminprofile" ,
},
{
    label : "Change Password",
    link:"/adminprofile/updatepassword",
}
]
export type { MenuItem};
export { dashboardMenuItemData ,profileMenuItemData, adminProfileMenuItemData};