import React, { Component } from "react";
import axios from "axios";
import {NavLink, Redirect} from 'react-router-dom'
//Styling Components from Semantic UI
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          originalPassword: "",
          message: null,
        };
    }

    genericSync(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
    
        axios.post(
            `${process.env.REACT_APP_API_URL}/api/login`,
            this.state,
            { withCredentials: true }, // FORCE axios to send cookies across domains
        )
        .then(response => {
            console.log("Login Page", response.data);
            const { userDoc } = response.data;
            // send "userDoc" to the App.js function that changes "currentUser"
            this.props.onUserChange(userDoc);
        })
        .catch(err => {
            if (err.response && err.response.data) {
              // console.error("API response", err.response.data)
              return  this.setState({ message: err.response.data.message }) 
            }
        });
    }
    render(){
        //check if current user exists and if so, redirect to other component
        if(this.props.currentUser){
            return <Redirect to='/' />
        }
        return(
            <Grid centered columns={2}>
                <Grid.Column>
                <Header as="h2" textAlign="center">
                    Login
                </Header>
                <Segment>
                    <Form size="large" onSubmit={event => this.handleSubmit(event)}>
                    <Form.Input
                        value={this.state.email}
                        onChange={event => this.genericSync(event)}
                        name="email" 
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Email address"
                    />
                    <Form.Input
                        value={this.state.originalPassword}
                        onChange={event => this.genericSync(event)}
                        name="originalPassword" 
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                    />

                    <Button color="blue" fluid size="large">
                        Login
                    </Button>
                    </Form>
                </Segment>
                <Message>
                    Not registered yet? <NavLink to={"/signup-page"}> Signup</NavLink>
                </Message >
                    { this.state.message && <Message>{ this.state.message } </Message >}
                </Grid.Column>
            </Grid>
            
        );
    }


}

export default Login;

