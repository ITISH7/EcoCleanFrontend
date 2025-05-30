import React from "react";
import { Link } from "react-router-dom";

interface TableProps {
    header: string[];
    data?: { [key: string]: string|number }[];
    className?: string;
    endPoint?:string;
}

const AdminTable: React.FC<TableProps> = ({ header, data, className, endPoint="" }) => {
   return (
    <div className={`w-full flex flex-col items-center h-full ${className}`}>
      {/* Table Header */}
      <div className="text-[16px] flex border border-black w-[95%] justify-between min-h-[70px] rounded-xl mt-4 items-center px-5 md:px-10 text-center font-medium uppercase bg-gray-200">
        {header.map((head, index) => (
          <p 
            key={index} 
            className={`flex-1 text-center ${head === "Status" ? "hidden md:block" : ""}`} // Hide "Status" on small screens
          >
            {head}
          </p>
        ))}
      </div>

      {/* Table Rows */}
      { data?.length !== 0 ? <div className="bg-[#DFE5F1] w-[95%] overflow-y-auto mt-4 pt-4 rounded-3xl flex flex-col items-center overflow-x-hidden">
        {data?.map((row, index) => (
          <div key={index} className="text-[16px] mx-4 bg-white w-[95%] md:w-[98%] min-h-[70px] mt-2 shadow flex items-center px-5 md:px-10 md:text-[18px] uppercase mb-2">
            {header.map((col, colIndex) => (
              <div 
                key={colIndex} 
                className={`flex-1 text-center ${col === "Status" ? "hidden md:block" : ""}`} // Hide "Status" on small screens
              >
                {col === "View details"||col=== "Actions" ? (
                  <Link to={`/admindashboard/${endPoint}/${row["orderId"]}`} className="text-blue-500 underline">
                  {row[col]}
                  </Link>
                ) : (
                  <p>{row[col]}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      :
      <div className="bg-[#DFE5F1] w-[95%] overflow-y-auto mt-4 pt-4 rounded-3xl flex flex-col items-center overflow-x-hidden">
        <div className=" mx-4 bg-white w-[95%] md:w-[98%] min-h-[70px] mt-2 shadow flex items-center justify-around px-5 md:px-10 mb-2">
        <p className="text-[16px] md:text-[18px]"> 
          No Data Available
        </p>
        </div>
      </div>
        }
    </div>
  );
};

export default AdminTable;
