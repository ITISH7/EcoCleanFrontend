import React from "react";
import styles from "./card.module.css";

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, className, onClick }) => {
  return (
    <div className={`${styles.card} ${className || ""}`} onClick={onClick}>
      {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default Card;
