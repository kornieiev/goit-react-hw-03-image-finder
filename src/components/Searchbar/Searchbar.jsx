import React from 'react';
import css from './Searchbar.module.css';

export default function Searchbar({ inputValue, onChange, onSubmit }) {
  return (
    <>
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={onSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            name="input"
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}
