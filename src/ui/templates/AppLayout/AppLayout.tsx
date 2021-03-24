import React from 'react';

import './_AppLayout.scss';

const AppLayout: React.FC = ({ children }) => {
  return <div className="layout">{children}</div>;
};

export default AppLayout;
