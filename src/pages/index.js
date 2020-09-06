import React, { useState } from 'react';
import styles from './Dashboard.module.scss';
import Select from '../components/Select';
import data from '../../data.json';
import CoreMetrics from '../components/CoreMetrics';
import PieWidget from '../components/PieWidget';

export default function Dashboard() {
  const now = new Date().getTime();
  const dayMs = 86400 * 1000;
  const weekMs = dayMs * 7;
  const [end, setEnd] = useState(now - weekMs);
  const dateRangeOptions = [
    {
      label: '7 Days',
      value: now - weekMs,
    },
    {
      label: '30 Days',
      value: now - dayMs * 30,
    },
    {
      label: '90 Days',
      value: now - dayMs * 90,
    },
    {
      label: '365 Days',
      value: now - dayMs * 365,
    },
  ];

  const sortBy = (arr, key) => {
    return arr.sort((a, b) => {
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] > b[key]) {
        return -1;
      }
      return 0;
    });
  };

  const mostRecentVideo = sortBy(data, 'date_publihsed')[0];

  const sortedByViews = data.sort((a, b) => {
    if (a.views < b.views) {
      return 1;
    }
    if (a.views > b.views) {
      return -1;
    }
    return 0;
  });

  const countMetric = (arr, key, startDate, endDate) => {
    let _count = 0;
    arr.forEach((item) => {
      if (item.date_published < startDate && item.date_published > endDate) {
        _count += item[key];
      }
    });
    return _count;
  };

  const averageMetric = (arr, key, startDate, endDate) => {
    let _total = 0;
    let _amount = 0;
    arr.forEach((item) => {
      if (item.date_published < startDate && item.date_published > endDate) {
        _total += item[key];
        _amount += 1;
      }
    });
    const result = _total / _amount;
    return `${Math.ceil(result)}`;
  };

  const percentDifferent = (a, b) => {
    return Math.round(((a - b) / ((a + b) / 2)) * 100);
  };

  const pieData = [
    {
      title: 'YouTube',
      value: countMetric(
        data.filter((item) => item.medium === 'youtube'),
        'views',
        now,
        end,
      ),
      color: '#fc4739',
    },
    {
      title: 'Facebook',
      value: countMetric(
        data.filter((item) => item.medium === 'facebook'),
        'views',
        now,
        end,
      ),
      color: '#4267b2',
    },
  ];

  const coreMetrics = [
    {
      title: 'Views',
      value: countMetric(data, 'views', now, end),
      change: percentDifferent(
        countMetric(data, 'views', now, end),
        countMetric(data, 'views', end, end - weekMs),
      ),
    },
    {
      title: 'Likes',
      value: countMetric(data, 'likes', now, end),
      change: percentDifferent(
        countMetric(data, 'likes', now, end),
        countMetric(data, 'likes', end, end - weekMs),
      ),
    },
    {
      title: 'Comments',
      value: countMetric(data, 'comments', now, end),
      change: percentDifferent(
        countMetric(data, 'comments', now, end),
        countMetric(data, 'comments', end, end - weekMs),
      ),
    },
    {
      title: 'Avg. View Percentage',
      value: averageMetric(data, 'average_view_percentage', now, end),
      change: percentDifferent(
        averageMetric(data, 'average_view_percentage', now, end),
        averageMetric(data, 'average_view_percentage', end, end - weekMs),
      ),
    },
    {
      title: 'Avg. View Duration',
      value: averageMetric(data, 'average_view_duration', now, end),
      change: percentDifferent(
        averageMetric(data, 'average_view_duration', now, end),
        averageMetric(data, 'average_view_duration', end, end - weekMs),
      ),
    },
  ];

  console.log(data.filter((item) => item.medium === 'facebook'));
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h4 className={styles.title}>MCC Video Metrics </h4>
        <span className={styles.subtitle}>
          {`updated ${new Date(mostRecentVideo.date_published).toDateString()}`}
        </span>
        <h4
          className={styles.date}
          style={{
            marginLeft: 'auto',
          }}
        >
          <Select
            label="Date Range"
            value={dateRangeOptions.find((item) => item.value === end)}
            options={dateRangeOptions}
            handleChange={(event) => {
              setEnd(Number(event.target.value));
            }}
          />
        </h4>
      </header>
      <div className={styles.main}>
        <CoreMetrics metrics={coreMetrics} />
        <div style={{ maxWidth: '50%' }}>
          <PieWidget data={pieData} />
        </div>
        {/* <div>
          <span className={styles.tag}>Top 5 Most Popular Videos</span>
          {sortedByViews.slice(0, 5).map((item) => (
            <h4 key={item.id}>
              {item.title || item.description} {item.views} {item.medium}
            </h4>
          ))}
        </div> */}
      </div>
    </div>
  );
}
