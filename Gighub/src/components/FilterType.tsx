import { FunctionComponent } from "react";
import styles from "./FilterType.module.css";

export type FilterTypeType = {
  icon?: string;
  text?: string;
};

const FilterType: FunctionComponent<FilterTypeType> = ({
  icon = "/icon1.svg",
  text = "Text",
}) => {
  return (
    <div className={styles.filterType}>
      <img className={styles.icon} alt="" src={icon} />
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default FilterType;
