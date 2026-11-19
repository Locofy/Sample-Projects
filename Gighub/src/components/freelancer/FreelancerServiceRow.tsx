import { FunctionComponent } from "react";
import { ArrowUpRight, MoreHorizontal, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { FreelancerService } from "../../store/useGigHubStore";
import styles from "./FreelancerServiceRow.module.css";

type FreelancerServiceRowProps = {
  service: FreelancerService;
};

const FreelancerServiceRow: FunctionComponent<FreelancerServiceRowProps> = ({
  service,
}) => (
  <article className={styles.row}>
    <img src={service.image} alt="" />
    <div className={styles.copy}>
      <div className={styles.serviceHeader}>
        <span>{service.category}</span>
        <strong className={service.status === "Draft" ? styles.draft : ""}>
          {service.status}
        </strong>
      </div>
      <h3>{service.title}</h3>
      <div className={styles.meta}>
        <span>
          <Star size={12} fill="currentColor" /> {service.rating}
        </span>
        <span>{service.orders} orders</span>
        <b>From ${service.price}</b>
      </div>
    </div>
    <div className={styles.actions}>
      <button aria-label={`More options for ${service.title}`}>
        <MoreHorizontal size={17} />
      </button>
      <Link
        to={`/freelancer/services/${service.id}`}
        aria-label={`Open ${service.title}`}
      >
        <ArrowUpRight size={16} />
      </Link>
    </div>
  </article>
);

export default FreelancerServiceRow;
