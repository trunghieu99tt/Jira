import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// components
import PrivateRoute from '@components/routes/PrivateRoute';

const PrivateRouteController = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route element={<div>Not found</div>} />
      </Routes>
    </React.Fragment>
  );
};

export default PrivateRouteController;
