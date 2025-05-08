import Title from "@/components/Title";
import { Card, CardTitle } from "@/components/ui/card";
import React from "react";
import {adminCards} from "@/Pages/AdminPages/AdminDashboard/AdminDashboardCards";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useHomePageStatistics } from "@/utils/api/statisticsController/statistics";

const MyAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const {data:statistics, isSuccess} = useHomePageStatistics();
  return (
    <div className="lg:w-[80%] mx-4">
      <Title title="Statistics" />
      <Card className="sm:flex justify-items-end shadow-xl rounded-2xl mt-4 p-6">
        {isSuccess && statistics?.map((stat, index) => {
          return (
            <div
              key={index}
              className="w-[100%] md:mr-8 p-6 items-center mb-4 md:mb-0"
            >
              <div className="flex justify-between items-center">
                <div className="justify-items-center">
                  <h1 className={`text-[24px] font-primary-bold mt-4  md:text-[28px] text-blue-500`}>
                    {stat.count}
                  </h1>
                  <div className="w-full font-bold text-2xl items-center">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="w-[100%] md:mr-8 p-6 items-center mb-4 md:mb-0">
              <div className="flex justify-between items-center">
                <div className="justify-items-center">
                  <h1 className={`text-[24px] font-primary-bold mt-4  md:text-[28px] text-red-500`}>
                    {0}
                  </h1>
                  <div className="w-full font-bold text-2xl items-center whitespace-pre-wrap">
                    {"AFFILIATED COMPANIES"}
                  </div>
                </div>
              </div>
            </div>
      </Card>
      <Title title="Admin Dashboard" />
      <div className=" md: p-6 min-[775px]:grid max-[1403px]:grid-cols-2 min-[1403px]:grid-cols-3 md:gap-y-8 md:gap-x-4 md:mt-8 w-[100%] md: mb-20">
        {adminCards.map((card, index) => {
          return (
            <Card
              key={index}
              className="flex flex-col justify-around mr-6 p-4 shadow-2xl items-center rounded-2xl mb-4 w-[100%] h-70 md:mb-0"
            >
              <div className="flex justify-between h-[100%] items-center">
                <div>
                  <CardTitle className="text-text-grey font-semibold text-2xl">
                    {card.title}
                  </CardTitle>
                  <h1 className="text-md font-primary text-text-grey mt-4">
                    {card.description}
                  </h1>
                </div>
                <img
                  className="px-1 "
                  src={card.icon}
                  alt="icon related to title"
                />
              </div>
              <div className="flex justify-center mt-4 w-[100%] ">
                <Button className="bg-secondary-green text-white hover:bg-primary-green hover:cursor-pointer" onClick={()=>{navigate(card.link)}}>{card.buttonLabel}</Button>
              </div>
            </Card>
          );
        })}
        
      </div> 
    </div>
  );
};
export default MyAdminDashboard;
