import stats from "@/assets/icons/stats3.svg";
import { AdminRouteData } from "@/utils/types/types";

const adminCards: AdminRouteData[] = [
    {
        title:"Manage Clients:",
        description:"View, edit, and manage client details effortlessly. Keep track of client registrations, update profiles, and streamline interactions",
        link:"clients",
        icon:stats,
        buttonLabel:"View Clients"
    },
    {
        title:"Manage Merchants:",
        description:"Efficiently oversee merchant accounts, update details, and track activities. Ensure smooth operations and seamless collaboration with all registered merchants",
        link:"merchants",
        icon:stats,
        buttonLabel:"View Merchants",
    },
    {
        title:"Manage Junk Items:",
        description:"Track, categorize, and oversee junk items efficiently. Streamline collection, recycling, and disposal for a cleaner and greener environment.",
        link:"junkitems",
        icon:stats,
        buttonLabel:"View Junk Items",
    },
    {
        title:"Manage Blocked Users:",
        description:"View and control blocked user accounts. Unblock or take necessary actions to maintain a safe and secure platform.",
        link:"blockedusers",
        icon:stats,
        buttonLabel:"View Blocked Users",
    },
    {
        title:"Manage Orders:",
        description:"View and control all the Orders and their details of every user. View Specific Order details to maintain a consistent and transparent platform.",
        link:"orders",
        icon:stats,
        buttonLabel:"View Orders",
    }
]

export {adminCards};