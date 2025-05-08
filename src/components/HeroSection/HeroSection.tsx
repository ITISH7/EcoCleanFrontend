import React from "react";

import { list } from "./heroSectionStatistics";
import styles from "./heroSection.module.css";
import Button from "../Common/UI/Button/Button";
import { DisplayImage } from "../Common/DisplayImage/DisplayImage";
import { useStatistics } from "@/utils/api/homePageController/home";
import { toast } from "sonner";
interface HeroSectionProps {
  scrollToGetStarted: () => void;
  scrollToLandingDetails: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  scrollToGetStarted,
  scrollToLandingDetails,
}) => {
  const { data, isLoading, error, isError } = useStatistics();
  isError &&
    toast.error(`Error Loading Statistics: ${error?.message || "An unexpected error occurred"}`);
  const statistics = data?.map((item) => ({
    ...item,
  }));
  return (
    <div className={`${styles.container} pt-24 max-h-[100vh] `}>
    
      <div className={styles.heroContent}>
        <h1 className="mt-4"> Transforming Waste into Worth</h1>
        <p className=" mt-5 mb-5">
          {" "}
          Effortless Junk Management for a Cleaner, Greener Future
        </p>
        <p>
          Say goodbye to clutter and hello to a sustainable tomorrow!
          <br /> Our smart junk management system makes it simple to recycle,
          <br /> reduce, and repurpose waste. Whether it’s your home, office,
          <br /> or community,we provide efficient solutions to ensure a cleaner
          <br /> environment while turning trash into treasure.
        </p>
        <div className="lg:w-[80%]">
        <div className={styles.buttonContainer}>
          <Button
            label="Get started Now"
            button_type={"button"}
            onClick={scrollToGetStarted}
            className={styles.button}
          />
          <Button
            label="Learn How it Works"
            button_type={"button"}
            onClick={scrollToLandingDetails}
            className={styles.button}
          />
        </div>
        <div className={styles.statistics}>
          {isLoading && <p>Loading statistics...</p>}
          {!isLoading &&
            statistics?.map((item, index) => (
              <div key={index} className="flex flex-col flex-wrap justify-center  items-center">
                <h1 style={{ color: list[index%list.length].color }}>{item.count}</h1>
                <div className="flex flex-col justify-center  items-center">
                    <p key={index}>{item.label}</p>
                </div>
              </div>
            ))}
        
        </div>
      </div>
      </div>
      <DisplayImage className={styles.image} />

    </div>
  );
};
export default HeroSection;
