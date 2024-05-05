import React, { useState } from 'react';
import css from './toggle.module.css';
import { IToggle } from './toggle';

export const Toggle: React.FC<IToggle> = ({ checked, onChange }) => {
  return (
    <label className={css['toggle-wrapper']}>
      <input
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className={css['toggle-input']}
        type="checkbox"
      />

      <span className={css['toggle-slider']}>
        <span className={css['toggle-pointer']}></span>
      </span>
    </label>
  );
};
