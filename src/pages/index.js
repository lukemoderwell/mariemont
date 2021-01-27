import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.scss';
import Select from '../components/Select';
import CoreMetricsWidget from '../components/CoreMetricsWidget';
import PieWidget from '../components/PieWidget';
import ListWidget from '../components/ListWidget';

export default function Dashboard() {
  const now = new Date().getTime();
  const dayMs = 86400 * 1000;
  const weekMs = dayMs * 7;
  const [data, setData] = useState([]);
  const [end, setEnd] = useState(now - weekMs);
  const [previousEnd, setPreviousEnd] = useState(end - weekMs);
  const [timestamp, setTimestamp] = useState('');
  const dateRangeOptions = [
    {
      label: '7 Days',
      value: now - weekMs,
      previous: end - weekMs,
    },
    {
      label: '30 Days',
      value: now - dayMs * 30,
      previous: end - dayMs * 30,
    },
    {
      label: '90 Days',
      value: now - dayMs * 90,
      previous: end - dayMs * 90,
    },
    {
      label: '365 Days',
      value: now - dayMs * 365,
      previous: end - dayMs * 365,
    },
  ];

  const sortBy = (arr, key) => {
    return [...arr].sort((a, b) => {
      if (a[key] < b[key]) {
        return 1;
      }
      if (a[key] > b[key]) {
        return -1;
      }
      return 0;
    });
  };

  const topVideos = sortBy(data, 'views');

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
      label: 'YouTube',
      angle: countMetric(
        data.filter((item) => item.medium === 'youtube'),
        'views',
        now,
        end
      ),
      color: '#fc4739',
    },
    {
      label: 'Facebook',
      angle: countMetric(
        data.filter((item) => item.medium === 'facebook'),
        'views',
        now,
        end
      ),
      color: '#4267b2',
    },
  ];

  const averageViewDuration = averageMetric(
    data,
    'average_view_duration',
    now,
    end
  );

  const minutes = Math.floor(averageViewDuration / 60);
  const seconds = averageViewDuration - minutes * 60;

  const coreMetricsData = [
    {
      title: 'Views',
      value: countMetric(data, 'views', now, end),
      change: percentDifferent(
        countMetric(data, 'views', now, end),
        countMetric(data, 'views', end, previousEnd)
      ),
    },
    {
      title: 'Likes',
      value: countMetric(data, 'likes', now, end),
      change: percentDifferent(
        countMetric(data, 'likes', now, end),
        countMetric(data, 'likes', end, previousEnd)
      ),
    },
    {
      title: 'Comments',
      value: countMetric(data, 'comments', now, end),
      change: percentDifferent(
        countMetric(data, 'comments', now, end),
        countMetric(data, 'comments', end, previousEnd)
      ),
    },
  ];

  useEffect(() => {
    const closest = [...dateRangeOptions].sort(
      (a, b) => Math.abs(end - a.value) - Math.abs(end - b.value)
    );
    setPreviousEnd(closest[0].previous);
  }, [end]);

  useEffect(() => {
    const url = 'https://aws-dependencies.s3.us-east-2.amazonaws.com/data.json';
    fetch(url)
      .then((response) => response.json())
      .then((stringifiedData) => {
        setData(stringifiedData);
        setTimestamp(
          new Date(stringifiedData[0].date_published).toDateString()
        );
      })
      .catch((error) => console.log(`Failed because: ${error}`));
  }, []);

  return data !== [] ? (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h4 className={styles.title}>MCC Video Dashboard</h4>
        <span className={styles.subtitle}>{`updated ${timestamp}`}</span>
        <h4
          className={styles.date}
          style={{
            marginLeft: 'auto',
          }}>
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
        <CoreMetricsWidget metrics={coreMetricsData} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '2rem',
          }}>
          <div>
            <PieWidget data={pieData} />
          </div>
          <div>
            <ListWidget
              data={topVideos.filter(
                (video) =>
                  video.date_published <= now && video.date_published >= end
              )}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
