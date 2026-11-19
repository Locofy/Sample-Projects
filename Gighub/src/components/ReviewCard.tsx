import { FunctionComponent } from "react";
import { Star } from "lucide-react";
import { Review } from "../store/useGigHubStore";
import styles from "./ReviewCard.module.css";

export type ReviewCardType = { review: Review; className?: string };

const ReviewCard: FunctionComponent<ReviewCardType> = ({
  review,
  className = "",
}) => (
  <article className={[styles.reviewCard, className].join(" ")}>
    <div className={styles.topContainer}>
      <img className={styles.avatarImageIcon} alt="" src={review.avatar} />
      <div className={styles.contentContainer}>
        <strong>{review.name}</strong>
        <span>{review.location}</span>
      </div>
      <span className={styles.ratingContainer}>
        <Star size={11} fill="currentColor" /> {review.rating.toFixed(1)}
      </span>
    </div>
    <p className={styles.review}>{review.text}</p>
  </article>
);

export default ReviewCard;
