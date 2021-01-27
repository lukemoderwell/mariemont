import React from 'react';
import { RadialChart } from 'react-vis';
import Widget from '../Widget';
import styles from './PieWidget.module.scss';

export default function PieWidget({ data }) {
  const defaultLabelStyle = {
    fontSize: '18px',
  };
  return (
    <Widget title="Views By Platform" className={styles.container}>
      <RadialChart
        showLabels={true}
        data={data}
        height={300}
        width={300}
        labelsStyle={defaultLabelStyle}></RadialChart>
    </Widget>
  );
}
