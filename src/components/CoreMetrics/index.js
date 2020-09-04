import React from 'react';
import styles from './CoreMetrics.module.scss';
import Widget from '../Widget';

export default function CoreMetrics({ metrics }) {
  return (
    <Widget title="Core Metrics">
      <div className={styles.totals}>
        {metrics.map((metric) => (
          <div className={styles.stat} key={metric.title}>
            <p className={styles.title}>{metric.title}</p>
            <span className={styles.count}>{metric.value}</span>
            <p className={styles.change}>{metric.change}</p>
          </div>
        ))}
      </div>
    </Widget>
  );
}
