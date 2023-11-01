import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { photos, currentImgInd } = this.props;

    let currentPhoto = '';
    photos.map(item => {
      if (+currentImgInd === item.id) {
        currentPhoto = item.largeImageURL;
      }
      return currentPhoto;
    });

    return createPortal(
      <div className={css.overlay} onClick={this.handleBackDropClick}>
        <div className={css.modal}>
          <img className={css.img} src={currentPhoto} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
