import React from 'react';
import css from './Button.module.css';

export default function Button({ onClick, children }) {
  return (
    <>
      <button className={css.button} onClick={onClick} type="button">
        {children}
      </button>
    </>
  );
}
