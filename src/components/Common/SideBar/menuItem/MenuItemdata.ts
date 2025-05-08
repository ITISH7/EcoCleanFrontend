import energy from '../../../../assets/icons/energy.svg';
import energyactive from '../../../../assets/icons/energyActive.svg';
import clock from '../../../../assets/icons/clock.svg';
import clockactive from '../../../../assets/icons/clockActive.svg';

type MenuItem= {
    icon : string,
    label : string,
    onClick? : ()=>void,
    isactive? : boolean,
    activeicon:string,
    link?:string
}
const MenuItemData = [{
    icon : energy,
    activeicon:energyactive,
    label : "Dashboard",
    link:"/dashboard" ,
},
{
    icon : clock,
    activeicon:clockactive,
    label : "Pending Orders",
    link:"/dashboard/pendingorders",

},
{
    icon : energy,
    activeicon:energyactive,
    label : "Faq and Complaints",
    link:"/dashboard/faq",

}
]
export type { MenuItem};
export { MenuItemData};