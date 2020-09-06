import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Widget from '../Widget';
import styles from './PieWidget.module.scss';

export default function PieWidget({ data }) {
  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };
  return (
    <Widget title="Views By Platform">
      <PieChart
        data={data}
        radius={PieChart.defaultProps.radius - 8}
        label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
        labelStyle={defaultLabelStyle}
        style={{ maxWidth: '80%', maxHeight: '80%', marginLeft: '10%' }}
      />
    </Widget>
  );
}
