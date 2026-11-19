import { FunctionComponent, useEffect } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Edit3,
  Globe2,
  MapPin,
  Plus,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import FreelancerServiceRow from "../components/freelancer/FreelancerServiceRow";
import {
  freelancerProfile,
  freelancerServices,
  useGigHubStore,
} from "../store/useGigHubStore";
import styles from "./FreelancerProfilePage.module.css";

const FreelancerProfilePage: FunctionComponent = () => {
  const mode = useGigHubStore((state) => state.mode);
  const setMode = useGigHubStore((state) => state.setMode);
  const availability = useGigHubStore((state) => state.freelancerAvailability);
  const toggleAvailability = useGigHubStore(
    (state) => state.toggleFreelancerAvailability,
  );
  const showToast = useGigHubStore((state) => state.showToast);

  useEffect(() => {
    if (mode !== "freelancer") {
      setMode("freelancer");
    }
  }, [mode, setMode]);

  return (
    <AppLayout className={styles.page}>
      <main className={styles.content}>
        <Link className={styles.backLink} to="/freelancer">
          <ArrowLeft size={14} /> Back to workspace
        </Link>
        <section className={styles.profileHero}>
          <div className={styles.identity}>
            <div className={styles.avatarWrap}>
              <img
                src={freelancerProfile.avatar}
                alt={freelancerProfile.name}
              />
              <span
                className={
                  availability === "available"
                    ? styles.availableDot
                    : styles.awayDot
                }
              />
            </div>
            <div>
              <span className={styles.kicker}>Public freelancer profile</span>
              <h1>{freelancerProfile.name}</h1>
              <p>
                {freelancerProfile.role} <span>·</span> <MapPin size={13} />{" "}
                {freelancerProfile.location}
              </p>
              <div className={styles.rating}>
                <Star size={14} fill="currentColor" />{" "}
                <strong>{freelancerProfile.rating}</strong>{" "}
                <span>({freelancerProfile.reviews} client reviews)</span>
              </div>
            </div>
          </div>
          <div className={styles.heroActions}>
            <button
              className={styles.secondaryButton}
              onClick={() => showToast("Profile preview is ready to share")}
            >
              Preview profile <ArrowUpRight size={15} />
            </button>
            <button
              className={styles.primaryButton}
              onClick={() =>
                showToast("Profile editor is ready for your updates")
              }
            >
              <Edit3 size={15} /> Edit profile
            </button>
          </div>
        </section>

        <div className={styles.profileLayout}>
          <div className={styles.mainColumn}>
            <section className={styles.card}>
              <div className={styles.sectionHeading}>
                <div>
                  <span className={styles.eyebrow}>A little about me</span>
                  <h2>Work that feels clear, useful, and human.</h2>
                </div>
                <button
                  className={styles.iconButton}
                  onClick={() => showToast("About section selected")}
                  aria-label="Edit about section"
                >
                  <Edit3 size={14} />
                </button>
              </div>
              <p className={styles.bio}>
                {freelancerProfile.bio} I partner closely with founders and
                product teams to turn complex ideas into experiences people can
                trust.
              </p>
              <div className={styles.infoGrid}>
                <div>
                  <Globe2 size={15} />
                  <span>English, Mandarin</span>
                </div>
                <div>
                  <ShieldCheck size={15} />
                  <span>Identity verified</span>
                </div>
                <div>
                  <CheckCircle2 size={15} />
                  <span>
                    {freelancerProfile.completionRate}% completion rate
                  </span>
                </div>
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.sectionHeading}>
                <div>
                  <span className={styles.eyebrow}>What I offer</span>
                  <h2>Services</h2>
                </div>
                <button
                  className={styles.addButton}
                  onClick={() => showToast("New service draft started")}
                >
                  <Plus size={14} /> Add service
                </button>
              </div>
              <div className={styles.services}>
                {freelancerServices.map((service) => (
                  <FreelancerServiceRow key={service.id} service={service} />
                ))}
              </div>
            </section>

            <section className={styles.card}>
              <div className={styles.sectionHeading}>
                <div>
                  <span className={styles.eyebrow}>
                    Strengthen your presence
                  </span>
                  <h2>Profile checklist</h2>
                </div>
                <span className={styles.complete}>85% complete</span>
              </div>
              <div className={styles.checklist}>
                <div className={styles.done}>
                  <span>
                    <Check size={13} />
                  </span>
                  <div>
                    <strong>Profile photo and introduction</strong>
                    <small>Help clients understand your point of view.</small>
                  </div>
                </div>
                <div className={styles.done}>
                  <span>
                    <Check size={13} />
                  </span>
                  <div>
                    <strong>Skills and working preferences</strong>
                    <small>Make your best-fit briefs easier to find.</small>
                  </div>
                </div>
                <button
                  className={styles.todo}
                  onClick={() => showToast("Case study editor is coming next")}
                >
                  <span>
                    <Plus size={13} />
                  </span>
                  <div>
                    <strong>Add one case study</strong>
                    <small>Show how you think, not just what you make.</small>
                  </div>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <section className={styles.card}>
              <div className={styles.sectionHeading}>
                <div>
                  <span className={styles.eyebrow}>Work preferences</span>
                  <h2>Availability</h2>
                </div>
                <span
                  className={
                    availability === "available"
                      ? styles.liveBadge
                      : styles.awayBadge
                  }
                >
                  {availability === "available" ? "Live" : "Away"}
                </span>
              </div>
              <p className={styles.sideCopy}>
                {availability === "available"
                  ? "Your profile is visible to clients looking for a creative partner."
                  : "You are hidden from new brief matches until you are ready."}
              </p>
              <button
                className={styles.availabilityButton}
                onClick={toggleAvailability}
              >
                {availability === "available"
                  ? "Take a short break"
                  : "Available for work"}
              </button>
            </section>
            <section className={styles.card}>
              <div className={styles.sectionHeading}>
                <div>
                  <span className={styles.eyebrow}>The numbers</span>
                  <h2>Highlights</h2>
                </div>
              </div>
              <div className={styles.highlights}>
                <div>
                  <strong>48</strong>
                  <span>reviews</span>
                </div>
                <div>
                  <strong>32</strong>
                  <span>projects</span>
                </div>
                <div>
                  <strong>2h</strong>
                  <span>response</span>
                </div>
              </div>
              <div className={styles.sideRule} />
              <p className={styles.sideCopy}>
                Top 12% of designers in your categories this month.
              </p>
            </section>
            <section className={styles.noteCard}>
              <div className={styles.noteIcon}>
                <CheckCircle2 size={17} />
              </div>
              <div>
                <strong>Keep it fresh</strong>
                <p>
                  Profiles with a recent case study get more thoughtful
                  conversations.
                </p>
                <button
                  onClick={() => showToast("Case study editor is coming next")}
                >
                  Add a case study <ArrowUpRight size={13} />
                </button>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </AppLayout>
  );
};

export default FreelancerProfilePage;
