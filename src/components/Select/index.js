import React from 'react';
import styles from './Select.module.scss';

export default function Select({ label, options, value, handleChange }) {
  return (
    <fieldset className={styles.Select}>
      <label>{label}</label>
      <select value={value} onChange={handleChange}>
        {options.map((opt, index) => (
          <option key={index} value={opt.value} selected={opt.value === value}>
            {opt.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
}
