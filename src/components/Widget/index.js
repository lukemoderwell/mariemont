import React from 'react';
import cx from 'classnames';
import styles from './Widget.module.scss';

export default function Widget({ title, children, className }) {
  return (
    <React.Fragment>
      <h4 className={styles.widgetTitle}>{title}</h4>
      <div className={cx(styles.widget, className)}>{children}</div>
    </React.Fragment>
  );
}
