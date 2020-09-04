import React from 'react';
import styles from './Widget.module.scss';

export default function Widget({ title, children }) {
  return (
    <React.Fragment>
      <h4 className={styles.widgetTitle}>{title}</h4>
      <div className={styles.widget}>{children}</div>
    </React.Fragment>
  );
}
