import { FunctionComponent, useCallback } from "react";
import styles from "./DesignerCard.module.css";

export type DesignerCardType = {
  className?: string;
  image?: string;
  userName?: string;
  description?: string;
  rating?: string;

};

const DesignerCard: FunctionComponent<DesignerCardType> = ({
  className = "",
  image = "/image1@2x.png",
  userName = "Name",
  description = "Description",
  rating = "0.0",
}) => {
  const onHireTextClick = useCallback(() => {
    //TODO: add action
  }, []);

  return (
    <div className={[styles.designerCard, className].join(" ")}>
      <div className={styles.avatar}>
        <img className={styles.imageIcon} alt="" src={image} />

        <div className={styles.ratingcontainer}>
          <img className={styles.icon} alt="" src="/icon.svg" />
          <div className={styles.rating}>{rating}</div>

        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.name}>{userName}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.hire} onClick={onHireTextClick}>
          Hire
        </div>
      </div>
    </div>
  );
};

export default DesignerCard;
