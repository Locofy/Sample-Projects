import { FunctionComponent, useCallback } from "react";
import styles from "./Header.module.css";

export type HeaderType = {
  className?: string;
};

const Header: FunctionComponent<HeaderType> = ({ className = "" }) => {
  const onDropdownContainerClick = useCallback(() => {
    //TODO: Add Action
  }, []);

  return (
    <div className={[styles.header, className].join(" ")}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img className={styles.logoIcon} alt="" src="/logo@2x.png" />
          <img className={styles.logoicon} alt="" src="/logoicon@2x.png" />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <input
              className={styles.placeholder}
              placeholder="What service are you looking for?"
              type="text"
            />
            <button className={styles.icon}>
              <img
                className={styles.iconamoonsearch}
                alt=""
                src="/iconamoonsearch.svg"
              />
            </button>
          </div>
        </div>
        <div className={styles.ctaContainer}>
          <div className={styles.dropdownParent}>
            <div className={styles.dropdown} onClick={onDropdownContainerClick}>
              <div className={styles.imAnEmployer}>I’m an Employer</div>
              <div className={styles.chevron}>
                <img
                  className={styles.chevronChild}
                  alt=""
                  src="/vector-1.svg"
                />
              </div>
            </div>
            <div className={styles.links}>
              <img className={styles.mailIcon} alt="" src="/mail-icon.svg" />
              <img
                className={styles.mailIcon}
                alt=""
                src="/notification-icon.svg"
              />
              <img className={styles.mailIcon} alt="" src="/like-icon.svg" />
            </div>
          </div>
          <img className={styles.avatarIcon} alt="" src="/avatar.svg" />
        </div>
      </div>
    </div>
  );
};

export default Header;
