import React, { useEffect, useRef } from "react";
import styles from "./featureCard.module.css";

interface FeatureCardProps {
  title?: string;
  description?: string;
  onClick?: () => void;
  src?: string;
  className?: string;
  left?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  onClick ,
  src,
  className,
  left
}) => {
const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.appear);
          }
        });
      },
      { threshold: 1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);
  return (
    <>
    {
      left ?
    <div  ref={cardRef} className={`${styles.container} ${className}`} onClick={onClick}>
      <div className={styles.dropdownIcon}>
        {src&& <img src={src}  alt="icon" />}
      </div>
      <div className={styles.content}>
        {title&&<h4 className={styles.title}>{title}</h4>}
        {description&&<p className={`${styles.description} ${""}`}>
          {description}
        </p>}
      </div>
    </div>
:<div  ref={cardRef} className={`${styles.container} ${className}`} onClick={onClick}>

<div className={styles.content}>
  {title&&<h4 className={styles.title}>{title}</h4>}
  {description&&<p className={`${styles.description} ${""}`}>
    {description}
  </p>}
</div>
<div className={styles.dropdownIcon}>
  {src&& <img src={src}  alt="icon" />}
</div>
</div>

}

    </>
  );
};

export default FeatureCard;
