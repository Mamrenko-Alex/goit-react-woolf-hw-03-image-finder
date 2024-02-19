import { Modal } from 'components/Modal/Modal';
import styles from './ImageGallery.module.css';

const openModal = imageURL => {
  this.setState({
    isModalOpen: true,
    imageURL: imageURL,
  });
};

const closeModal = () => {
  this.setState({
    isModalOpen: false,
    imageURL: '',
  });
};

export const ImageGalleryItem = ({ URL, largeURL, description }) => {
  return (
    <li
      className={styles.image_gallery_item}
      onClick={() => openModal(largeURL)}
    >
      <img className={styles.image_gallery_item} src={URL} alt={description} />
      {/* <Modal /> */}
    </li>
  );
};
