import { FunctionComponent } from "react";
import styles from "./Footer.module.css";

export type FooterType = {
  className?: string;
};

const Footer: FunctionComponent<FooterType> = ({ className = "" }) => {
  return (
    <div className={[styles.footer, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.logocontainer}>
          <img
            className={styles.logoWhiteIcon}
            alt=""
            src="/logo-white@2x.png"
          />
        </div>
        <div className={styles.copyrightText}>Copyright GigHub Ltd. 2024</div>
        <div className={styles.socialMediaLinks}>
          <img
            className={styles.youtubeLinkIcon}
            alt=""
            src="/youtube-link.svg"
          />
          <img
            className={styles.linkedinLinkIcon}
            alt=""
            src="/linkedin-link.svg"
          />
          <img
            className={styles.twitterLinkIcon}
            alt=""
            src="/twitter-link.svg"
          />
          <img
            className={styles.facebookLinkIcon}
            alt=""
            src="/facebook-link@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
