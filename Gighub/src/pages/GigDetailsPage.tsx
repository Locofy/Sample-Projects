import { FunctionComponent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Heart,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ReviewCard from "../components/ReviewCard";
import { gigs, reviews, useGigHubStore } from "../store/useGigHubStore";
import styles from "./GigDetailsPage.module.css";

const GigDetailsPage: FunctionComponent = () => {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const gig = gigs.find((item) => item.id === gigId) || gigs[0];
  const favoriteIds = useGigHubStore((state) => state.favoriteIds);
  const toggleFavorite = useGigHubStore((state) => state.toggleFavorite);
  const showToast = useGigHubStore((state) => state.showToast);
  const openBrief = useGigHubStore((state) => state.openBrief);
  const isFavorite = favoriteIds.includes(gig.id);

  return (
    <AppLayout className={styles.page}>
      <main className={styles.content}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={15} /> Back to gigs
        </button>
        <div className={styles.breadcrumbs}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{gig.category}</span>
          <span>/</span>
          <strong>{gig.seller}</strong>
        </div>
        <section className={styles.detailGrid}>
          <div className={styles.mainColumn}>
            <div className={styles.headingRow}>
              <div>
                <span className={styles.kicker}>
                  {gig.category} · Top rated service
                </span>
                <h1>{gig.title}</h1>
                <div className={styles.seller}>
                  <img src={gig.avatar} alt="" />
                  <span>
                    <strong>{gig.seller}</strong>
                    <small>
                      {gig.sellerRole} · {gig.reviews} reviews
                    </small>
                  </span>
                  <span className={styles.sellerRating}>
                    <Star size={14} fill="currentColor" />{" "}
                    {gig.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <button
                className={[
                  styles.saveButton,
                  isFavorite ? styles.saved : "",
                ].join(" ")}
                onClick={() => toggleFavorite(gig.id)}
                aria-label={isFavorite ? "Remove from saved gigs" : "Save gig"}
              >
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
            <div className={styles.gallery}>
              <img
                className={styles.mainImage}
                src={gig.image}
                alt={gig.title}
              />
              <div className={styles.thumbs}>
                {[
                  gig.image,
                  "/figma-assets/figma-09.jpeg",
                  "/figma-assets/figma-17.jpeg",
                  "/figma-assets/figma-20.jpeg",
                ].map((src, index) => (
                  <button
                    key={`${src}-${index}`}
                    className={index === 0 ? styles.thumbActive : ""}
                    onClick={() => showToast("Gallery preview selected")}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.about}>
              <span className={styles.sectionLabel}>About this gig</span>
              <p>
                {gig.description} {gig.seller} specializes in creating
                high-quality work tailored to your specific needs. Whether you
                are a small business, a freelancer, or an individual looking to
                establish an online presence, this service is built to deliver a
                thoughtful final result.
              </p>
              <h3>Why choose me:</h3>
              <ul>
                <li>Experience across a wide range of creative projects.</li>
                <li>
                  Clear communication and thoughtful collaboration at every
                  step.
                </li>
                <li>
                  On-time delivery with room for feedback and refinements.
                </li>
                <li>
                  Source files included so your work stays useful after launch.
                </li>
              </ul>
              <h3>How it works:</h3>
              <ol>
                <li>
                  Share your goals, references and what success looks like.
                </li>
                <li>
                  Receive an initial direction and clear project timeline.
                </li>
                <li>Review the first concept and share your feedback.</li>
                <li>Get polished final files ready for your team to use.</li>
              </ol>
            </div>
            <div className={styles.designerStory}>
              <span className={styles.sectionLabel}>Meet the designer</span>
              <div className={styles.storyHeader}>
                <img src={gig.avatar} alt="" />
                <div>
                  <h2>{gig.seller}</h2>
                  <span>{gig.sellerRole}</span>
                </div>
                <button
                  onClick={() => showToast(`Message sent to ${gig.seller}`)}
                >
                  <MessageCircle size={15} /> Message
                </button>
              </div>
              <p>
                {gig.seller} brings a calm, collaborative approach to every
                project. The goal is simple: make the process feel clear, and
                make the final work feel unmistakably yours.
              </p>
            </div>
          </div>
          <aside className={styles.sidebar}>
            <div className={styles.pricingCard}>
              <div className={styles.tabs}>
                <button className={styles.tabActive}>Starter</button>
                <button>Standard</button>
                <button>Premium</button>
              </div>
              <div className={styles.priceLine}>
                <span>Starting at</span>
                <strong>${gig.price.toFixed(2)}</strong>
              </div>
              <p className={styles.packageNote}>
                Includes a first concept and two rounds of revisions
              </p>
              <ul className={styles.includes}>
                <li>
                  <CheckCircle2 size={14} /> Detailed project kickoff
                </li>
                <li>
                  <CheckCircle2 size={14} /> Responsive source files
                </li>
                <li>
                  <CheckCircle2 size={14} /> Two revision rounds
                </li>
                <li>
                  <CheckCircle2 size={14} /> Commercial usage rights
                </li>
              </ul>
              <div className={styles.delivery}>
                <Clock3 size={15} />
                <span>
                  <strong>{gig.delivery}</strong>
                  <small>Fast, transparent turnaround</small>
                </span>
              </div>
              <button className={styles.hireButton} onClick={openBrief}>
                Hire {gig.seller.split(" ")[0]} <ArrowRight size={16} />
              </button>
              <button
                className={styles.messageButton}
                onClick={() => showToast(`Message sent to ${gig.seller}`)}
              >
                Message me <MessageCircle size={15} />
              </button>
              <div className={styles.protection}>
                <ShieldCheck size={16} />
                <span>
                  Your payment is protected until you approve the work.
                </span>
              </div>
            </div>
            <div className={styles.reviews}>
              <div className={styles.reviewHeading}>
                <div>
                  <span className={styles.sectionLabel}>Reviews</span>
                  <h2>Loved by clients</h2>
                </div>
                <span className={styles.bigRating}>
                  <Star size={16} fill="currentColor" /> {gig.rating.toFixed(1)}
                </span>
              </div>
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
              <button
                className={styles.textLink}
                onClick={() =>
                  showToast("You are viewing all available reviews")
                }
              >
                See all reviews →
              </button>
            </div>
          </aside>
        </section>
      </main>
    </AppLayout>
  );
};

export default GigDetailsPage;
