import React from 'react';
import { hot } from 'react-hot-loader/root';

interface Props {
  children: React.ReactChild;
}

let App = ({ children }: Props) => {
  return <>{children}</>;
};

export default hot(App);
