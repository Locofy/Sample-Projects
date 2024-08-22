import { FunctionComponent } from "react";
import styles from "./ReviewCard.module.css";

export type ReviewCardType = {
  className?: string;
  userName?: string;
  userLocation?: string;
  review?: string;
  rating?: string;
  avatarImage?: string;
};

const ReviewCard: FunctionComponent<ReviewCardType> = ({
  className = "",
  userName = "Name",
  userLocation = "United States",
  review = "Review",
  rating = "0.0",
  avatarImage = "/avatar-image@2x.png",
}) => {
  return (
    <div className={[styles.reviewCard, className].join(" ")}>
      <div className={styles.topContainer}>
        <img className={styles.avatarImageIcon} alt="" src={avatarImage} />
        <div className={styles.contentContainer}>
          <div className={styles.name}>{userName}</div>
          <div className={styles.location}>{userLocation}</div>
        </div>
        <div className={styles.ratingContainer}>
          <img className={styles.starIcon} alt="" src="/star-icon.svg" />
          <div className={styles.rating}>{rating}</div>
        </div>
      </div>
      <div className={styles.review}>{review}</div>
    </div>
  );
};

export default ReviewCard;

