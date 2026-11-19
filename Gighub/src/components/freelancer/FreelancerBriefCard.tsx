import { FunctionComponent } from "react";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  Clock3,
  MapPin,
  Send,
  Users,
} from "lucide-react";
import { FreelancerBrief } from "../../store/useGigHubStore";
import styles from "./FreelancerBriefCard.module.css";

type FreelancerBriefCardProps = {
  brief: FreelancerBrief;
  saved: boolean;
  applied: boolean;
  onSave: () => void;
  onApply: () => void;
};

const FreelancerBriefCard: FunctionComponent<FreelancerBriefCardProps> = ({
  brief,
  saved,
  applied,
  onSave,
  onApply,
}) => (
  <article className={styles.card}>
    <div className={styles.topline}>
      <div className={styles.client}>
        <img src={brief.clientAvatar} alt="" />
        <div>
          <strong>{brief.client}</strong>
          <span>
            <MapPin size={12} /> Verified client
          </span>
        </div>
      </div>
      <div className={styles.match}>{brief.match}% match</div>
    </div>
    <div className={styles.body}>
      <span className={styles.category}>{brief.category}</span>
      <h3>{brief.title}</h3>
      <p>{brief.description}</p>
      <div className={styles.tags}>
        {brief.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
    <div className={styles.meta}>
      <span>
        <Clock3 size={14} /> {brief.posted}
      </span>
      <span>
        <Users size={14} /> {brief.proposals} proposals
      </span>
      <strong>{brief.budget}</strong>
    </div>
    <div className={styles.actions}>
      <button
        className={`${styles.saveButton} ${saved ? styles.saved : ""}`}
        onClick={onSave}
        aria-label={saved ? "Remove saved brief" : "Save brief"}
      >
        <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
      </button>
      <button
        className={styles.applyButton}
        onClick={onApply}
        disabled={applied}
      >
        {applied ? (
          <>
            <Check size={15} /> Proposal sent
          </>
        ) : (
          <>
            <Send size={15} /> Send proposal
          </>
        )}
        {!applied && <ArrowUpRight size={15} />}
      </button>
    </div>
  </article>
);

export default FreelancerBriefCard;
