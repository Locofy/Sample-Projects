import { FunctionComponent } from "react";
import styles from "./GigCard.module.css";

export type GigCardType = {
  className?: string;
  image?: string;
  avatar?: string;
  userName?: string;
  rating?: string;
  price?: string;
  description?: string;
};

const GigCard: FunctionComponent<GigCardType> = ({
  className = "",
  image = "/image2@2x.png",
  avatar = "/avatar1@2x.png",
  userName = "Name",
  rating = "0.0",
  price = "$0.00",
  description = "Description",
}) => {
  return (
    <div className={[styles.gigCard, className].join(" ")}>
      <img className={styles.imageIcon} alt="" src={image} />
      <div className={styles.container}>
        <div className={styles.contentSection}>
          <div className={styles.topSection}>
            <div className={styles.userContainer}>
              <img className={styles.avatarIcon} alt="" src={avatar} />
              <div className={styles.name}>{userName}</div>
            </div>
            <div className={styles.ratingContainer}>
              <img className={styles.vectorIcon} alt="" src="/vector.svg" />
              <div className={styles.rating}>{rating}</div>
            </div>
          </div>
          <div className={styles.description}>{description}</div>
        </div>
        <b className={styles.price}>{price}</b>
      </div>
    </div>
  );
};

export default GigCard;
