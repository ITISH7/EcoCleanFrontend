import energy from '@/assets/icons/energy.svg';
import energyactive from '@/assets/icons/energyActive.svg';
import { AdminMenuItem } from '@/utils/types/types';

const AdminMenuItemData:AdminMenuItem[] = [{
    icon : energy,
    activeicon:energyactive,
    label : "Admin Dashboard",
    link:"/admindashboard" ,
},
{
    icon : energy,
    activeicon:energyactive,
    label : "Clients",
    link:"/admindashboard/clients",

},
{
    icon : energy,
    activeicon:energyactive,
    label : "Merchants",
    link:"/admindashboard/merchants",

},
{
    icon : energy,
    activeicon:energyactive,
    label : "Blocked Users",
    link:"/admindashboard/blockedusers",

},
{
    icon : energy,
    activeicon:energyactive,
    label : "Junk Details",
    link:"/admindashboard/junkItems",

},
{
    icon : energy,
    activeicon:energyactive,
    label : "Orders",
    link:"/admindashboard/orders",

},
]
export { AdminMenuItemData};