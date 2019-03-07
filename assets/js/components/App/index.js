import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';

let App = ({ children }) => {
  return <>{children}</>;
};

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default hot(App);
