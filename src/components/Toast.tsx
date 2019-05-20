import React, { FC } from 'react';

type Props = {
  message: string;
  // isVisible: boolean
};

let Toast: FC<Props> = ({ message }) => (
  <div>
    <div>{message}</div>
  </div>
);

export default Toast;

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
