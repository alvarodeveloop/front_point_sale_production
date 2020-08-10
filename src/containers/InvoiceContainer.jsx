
import React from 'react';
import { Route } from 'react-router-dom';

const InvoiceContainer = ({ component: Component,...rest }) => (
  <React.Suspense fallback={<div>Loading... </div>}>
    <Route
      {...rest}
      render={props => (

          <Component {...props} />

      )}
    />
  </React.Suspense>
);

export default InvoiceContainer;
