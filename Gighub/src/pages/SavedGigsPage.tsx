import { FunctionComponent, useMemo } from "react";
import { ArrowLeft, Heart, Sparkles, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import GigCard from "../components/GigCard";
import { gigs, useGigHubStore } from "../store/useGigHubStore";
import styles from "./SavedGigsPage.module.css";

const SavedGigsPage: FunctionComponent = () => {
  const favoriteIds = useGigHubStore((state) => state.favoriteIds);
  const toggleFavorite = useGigHubStore((state) => state.toggleFavorite);
  const showToast = useGigHubStore((state) => state.showToast);
  const savedGigs = useMemo(
    () => gigs.filter((gig) => favoriteIds.includes(gig.id)),
    [favoriteIds],
  );

  return (
    <AppLayout className={styles.page}>
      <main className={styles.content}>
        <Link className={styles.backLink} to="/">
          <ArrowLeft size={14} /> Back to discover
        </Link>
        <section className={styles.heading}>
          <div>
            <span className={styles.kicker}>Your shortlist</span>
            <h1>Saved gigs</h1>
            <p>
              Keep the services that feel like a fit close by while you compare
              your options.
            </p>
          </div>
          <div className={styles.savedCount}>
            <Heart size={19} fill="currentColor" />
            <strong>{savedGigs.length}</strong>
            <span>saved gigs</span>
          </div>
        </section>
        {savedGigs.length > 0 ? (
          <section>
            <div className={styles.sectionBar}>
              <h2>Ready when you are</h2>
              <button
                onClick={() => {
                  savedGigs.forEach((gig) => toggleFavorite(gig.id));
                  showToast("Shortlist cleared");
                }}
              >
                <Trash2 size={14} /> Clear shortlist
              </button>
            </div>
            <div className={styles.grid}>
              {savedGigs.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          </section>
        ) : (
          <section className={styles.empty}>
            <div className={styles.emptyIcon}>
              <Sparkles size={24} />
            </div>
            <h2>Your shortlist is still open</h2>
            <p>Tap the heart on any gig you like and it will show up here.</p>
            <Link to="/">
              <span>Explore gigs</span> <ArrowLeft size={14} />
            </Link>
          </section>
        )}
        <section className={styles.bottomCta}>
          <div>
            <span className={styles.kicker}>Need something more specific?</span>
            <h2>Tell designers what you’re making.</h2>
          </div>
          <button onClick={() => useGigHubStore.getState().openBrief()}>
            Create a brief <ArrowLeft size={14} />
          </button>
        </section>
      </main>
    </AppLayout>
  );
};

export default SavedGigsPage;
