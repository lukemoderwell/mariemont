import React from 'react';
import Widget from '../Widget';
import styles from './ListWidget.module.scss';

export default function ListWidget({ data }) {
  console.log(data);
  return (
    <Widget title="Most Viewed Videos">
      <ul className={styles.list}>
        {data.map((item) => (
          <li className={styles.listItem} key={item.id}>
            <h4 className={styles.title}>
              {item.title || item.description || 'Untitled Video'}
            </h4>
            <a href={item.source} target="_blank" className={styles.link}>
              {item.medium}
              <svg
                className={styles.linkIcon}
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
              </svg>
            </a>
            <span className={styles.metric}>{item.views} views</span>
          </li>
        ))}
      </ul>
    </Widget>
  );
}
