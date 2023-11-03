import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = { query: '' };

  handleChange = e =>
    this.setState({ query: e.target.value.toLowerCase().trim() });

  handleSubmit = e => {
    e.preventDefault();
    const searchValue = this.state.query;

    if (searchValue.trim() === '') {
      toast.warn('УПС! 🫤 Введіть значення для пошуку ⌨️ ');
      return;
    }
    this.props.onSubmit(this.state.query);
    // this.resetState();
  };
  // resetState = () => this.setState({ query: '' });
  render() {
    const { query } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>
          <input
            value={query}
            name="input"
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
