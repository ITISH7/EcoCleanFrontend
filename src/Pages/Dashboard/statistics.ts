import stats from "@/assets/icons/stats2.svg";
import clock from "@/assets/icons/clock2.svg";
import profiticon from "@/assets/icons/profitlogo.svg";
type stats ={
    title: string;
    amount: number;
    percentage: number;
    arrow: string;
    logo: string;
    timeline:string;
}
const statistics: stats[] = [
    {
        title: "Total Reward",
        amount: 890.0,
        percentage: 1.3,
        arrow: profiticon,
        logo: stats,
        timeline:"from past week"
    },
    {
        title: "Total pending",
        amount: 200.0,
        percentage: 1.8,
        arrow: profiticon,
        logo: clock,
        timeline:"from yesterday"
    },
]

export {statistics};
export type {stats};