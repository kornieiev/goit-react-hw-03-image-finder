import React from 'react';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ images, onClick }) {
  return (
    <>
      {images.map(item => {
        return (
          <li className={css.galleryItem} key={item.id}>
            <img
              className={css.imageItem}
              src={item.webformatURL}
              id={item.id}
              onClick={onClick}
              alt=""
            />
          </li>
        );
      })}
    </>
  );
}
