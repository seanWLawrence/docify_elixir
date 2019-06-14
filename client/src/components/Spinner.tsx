import React, { FC } from 'react';

const Spinner: FC<{}> = () => <div />;

export default Spinner;

// let Loader = styled.div`
//   position: fixed;
//   top: 50vh;
//   left: 45vw;
//   background-color: ${props.theme.color.primary};
//   height: ${px(props.theme.gap * 3)};
//   width: ${px(props.theme.gap * 3)};
//   border-radius: 100%;
//   margin-right: ${px(props.theme.gap * 3)};
//   animation-name: loading;
//   animation-timing-function: ease-in-out;
//   animation-duration: 1s;
//   animation-iteration-count: infinite;

//   @include tablet {
//     height: $space * 2;
//     width: $space * 2;
//   }

//   @include mobile {
//     height: $space;
//     width: $space;
//   }
// `;

//.Container {
//   @include flexbox(row);
// }

// .Loading {

//   &--One {
//     @extend .Loading;
//   }

//   &--Two {
//     @extend .Loading;
//     animation-duration: 1.125s;
//     left: 47.5vw;
//   }

//   &--Three {
//     @extend .Loading;
//     animation-duration: 1.25s;
//     left: 50vw;
//   }
// }

// @keyframes loading {
//   0% {
//     transform: scale(1);
//   }

//   25% {
//     transform: scale(1.125);
//   }

//   50% {
//     transform: scale(1.25);
//   }

//   75% {
//     transform: scale(1.125);
//   }

//   100% {
//     transform: scale(1);
//   }
// }

// .Hidden {
//   display: none;
// }
