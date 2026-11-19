import { FunctionComponent } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Gig, useGigHubStore } from "../store/useGigHubStore";
import styles from "./GigCard.module.css";

export type GigCardType = {
  gig: Gig;
  className?: string;
};

const GigCard: FunctionComponent<GigCardType> = ({ gig, className = "" }) => {
  const favoriteIds = useGigHubStore((state) => state.favoriteIds);
  const toggleFavorite = useGigHubStore((state) => state.toggleFavorite);
  const isFavorite = favoriteIds.includes(gig.id);

  return (
    <article className={[styles.gigCard, className].join(" ")}>
      <Link className={styles.imageWrap} to={`/gig/${gig.id}`}>
        <img className={styles.imageIcon} alt="" src={gig.image} />
        <span className={styles.category}>{gig.category}</span>
        <button
          className={[
            styles.favoriteButton,
            isFavorite ? styles.favoriteActive : "",
          ].join(" ")}
          onClick={(event) => {
            event.preventDefault();
            toggleFavorite(gig.id);
          }}
          aria-label={isFavorite ? "Remove from saved gigs" : "Save gig"}
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </Link>
      <Link className={styles.content} to={`/gig/${gig.id}`}>
        <div className={styles.sellerRow}>
          <img className={styles.avatarIcon} alt="" src={gig.avatar} />
          <span>{gig.seller}</span>
          <span className={styles.verified}>✓</span>
          <span className={styles.rating}>
            <Star size={13} fill="currentColor" /> {gig.rating.toFixed(1)}
          </span>
        </div>
        <h3>{gig.title}</h3>
        <div className={styles.meta}>
          <span>{gig.delivery}</span>
          <strong>From ${gig.price}</strong>
        </div>
      </Link>
    </article>
  );
};

export default GigCard;
