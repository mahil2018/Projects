import React, { Component } from 'react';
import axios from "axios";
//Styling Components
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import { NavLink } from "react-router-dom";

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

class AuthMenu extends Component {
    constructor(props){
      super(props);
      this.state = {
          currentUser: null,
      }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, currentUser: nextProps["currentUser"]});
      }
    syncCurrentUser(user){
        this.setState({ currentUser: user });
    }
    logout(){
        // console.log('Logging out user: ', this.state.currentUser)
        axios.delete(
            `${process.env.REACT_APP_API_URL}/parks/logout`,
          {withCredentials:true}
        )
        .then(()=> this.syncCurrentUser(null))
        .catch(err => console.log(err))
      }
    render() {
        console.log('In AuthMenu the current user is: ', this.props.currentUser)
        return (
            <WithState>
            {({ anchorEl, updateAnchorEl }) => {
                const open = Boolean(anchorEl);
                const handleClose = () => {
                updateAnchorEl(null);
                };

                return (
                <React.Fragment>
                    <Button
                    aria-owns={open ? 'render-props-menu' : undefined}
                    aria-haspopup="true"
                    onClick={event => {
                        updateAnchorEl(event.currentTarget);
                    }}
                    >
                    Login
                    </Button>
                    <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                    {this.props.currentUser ? (
                            <span>
                                <MenuItem onClick={handleClose}>
                                    Profile
                                </MenuItem>
                                <br/>
                                <MenuItem onClick={handleClose}>
                                    <button onClick={() => this.logout()}>Log Out</button>
                                </MenuItem>
                            </span>
                        ):(
                            <span>
                                <MenuItem onClick={handleClose}>
                                    <NavLink to="/login-page"> Login </NavLink>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <NavLink to="/signup-page"> Signup </NavLink>
                                </MenuItem>
                            </span>
                    )}
                    </Menu>
                </React.Fragment>
                );
            }}
            </WithState>
        );
    }
}

export default AuthMenu;