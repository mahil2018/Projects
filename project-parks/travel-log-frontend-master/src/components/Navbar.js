import React, { Component } from 'react';
import axios from "axios";
import { Switch, NavLink, Route } from "react-router-dom";

class Navbar extends Component {
  logout(){
    axios.delete(
      `${process.env.REACT_APP_API_URL}/api/logout`,
      {withCredentials:true}
    )
    .then((response) => {
      const {userDoc} = response.data;
      this.props.onUserChange(userDoc)
    })
    .catch(err => console.log(err))
  }
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#"><img src="http://shrani.si/f/46/2Q/2Ps2wfOq/camera.png" /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/"> Home </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/park-list'>Parks</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav mr-right">
            {this.props.currentUser ? (
              <li className="nav-item dropdown">
                    <button onClick={() => this.logout()}>Log Out</button>
              </li>
            ):(
              <li className="nav-item">
                  <NavLink className="nav-link" to="/login-page" > Login </NavLink>
              </li>
            
            )}
            <li className="nav-item">
              <NavLink to="/signup-page" className="nav-link" > Register </NavLink>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search..." aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    )
  }
}
export default Navbar;