import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import Widget from '../Widget';
import styles from './PieWidget.module.scss';

export default function PieWidget({ data }) {
  const defaultLabelStyle = {
    fontSize: '5px',
    fill: 'white',
  };
  return (
    <Widget title="Views By Platform">
      <PieChart
        data={data}
        radius={PieChart.defaultProps.radius - 8}
        label={({ dataEntry }) =>
          dataEntry.title + ' ' + Math.round(dataEntry.percentage) + '%'
        }
        labelStyle={defaultLabelStyle}
        style={{ maxWidth: '80%', maxHeight: '80%', marginLeft: '10%' }}
      />
    </Widget>
  );
}
