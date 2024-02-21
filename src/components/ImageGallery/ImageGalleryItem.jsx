import React, { Component } from 'react';
import { Modal } from '../Modal/Modal';
import styles from './ImageGallery.module.css';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prev => ({ isModalOpen: !prev.isModalOpen }));
  };

  render() {
    const { URL, largeURL, description, id } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <li
          className={styles.image_gallery_item}
          onClick={this.toggleModal}
          id={id}
        >
          <img
            className={styles.image_gallery_item}
            src={URL}
            alt={description}
          />
        </li>
        {isModalOpen && (
          <Modal
            imageUrl={largeURL}
            toggleModal={this.toggleModal}
            description={description}
          />
        )}
      </>
    );
  }
}
