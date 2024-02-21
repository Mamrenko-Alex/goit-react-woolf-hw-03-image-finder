import { ImageGalleryItem } from './ImageGalleryItem';
import styles from './ImageGallery.module.css';
import { nanoid } from 'nanoid';

export const ImageGallery = ({ images }) => {
  return (
    <>
      <span id="image_gallery_js"></span>
      <ul className={styles.image_gallery}>
        {images.map(({ webformatURL, id, largeImageURL }) => (
          <ImageGalleryItem
            key={nanoid()}
            id={id}
            URL={webformatURL}
            largeURL={largeImageURL}
          />
        ))}
      </ul>
    </>
  );
};
