import React, {Fragment} from 'react';

const Header = () => {
  return (
    <Fragment>
      <div className="jumbotron d-none d-md-block">
        <center>
          <div className="container">
            <img src="images.jpeg" alt="KCT" style={{float : 'left', width : '150px'}} />
            <img src="ece_logo.png" alt="ECE" style={{float : 'right', width : '150px'}} />
            <h1>Department of Electronics & Communication Engineering</h1>
            <h2>Kumaraguru College of Technology</h2>
          </div>
        </center>
      </div>
      <div className="jumbotron d-block d-md-none">
        <center>
          <div className="container">
            <img src="images.jpeg" alt="KCT" style={{float : 'left', width : '50px'}} />
            <h1 style={{float : 'left'}}> &nbsp;KCT</h1>
            <img src="ece_logo.png" alt="ECE" style={{float : 'right', width : '75px'}} />
            <h1 style={{float : 'right'}}>ECE</h1>
            <h3 style={{clear : 'both'}}>Student Portal - Log in</h3>
          </div>
        </center>
      </div>
    </Fragment>
  );
}

export default Header;
