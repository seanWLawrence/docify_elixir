import React from 'react';
import Types from 'prop-types';

import styles from './index.module.scss';

export default function Spinner({ isLoading }) {
  return (
    <div className={styles.Container}>
      <div className={isLoading ? styles['Loading--One'] : styles.Hidden} />
      <div className={isLoading ? styles['Loading--Two'] : styles.Hidden} />
      <div className={isLoading ? styles['Loading--Three'] : styles.Hidden} />
    </div>
  );
}

Spinner.propTypes = {
  isLoading: Types.bool,
};
