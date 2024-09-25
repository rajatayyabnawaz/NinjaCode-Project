import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
      <a className="navbar-brand text-success font-weight-bold" href="#">
        Enatega
      </a>
    
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mx-2">
            <a className="nav-link text-dark" href="#">
              Map
            </a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link text-dark" href="#">
              Satellite
            </a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link text-dark" href="#">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
