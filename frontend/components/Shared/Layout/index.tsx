import React from "react";
import styles from "./styles.module.css";
const AppLayout = (props: any) => {
  return <div className={styles.layout}>{props.children}</div>;
};

export default AppLayout;
