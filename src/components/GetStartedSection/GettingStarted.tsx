import  { forwardRef } from 'react';
import styles from "./gettingStarted.module.css";
import { DisplayImage } from '../Common/DisplayImage/DisplayImage';
import Image from  '../../assets/images/gettingStarted.svg';

import FeatureCard from '../Common/FeatureCard/FeatureCard';
import { features } from './stepsTodo';
const GettingStarted=forwardRef<HTMLDivElement>((_props, ref)=> {
  return (
    <div ref ={ref} className={`${styles.container} pt-16 `}>
        <div className={styles.textContainer}>
           <div className={styles.mainText}>
            <h1>Get Started with <strong>EcoClean</strong></h1>
            <p>Choose your EcoClean journey: Customer to manage junk or Driver Partner to help build a greener world.</p></div>
            <div className={styles.stepstodo}>
              {features.map((feature, index) => {
                return(<FeatureCard key={index} title={feature.title} src={feature.src} description={feature.description}  className={styles.feature}onClick={() => {}}/> )})}
            </div>
        </div>
        <div className={styles.contentImage}>
        <DisplayImage src={Image} className={styles.displayImage}/>
        </div>
    </div>
  )
});

export default GettingStarted;
