import React, { ReactNode, FC } from 'react';
import { hot } from 'react-hot-loader/root';

type Props = {
  children: ReactNode;
};

let App: FC<Props> = ({ children }) => <>{children}</>;

export default hot(App);
