import { FunctionComponent, useEffect } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  DollarSign,
  Eye,
  MapPin,
  Pencil,
  Plus,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import FreelancerBriefCard from "../components/freelancer/FreelancerBriefCard";
import FreelancerMetricCard from "../components/freelancer/FreelancerMetricCard";
import FreelancerServiceRow from "../components/freelancer/FreelancerServiceRow";
import {
  freelancerBriefs,
  freelancerProfile,
  useGigHubStore,
} from "../store/useGigHubStore";
import styles from "./FreelancerDashboardPage.module.css";

const FreelancerDashboardPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const savedBriefIds = useGigHubStore(
    (state) => state.freelancerSavedBriefIds,
  );
  const appliedBriefIds = useGigHubStore(
    (state) => state.freelancerAppliedBriefIds,
  );
  const availability = useGigHubStore((state) => state.freelancerAvailability);
  const services = useGigHubStore((state) => state.services);
  const mode = useGigHubStore((state) => state.mode);
  const setMode = useGigHubStore((state) => state.setMode);
  const toggleSaved = useGigHubStore(
    (state) => state.toggleFreelancerBriefSaved,
  );
  const applyToBrief = useGigHubStore((state) => state.applyToBrief);
  const toggleAvailability = useGigHubStore(
    (state) => state.toggleFreelancerAvailability,
  );

  useEffect(() => {
    if (mode !== "freelancer") {
      setMode("freelancer");
    }
  }, [mode, setMode]);

  return (
    <AppLayout className={styles.page}>
      <main className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>
              <Sparkles size={13} /> Freelancer workspace
            </span>
            <h1>Make your next project count.</h1>
            <p>
              Good morning, {freelancerProfile.name.split(" ")[0]}. We found
              fresh briefs that fit your skills and your ambition.
            </p>
            <div className={styles.heroActions}>
              <button
                className={styles.primaryButton}
                onClick={() => navigate("/freelancer/profile")}
              >
                <Pencil size={15} /> Edit profile
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => navigate("/search")}
              >
                <SlidersHorizontal size={15} /> Browse marketplace
              </button>
            </div>
          </div>
          <div className={styles.profileCard}>
            <div className={styles.profileTop}>
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
              <div className={styles.availabilityCopy}>
                <strong>
                  {availability === "available"
                    ? "Available for work"
                    : "Taking a short break"}
                </strong>
                <span>
                  {availability === "available"
                    ? "Open to new projects"
                    : "You won’t appear in new matches"}
                </span>
              </div>
              <button
                className={styles.moreButton}
                onClick={toggleAvailability}
                aria-label="Toggle availability"
              >
                <SlidersHorizontal size={16} />
              </button>
            </div>
            <h2>{freelancerProfile.name}</h2>
            <p>
              {freelancerProfile.role} <span>·</span> <MapPin size={12} />{" "}
              {freelancerProfile.location}
            </p>
            <div className={styles.progressLabel}>
              <span>Profile strength</span>
              <strong>{freelancerProfile.profileStrength}%</strong>
            </div>
            <div className={styles.progressTrack}>
              <span
                style={{ width: `${freelancerProfile.profileStrength}%` }}
              />
            </div>
            <small>Complete your portfolio to unlock more matches.</small>
          </div>
        </section>

        <section className={styles.metrics} aria-label="Freelancer performance">
          <FreelancerMetricCard
            label="This month"
            value="$2,840"
            detail="↑ 18% from last month"
            icon={<DollarSign />}
            tone="purple"
          />
          <FreelancerMetricCard
            label="Active projects"
            value="4"
            detail="2 due this week"
            icon={<BriefcaseBusiness />}
            tone="teal"
          />
          <FreelancerMetricCard
            label="Profile views"
            value="186"
            detail="↑ 24% this week"
            icon={<Eye />}
            tone="orange"
          />
        </section>

        <section className={styles.dashboardGrid}>
          <div className={styles.mainColumn}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.eyebrow}>Curated for you</span>
                <h2>Recommended briefs</h2>
                <p>
                  Projects matched to your services, style, and availability.
                </p>
              </div>
              <button
                className={styles.textButton}
                onClick={() => navigate("/search")}
              >
                View all briefs <ArrowUpRight size={14} />
              </button>
            </div>
            <div className={styles.briefList}>
              {freelancerBriefs.map((brief) => (
                <FreelancerBriefCard
                  key={brief.id}
                  brief={brief}
                  saved={savedBriefIds.includes(brief.id)}
                  applied={appliedBriefIds.includes(brief.id)}
                  onSave={() => toggleSaved(brief.id)}
                  onApply={() => applyToBrief(brief.id)}
                />
              ))}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <section className={styles.sideCard}>
              <div className={styles.sideHeading}>
                <div>
                  <span className={styles.eyebrow}>At a glance</span>
                  <h2>Your profile</h2>
                </div>
                <button
                  className={styles.iconButton}
                  onClick={() => navigate("/freelancer/profile")}
                  aria-label="Edit profile"
                >
                  <Pencil size={14} />
                </button>
              </div>
              <div className={styles.profileStats}>
                <div>
                  <strong>{freelancerProfile.rating}</strong>
                  <span>Rating</span>
                </div>
                <div>
                  <strong>{freelancerProfile.completionRate}%</strong>
                  <span>Completion</span>
                </div>
                <div>
                  <strong>
                    {freelancerProfile.responseTime.replace("within ", "")}
                  </strong>
                  <span>Response</span>
                </div>
              </div>
              <div className={styles.skills}>
                <span className={styles.eyebrow}>Top skills</span>
                <div>
                  {freelancerProfile.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
              <button
                className={styles.fullButton}
                onClick={() => navigate("/freelancer/profile")}
              >
                View public profile <ArrowUpRight size={14} />
              </button>
            </section>

            <section className={styles.sideCard}>
              <div className={styles.sideHeading}>
                <div>
                  <span className={styles.eyebrow}>Your storefront</span>
                  <h2>Active services</h2>
                </div>
                <span className={styles.countBadge}>{services.length}</span>
              </div>
              <div className={styles.serviceList}>
                {services.map((service) => (
                  <FreelancerServiceRow key={service.id} service={service} />
                ))}
              </div>
              <button
                className={`${styles.fullButton} ${styles.addServiceButton}`}
                onClick={() => navigate("/freelancer/services/new")}
              >
                <Plus size={14} /> Add a service
              </button>
              <button
                className={styles.fullButton}
                style={{ marginTop: 8 }}
                onClick={() => navigate("/freelancer/services")}
              >
                Manage services <ArrowUpRight size={14} />
              </button>
            </section>

            <section className={styles.tipCard}>
              <div className={styles.tipIcon}>
                <CheckCircle2 size={18} />
              </div>
              <div>
                <strong>Stand out this week</strong>
                <p>
                  Add one recent case study to lift your profile visibility.
                </p>
                <button onClick={() => navigate("/freelancer/profile")}>
                  Add case study <ArrowUpRight size={13} />
                </button>
              </div>
            </section>
          </aside>
        </section>

        <section className={styles.bottomBanner}>
          <div>
            <span className={styles.eyebrow}>Need a reset?</span>
            <h2>Refresh your availability and get discovered.</h2>
          </div>
          <div className={styles.bannerMeta}>
            <span>
              <Clock3 size={15} /> Response time{" "}
              {freelancerProfile.responseTime}
            </span>
            <span>
              <Users size={15} /> {freelancerProfile.reviews} client reviews
            </span>
            <button onClick={toggleAvailability}>
              {availability === "available" ? "Set away" : "Available now"}
            </button>
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default FreelancerDashboardPage;
