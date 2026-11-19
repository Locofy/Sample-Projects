import { FunctionComponent, ReactNode } from "react";
import styles from "./FreelancerMetricCard.module.css";

type FreelancerMetricCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
  tone?: "purple" | "teal" | "orange";
};

const FreelancerMetricCard: FunctionComponent<FreelancerMetricCardProps> = ({
  label,
  value,
  detail,
  icon,
  tone = "purple",
}) => (
  <article className={styles.card}>
    <div className={`${styles.icon} ${styles[tone]}`}>{icon}</div>
    <div className={styles.copy}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  </article>
);

export default FreelancerMetricCard;
