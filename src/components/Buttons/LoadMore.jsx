import React from 'react';
import styles from './LoadMore.module.css';

export const LoadMoreButton = ({ onClick }) => {
  return (
    <button type="button" className={styles.button_load_more} onClick={onClick}>
      Load more
    </button>
  );
};
