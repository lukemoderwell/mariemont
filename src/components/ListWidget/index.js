import React from 'react';
import Widget from '../Widget';
import styles from './ListWidget.module.scss';

export default function ListWidget({ data }) {
  return (
    <Widget title="Most Viewed Videos">
      <ul className={styles.list}>
        {data
          .filter((item) => item.title !== null)
          .map((item) => (
            <li className={styles.listItem} key={item.id}>
              <h4 className={styles.title}>{item.title}</h4>
              <span className={styles.medium}>{item.medium}</span>
              <span className={styles.metric}> {item.views} views</span>
            </li>
          ))}
      </ul>
    </Widget>
  );
}
