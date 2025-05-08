import energy from '@/assets/icons/energy.svg';
import energyactive from '@/assets/icons/energyActive.svg';


type MenuItem= {
    icon : string,
    label : string,
    onClick? : ()=>void,
    isactive? : boolean,
    activeicon:string,
    link:string
}
const MerchantMenuItemData:MenuItem[]= [{
    icon : energy,
    activeicon:energyactive,
    label : "Dashboard",
    link:"/merchantDashboard" 
},
{
    icon : energy,
    activeicon:energyactive,
    label : "VIew Chats",
    link:"/viewChats"

},
{
    icon : energy,
    activeicon:energyactive,
    label : "Faq and Complaints",
    link:"/merchantDashboard/faq"

}
,{
    icon : energy,
    activeicon:energyactive,
    label : "Order History",
    link:"/merchantDashboard/orderHistory"
},
{
    icon : energy,
    activeicon:energyactive,
    label : "Available Order",
    link:"/merchantDashboard/AvailableOrder"
}
]
export type { MenuItem};
export { MerchantMenuItemData};