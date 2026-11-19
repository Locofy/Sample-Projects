import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export type FooterType = { className?: string };

const Footer: FunctionComponent<FooterType> = ({ className = "" }) => (
  <footer className={[styles.footer, className].join(" ")}>
    <div className={styles.container}>
      <Link to="/" className={styles.logo}>
        <img src="/logo-white@2x.png" alt="GigHub" />
      </Link>
      <nav className={styles.links} aria-label="Footer navigation">
        <Link to="/how-it-works">How it works</Link>
        <Link to="/about">About us</Link>
        <a href="#designers">For designers</a>
        <a href="#support" onClick={(event) => event.preventDefault()}>
          Support
        </a>
        <a href="#support" onClick={(event) => event.preventDefault()}>
          Help
        </a>
      </nav>
      <span className={styles.copyright}>© GigHub Ltd. 2024</span>
      <div className={styles.socials} aria-label="Social links">
        <img src="/youtube-link.svg" alt="" />
        <img src="/linkedin-link.svg" alt="" />
        <img src="/twitter-link.svg" alt="" />
        <img src="/facebook-link@2x.png" alt="" />
      </div>
    </div>
  </footer>
);

export default Footer;
