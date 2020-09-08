import React from 'react';
import styles from './CoreMetricsWidget.module.scss';
import Widget from '../Widget';

export default function CoreMetricsWidget({ metrics }) {
  return (
    <Widget title="Core Metrics">
      <div className={styles.totals}>
        {metrics.map((metric) => (
          <div className={styles.stat} key={metric.title}>
            <p className={styles.title}>{metric.title}</p>
            <span className={styles.count}>{metric.value}</span>
            <p
              className={styles.change}
              style={{ color: metric.change >= 0 ? '#47c294' : '#ff6356' }}
            >
              {metric.change}%
            </p>
          </div>
        ))}
      </div>
    </Widget>
  );
}
