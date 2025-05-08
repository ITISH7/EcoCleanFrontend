import React from "react";
import { getOngoingPickupStatus } from "@/utils/api/TrackOngoingPickup";
import { useQuery } from "@tanstack/react-query";
import styles from "./TrackOngoingPickUp.module.css";
import timelineSteps from "./TimelineSteps.json";
import PageHeader from "../../../../components/Common/pageHeaders/PageHeader";

const TrackOngoingPickup: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["status"],
    queryFn: getOngoingPickupStatus,
  });
  return (
    <div className="p-6 w-[100vw]">
      <PageHeader heading="Track Ongoing Pickup" />
      <div className="overflow-x-hidden hidden min-[1190px]:block ml-[10%] pb-10">
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error.message}</div>}

        <table className={`${styles.statusTable} `}>
          <tbody className="">
            {timelineSteps.map((timeline) => (
              <tr key={timeline.id} className={""}>
                <td className="">
                  {Number(timeline.id) % 2 === 0 ? (
                    <div className="justify-items-end">
                      <h2 className="text-lg font-semibold">
                        {timeline.title}
                      </h2>
                      <p className="text-gray-600 text-wrap text-right">
                        {timeline.description}
                      </p>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </td>
                <td className={`${styles.stages} justify-items-center`}>
                  {timeline.id === String(data) ? (
                    <div className="text-2xl flex items-center justify-center shadow-md shadow-blue-500 outline-blue-700 outline-4 w-13 h-13 rounded-full">
                      {timeline.id}
                    </div>
                  ) : (
                    <div className="text-2xl flex items-center justify-center shadow-md shadow-gray-500/50 w-13 h-13 rounded-full">
                      {timeline.id}
                    </div>
                  )}
                  {timeline.id < String(timelineSteps.length) && (
                    <div className="border-l-5 h-20"></div>
                  )}
                </td>
                <td className="">
                  {Number(timeline.id) % 2 !== 0 && (
                    <div>
                      <h2 className="text-lg font-semibold">
                        {timeline.title}
                      </h2>
                      <p className="text-gray-600 text-wrap">
                        {timeline.description}
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" min-[1190px]:hidden max-w-3xl mx-auto p-6">
        <div className="relative pl-6">
          {timelineSteps.map((timeline) => (
            <div key={timeline.id} className="mb-0 flex items-start">
              <div className="justify-items-center">
                {timeline.id === String(data) ? (
                  <div className="text-2xl flex items-center justify-center shadow-md shadow-blue-500 outline-blue-700 outline-4 w-13 h-13 rounded-full">
                    {timeline.id}
                  </div>
                ) : (
                  <div className="text-2xl flex items-center justify-center shadow-md shadow-gray-500/50 w-13 h-13 rounded-full">
                    {timeline.id}
                  </div>
                )}
                {timeline.id < String(timelineSteps.length) && (
                  <div className="min-[540px]:border-l-5 h-10"></div>
                )}
              </div>
              <div className="ml-4 pt-2">
                <h2 className="text-lg font-semibold">{timeline.title}</h2>
                <p className="text-gray-600">{timeline.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TrackOngoingPickup;