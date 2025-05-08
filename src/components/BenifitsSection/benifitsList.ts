import dustbin from "../../assets/icons/dustbin1.svg";
import money from '../../assets/icons/money2.svg';
import box from '../../assets/icons/box.svg';
import stats from '../../assets/icons/stats.svg';
type benifitItem={
    title:string,
    description:string,
    icon:string
}
const benitfitList:benifitItem[]=[
    {
        title:"Eco-Friendly Disposal",
        description:"Help reduce environmental waste by properly categorizing and recycling your junk.",
        icon:dustbin
    },
    {
        title:"Earn Money or Credits",
        description:"Turn your unwanted items into cash or credits that can be used for future services.",
        icon:money
    },
    {
        title:"Easy Pickup Scheduling",
        description:"Enjoy flexible, on-demand junk pickup at times that work best for you.",
        icon:box
    },
    {
        title:"Real-Time Tracking",
        description:"Monitor your environmental impact and see how your contributions are making a difference.",
        icon:stats
    }
        
]

export {benitfitList};