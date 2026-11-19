import { FunctionComponent, useState } from "react";
import {
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronRight,
  Heart,
  MapPin,
  Pencil,
  Settings,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { designers, useGigHubStore } from "../store/useGigHubStore";
import styles from "./ProfilePage.module.css";

const ProfilePage: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const favoriteIds = useGigHubStore((state) => state.favoriteIds);
  const showToast = useGigHubStore((state) => state.showToast);
  const profile = designers[1];

  return (
    <AppLayout className={styles.page}>
      <main className={styles.content}>
        <section className={styles.profileCard}>
          <div className={styles.cover}>
            <span>GigHub member since 2024</span>
          </div>
          <div className={styles.profileBody}>
            <div className={styles.avatarWrap}>
              <img src="/avatar.svg" alt="Rachel Morgan" />
              <span className={styles.online}>Online</span>
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileTitle}>
                <div>
                  <span className={styles.kicker}>Employer profile</span>
                  <h1>
                    Rachel Morgan <BadgeCheck size={18} />
                  </h1>
                  <p>
                    <MapPin size={13} /> New York, United States · Product &
                    brand team
                  </p>
                </div>
                <div className={styles.profileActions}>
                  <button
                    onClick={() =>
                      showToast("Profile editor is ready for your updates")
                    }
                  >
                    <Pencil size={14} /> Edit profile
                  </button>
                  <button
                    aria-label="Profile settings"
                    onClick={() =>
                      showToast("Profile settings are coming soon")
                    }
                  >
                    <Settings size={16} />
                  </button>
                </div>
              </div>
              <div className={styles.profileStats}>
                <div>
                  <strong>12</strong>
                  <span>projects posted</span>
                </div>
                <div>
                  <strong>4.9</strong>
                  <span>average rating</span>
                </div>
                <div>
                  <strong>{favoriteIds.length}</strong>
                  <span>saved gigs</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <nav className={styles.profileTabs} aria-label="Profile sections">
          <button
            className={activeTab === "overview" ? styles.activeTab : ""}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={activeTab === "activity" ? styles.activeTab : ""}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
          <button
            className={activeTab === "preferences" ? styles.activeTab : ""}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>
        </nav>
        {activeTab === "overview" && (
          <div className={styles.overviewGrid}>
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <span className={styles.kicker}>Your workspace</span>
                  <h2>Keep projects moving</h2>
                </div>
                <BriefcaseBusiness size={20} />
              </div>
              <div className={styles.workspaceCards}>
                <button onClick={() => useGigHubStore.getState().openBrief()}>
                  <span className={styles.cardIcon}>
                    <BriefcaseBusiness size={19} />
                  </span>
                  <span>
                    <strong>Start a new brief</strong>
                    <small>Tell designers what you’re building next.</small>
                  </span>
                  <ChevronRight size={16} />
                </button>
                <Link to="/saved">
                  <span className={styles.cardIcon}>
                    <Heart size={19} />
                  </span>
                  <span>
                    <strong>Review your shortlist</strong>
                    <small>
                      {favoriteIds.length
                        ? `${favoriteIds.length} saved gigs waiting for you.`
                        : "Save gigs to compare them later."}
                    </small>
                  </span>
                  <ChevronRight size={16} />
                </Link>
                <Link to="/notifications?tab=messages">
                  <span className={styles.cardIcon}>
                    <Bell size={19} />
                  </span>
                  <span>
                    <strong>Check your inbox</strong>
                    <small>
                      Continue the conversation with your creative partners.
                    </small>
                  </span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </section>
            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div>
                  <span className={styles.kicker}>Your creative network</span>
                  <h2>Designers you’ve worked with</h2>
                </div>
                <UsersIcon />
              </div>
              <div className={styles.networkList}>
                {[designers[0], designers[1], designers[4]].map((designer) => (
                  <div key={designer.id}>
                    <img src={designer.avatar} alt="" />
                    <span>
                      <strong>{designer.name}</strong>
                      <small>{designer.description}</small>
                    </span>
                    <Star size={13} fill="currentColor" />
                  </div>
                ))}
              </div>
              <button
                className={styles.viewLink}
                onClick={() => showToast("Designer directory is coming soon")}
              >
                View all designers <ChevronRight size={14} />
              </button>
            </section>
          </div>
        )}
        {activeTab === "activity" && (
          <section className={styles.activityPanel}>
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.kicker}>Recent activity</span>
                <h2>A record of your momentum</h2>
              </div>
              <ShieldCheck size={20} />
            </div>
            {[
              "Posted a new website brief",
              "Saved Esther Phang’s website gig",
              "Completed your profile",
              "Joined GigHub Pro waitlist",
            ].map((activity, index) => (
              <div className={styles.activityRow} key={activity}>
                <span className={styles.activityDot}>
                  {index === 0 ? (
                    <BriefcaseBusiness size={13} />
                  ) : index === 1 ? (
                    <Heart size={13} />
                  ) : index === 2 ? (
                    <Check size={13} />
                  ) : (
                    <Star size={13} />
                  )}
                </span>
                <span>
                  <strong>{activity}</strong>
                  <small>
                    {index + 1} {index === 0 ? "day" : "days"} ago
                  </small>
                </span>
                <ChevronRight size={15} />
              </div>
            ))}
          </section>
        )}
        {activeTab === "preferences" && (
          <section className={styles.preferencesPanel}>
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.kicker}>Preferences</span>
                <h2>Make GigHub feel like yours</h2>
              </div>
              <Settings size={20} />
            </div>
            {[
              "Notify me when a designer replies",
              "Show me projects similar to my shortlist",
              "Send a weekly creative inspiration digest",
            ].map((preference) => (
              <label key={preference}>
                <span>
                  <strong>{preference}</strong>
                  <small>Keep this preference active for your workspace.</small>
                </span>
                <input type="checkbox" defaultChecked />
              </label>
            ))}
          </section>
        )}
        <section className={styles.securityRow}>
          <span>
            <ShieldCheck size={16} /> Your profile is private until you choose
            to share a brief.
          </span>
          <button onClick={() => showToast("Privacy details are coming soon")}>
            Privacy & security <ChevronRight size={14} />
          </button>
        </section>
      </main>
    </AppLayout>
  );
};

const UsersIcon = () => <UserRound size={20} />;

export default ProfilePage;
