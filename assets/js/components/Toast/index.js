import React from 'react';
import Types from 'prop-types';

import styles from './index.module.scss';

export default function Toast({ message, isVisible }) {
  return (
    <div className={containerStyles(isVisible)}>
      <div className={styles.Container__Inner}>{message}</div>
    </div>
  );
}

Toast.propTypes = {
  message: Types.string.isRequired,
  isVisible: Types.bool.isRequired,
};

let containerStyles = isVisible =>
  isVisible ? styles['Container--Visible'] : styles.Container;
