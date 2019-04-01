import React from 'react';
import Types from 'prop-types';

export default function Toast({ message, isVisible }) {
  return (
    <div>
      <div>{message}</div>
    </div>
  );
}

Toast.propTypes = {
  message: Types.string.isRequired,
  isVisible: Types.bool.isRequired,
};

// let containerStyles = isVisible =>
//   isVisible ? styles['Container--Visible'] : styles.Container;

// @import '../../../scss/index.scss';

// .Container {
//   position: absolute;
//   display: block;
//   top: 85vh;
//   left: 0;
//   height: 15vh;
//   width: 100vw;
//   opacity: 0;
//   transition: opacity 2s;

//   @include flexbox(row, center, center);

//   &__Inner {
//     opacity: 0.3;
//     padding: $space * 2 $space * 10;
//     background-color: $color-light;
//   }

//   &--Visible {
//     @extend .Container;
//     opacity: 1;
//   }
// }
