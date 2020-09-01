import React from 'react';
import styles from './Select.module.scss';

export default function Select({ label, options, onChange }) {
  return (
    <fieldset className={styles.Select}>
      <label for="select">{label}</label>
      <select id="select">
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </fieldset>
  );
}
