import React from "react";
import scheduleSteps from "./ScheduleSteps.json";
import success from '@/assets/icons/success.svg'
type scheduleSteps={
    steps:number
}
const ScheduleStatus: React.FC<scheduleSteps> = ({steps}) => {
    const currentStatus = steps||1;
    /* Rectangle 4358 */


  return (
        <div className="flex pl-6  items-center">
            <div className="rounded-full bg-[rgba(217,217,217,0.50)] w-9">
                {scheduleSteps.map((schedule) => (
                        <div key={schedule.id} className="mb-8 mt-8 flex flex-col items-center justify-center">
                             {schedule.id < String(currentStatus) && (
                            // <div className="text-xl text-white flex items-center justify-center bg-secondary-green w-8 h-8 rounded-full">
                            //     ✓
                            // </div>
                            <img src={success} className="w-7"></img>
                            )} 
                            {schedule.id === String(currentStatus) && (
                            <div className="text-[18px] text-white flex items-center justify-center bg-secondary-green w-7 h-7 rounded-full">
                                {schedule.id}
                            </div>
                            )} 
                            {schedule.id > String(currentStatus) &&(
                            <div className="text-[18px] bg-white flex items-center justify-center w-7 h-8 rounded-full">
                                {schedule.id}
                            </div>
                            )}
                        </div>
                ))}
            </div>

            <div className="mt-4">
                {scheduleSteps.map((schedule) => (
                    <div key={schedule.id}  className="mb-7 ml-5 ">
                        <p className="text-lg font-regular">{schedule.title}</p>
                    </div>
                ))}
            </div>
        </div>
  );
};
export default ScheduleStatus;