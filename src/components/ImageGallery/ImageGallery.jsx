import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, onClick }) {
  return (
    <div>
      <ul className={css.imageGallery}>
        <ImageGalleryItem images={images} onClick={onClick} />
      </ul>
    </div>
  );
}
