import React, {useContext} from 'react';
import AlertContext from '../context/alert/alertContext';

const Alerts = () => {

  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    alerts !== null &&
      <div className='alert alert-danger row' role="alert">
        <i className="fa fa-info-circle"></i> &nbsp; {alerts}
      </div>
  );
};

export default Alerts;
