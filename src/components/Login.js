import React, {Fragment, useState, useContext, useEffect} from 'react';
import UserContext from '../context/user/UserContext';
import AlertContext from '../context/alert/alertContext';
import Header from './Header';
import Alerts from './Alerts';

const Login = props => {

  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);

  const {setAlert} = alertContext;
  const {login, error, clearErrors} = userContext;

  useEffect(() => {


    if(error !== null){
      setAlert(error);
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error]);

  const [user, setUser] = useState({
    username : '',
    password : ''
  });

  const { username, password } = user;

  const onChange = event => setUser({...user, [event.target.name] : event.target.value});

  const onSubmit = event => {
    event.preventDefault();
    if(username === '' || password === ''){
      setAlert('Please fill all the fields');
    }else {
      login({
        username,
        password
      });
    }
  };

  return(
    <Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <Alerts />
            <form onSubmit = {onSubmit}
              style={{
                border : '1px solid gray',
                padding : '10px',
                borderRadius : '5px',
                boxShadow : '0px 0px 3px 3px gray'
              }}>
              <div className="form-group row">
                <label htmlFor="username" className="col-form-label col-12 col-md-2 h6">UserName </label>
                <div className="col-12 col-md-10">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    placeholder="UserName"
                    value = {username}
                    onChange = {onChange}
                    />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-12 col-md-2 h6">Password </label>
                <div className="col-12 col-md-10">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="password"
                    value = {password}
                    onChange = {onChange}
                    />
                </div>
              </div>
              <div className="col-12 col-md-4 offset-md-2">
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
