import { ImageGalleryItem } from './ImageGalleryItem';
import styles from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={styles.image_gallery}>
      {images.map(({ id, webformatURL }) => (
        <ImageGalleryItem key={id} URL={webformatURL} />
      ))}
    </ul>
  );
};
