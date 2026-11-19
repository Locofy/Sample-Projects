import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Heart, Mail, UserRound } from "lucide-react";
import { useGigHubStore } from "../store/useGigHubStore";
import SearchBar from "./search/SearchBar";
import styles from "./Header.module.css";

export type HeaderType = {
  className?: string;
};

const Header: FunctionComponent<HeaderType> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [roleOpen, setRoleOpen] = useState(false);
  const mode = useGigHubStore((state) => state.mode);
  const setMode = useGigHubStore((state) => state.setMode);
  const modeLabel =
    mode === "freelancer" ? "I’m a Freelancer" : "I’m an Employer";

  const switchMode = (nextMode: "employer" | "freelancer") => {
    setRoleOpen(false);
    setMode(nextMode);
    navigate(nextMode === "freelancer" ? "/freelancer" : "/");
  };

  return (
    <>
      <div className={styles.proBand}>
        <span>
          Upgrade to <strong>GigHub Pro</strong> for exclusive hiring tools and
          dedicated support!
        </span>
        <button
          onClick={() =>
            useGigHubStore.getState().showToast("Pro tools are coming soon")
          }
        >
          Explore Pro <span aria-hidden="true">↗</span>
        </button>
      </div>
      <header className={[styles.header, className].join(" ")}>
        <div className={styles.container}>
          <Link
            className={styles.logo}
            to={mode === "freelancer" ? "/freelancer" : "/"}
            aria-label="GigHub home"
          >
            <img src="/logo@2x.png" alt="GigHub" />
          </Link>
          <SearchBar />
          <nav className={styles.utilityNav} aria-label="Company navigation">
            <Link to={mode === "freelancer" ? "/freelancer" : "/about"}>
              {mode === "freelancer" ? "Dashboard" : "About"}
            </Link>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/saved">Saved</Link>
          </nav>
          <div className={styles.actions}>
            <div className={styles.roleWrap}>
              <button
                className={styles.roleButton}
                onClick={() => setRoleOpen((open) => !open)}
                type="button"
                aria-expanded={roleOpen}
              >
                <span>{modeLabel}</span>
                <ChevronDown
                  size={14}
                  className={roleOpen ? styles.rotate : ""}
                />
              </button>
              {roleOpen && (
                <div className={styles.roleMenu}>
                  <button onClick={() => switchMode("employer")}>
                    Employer mode {mode === "employer" && <span>✓</span>}
                  </button>
                  <button onClick={() => switchMode("freelancer")}>
                    Freelancer mode {mode === "freelancer" && <span>✓</span>}
                  </button>
                </div>
              )}
            </div>
            <button
              className={styles.iconButton}
              aria-label="Messages"
              onClick={() => navigate("/notifications?tab=messages")}
            >
              <Mail size={18} />
            </button>
            <button
              className={styles.iconButton}
              aria-label="Notifications"
              onClick={() => navigate("/notifications?tab=notifications")}
            >
              <Bell size={18} />
            </button>
            <button
              className={styles.iconButton}
              aria-label="Saved gigs"
              onClick={() => navigate("/saved")}
            >
              <Heart size={18} />
            </button>
            <button
              className={styles.avatarButton}
              aria-label="Open profile"
              onClick={() =>
                navigate(
                  mode === "freelancer" ? "/freelancer/profile" : "/profile",
                )
              }
            >
              <img src="/avatar.svg" alt="" />
              <span className={styles.onlineDot} />
            </button>
          </div>
          <button
            className={styles.mobileProfile}
            aria-label="Open profile"
            onClick={() =>
              navigate(
                mode === "freelancer" ? "/freelancer/profile" : "/profile",
              )
            }
          >
            <UserRound size={19} />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
