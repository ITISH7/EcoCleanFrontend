import React from 'react'
import styles from './benefitSection.module.css'
import { benitfitList } from './benifitsList';
import Card from '../Common/UI/Card/Card';
const BenefitsSection:React.FC=() =>{
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Benefits of <strong>Ecoclean</strong></h1>
        <p>Discover how EcoClean not only helps you manage your junk but also rewards you for contributing to a cleaner, greener environment.</p>
        </div>
        <div className={styles.benefitList}>
        {benitfitList.map((item,index)=>{
          return<Card key={index} title={item.title} description={item.description} imageUrl={item.icon} className={styles.card}/>
        })}
        </div>
    </div>
  )
}
export default BenefitsSection;