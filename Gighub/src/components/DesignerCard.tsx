import { FunctionComponent } from "react";
import { MapPin, Star } from "lucide-react";
import { Designer, useGigHubStore } from "../store/useGigHubStore";
import styles from "./DesignerCard.module.css";

export type DesignerCardType = {
  designer: Designer;
  className?: string;
};

const DesignerCard: FunctionComponent<DesignerCardType> = ({
  designer,
  className = "",
}) => {
  const showToast = useGigHubStore((state) => state.showToast);

  return (
    <article className={[styles.designerCard, className].join(" ")}>
      <div className={styles.avatarWrap}>
        <img className={styles.imageIcon} alt="" src={designer.avatar} />
        <span className={styles.rating}>
          <Star size={11} fill="currentColor" /> {designer.rating.toFixed(1)}
        </span>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <strong>{designer.name}</strong>
          <span className={styles.description}>{designer.description}</span>
          <span className={styles.location}>
            <MapPin size={11} /> {designer.location}
          </span>
        </div>
        <button
          className={styles.hire}
          onClick={() => showToast(`Invite sent to ${designer.name}`)}
        >
          Hire
        </button>
      </div>
    </article>
  );
};

export default DesignerCard;
