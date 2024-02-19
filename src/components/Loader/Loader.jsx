import React from 'react';
import { Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import styles from './Loader.module.css';

export const MyLoader = () => {
  return (
    <div className={styles.loader_container}>
      <Loader active inline="centered" />
    </div>
  );
};
