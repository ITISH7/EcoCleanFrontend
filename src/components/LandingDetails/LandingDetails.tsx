import  { forwardRef } from 'react'
import styles from "./landingDetails.module.css";
import { DisplayImage } from '@/components/Common/DisplayImage/DisplayImage';
import videoImage from  '@/assets/images/video.svg';

import FeatureCard from '@/components/Common/FeatureCard/FeatureCard';
import { features } from './stepsTodo';
const LandingDetails=forwardRef<HTMLDivElement>((_props,ref)=> {
  return (
    <div ref = {ref} className={`${styles.container}`}>
      <div className={styles.contentImage}>
        <DisplayImage src={videoImage} className={styles.displayImage}/>
        </div>
        <div className={styles.textContainer}>
           <div className={styles.mainText}>
            <h1>Here’s how it <strong>works</strong></h1>
            <p><strong>EcoClean</strong> is a smart and eco-friendly platform that simplifies junk disposal while rewarding users for contributing to sustainability. With seamless junk categorization, convenient pickup scheduling, and real-time tracking,<strong>EcoClean</strong> ensures efficient waste management, promoting a cleaner and greener environment.</p>
            </div>
            <div className={styles.stepstodo}>
              {features.map((feature, index) => {
                return(<FeatureCard key={index} title={feature.title} src={feature.src} description={feature.description} left={true} onClick={() => {}}/>)})}
            </div>
        </div>
    </div>
  )
})

export default LandingDetails;
