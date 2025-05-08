import stats from "@/assets/icons/stats3.svg";
import clock from "@/assets/icons/clock3.svg";
import money from "@/assets/icons/money3.svg";
type junkroutedata={
    title: string;
    link  : string;
    icon: string;
    description: string;
    buttonLabel?: string;
}

const junkmanagement: junkroutedata[] = [
    {
        title:"Track Ongoing Pickup:",
        description:"Stay updated in real time. Monitor your driver’s location, receive timely status updates, and track the progress of your junk collection. tracknow..",
        link:"track",
        icon:stats,
        buttonLabel:"Track Now"
    },
    {
        title:"Schedule Pickup:",
        description:"plan your junk pickup with ease. Select the date, time, and category (paper, plastic, metal, etc.) and let us handle the rest for a seamless collection experience",
        link:"schedulepickup",
        icon:clock,
        buttonLabel:"Schedule Now",
    },
    {
        title:"Pickup History:",
        description:"ccess a detailed record of your past pickups, including dates, categories, weights, and earnings, all in one place.",
        link:"viewhistory",
        icon:clock,
        buttonLabel:"View History",
    },
    {
        title:"Check Current Prices:",
        description:"Quickly view the latest rates for your junk and maximize your earnings with informed decisions.",
        link:"checkprice",
        icon:money,
        buttonLabel:"view Prices",
    }
]

export {junkmanagement};
export type {junkroutedata};