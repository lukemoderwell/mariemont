import React from 'react';
import styles from './Dashboard.module.scss';
import Select from '../components/Select';
import data from '../../data.json';

export default function Dashboard() {
  const now = new Date().getTime();
  const sortedByDate = data.sort((a, b) => {
    return Math.abs(now - a.date_published) - Math.abs(now - b.date_published);
  });

  const dayInSeconds = 86400 * 1000;
  const weekInSeconds = dayInSeconds * 7;
  const getViews = (arr, start = now, end = now - weekInSeconds) => {
    let _views = 0;
    arr.forEach((item) => {
      if (item.date_published < start && item.date_published > end) {
        _views += item.views;
      }
    });
    return _views;
  };
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h4 className={styles.title}>MCC Video Metrics</h4>
        <h4
          className={styles.date}
          style={{
            marginLeft: 'auto',
          }}
        >
          <Select
            label="Date Range"
            options={['Last 7 Days', 'Last 30 Days', 'Last 90 Days']}
          />
        </h4>
      </header>
      <div className={styles.main}>
        <div className={styles.totals}>
          <div className={styles.stat}>
            <p>Total</p>
            <span className={styles.count}>{getViews(data)}</span>
            <p className={styles.change}></p>
          </div>
          <div className={styles.stat}>
            <p>Facebook</p>
            <span className={styles.count}>
              {getViews(data.filter((d) => d.medium === 'facebook'))}
            </span>
            <p className={styles.change}></p>
          </div>
          <div className={styles.stat}>
            <p> YouTube </p>
            <span className={styles.count}>
              {getViews(data.filter((d) => d.medium === 'youtube'))}
            </span>
            <p className={styles.change}></p>
          </div>
          {/* <div className={styles.stat}>
            <p> Website </p>
            <span className={styles.count}>33</span>
            <p className={styles.change}></p>
          </div> */}
        </div>
        {/* <div className={styles.summary}>
          <span className={styles.tag}> Summary </span>
          <p>
            There were
            <strong>
              
              {current.total}
              views
            </strong>
            for <strong> Who Is The Holy Spirit ? </strong> during the week of
            August 9 th— August 15 th.This totals <strong> 1014 views </strong>
            for the entire <strong> ReThink </strong> series starting July 5th.
          </p>
        </div> */}
      </div>
      <div className={styles.footer}>{`last synced on ${new Date(
        sortedByDate[0].date_published,
      ).toDateString()}`}</div>
    </div>
  );
}
