import React, { Component } from 'react';
import './App.css';
import { Switch, NavLink, Route } from "react-router-dom";
import axios from "axios";
//Main Components
import Signup from './components/user-pages/Signup';
import Login from './components/user-pages/Login';
import Home from './components/Home';
import ParkAdd from './components/park-pages/ParkAdd';
import ParkList from './components/park-pages/ParkList';
import ParkDetails from './components/park-pages/ParkDetails';
import Activities from './components/Activities';
import Community from './components/Community';
import NotFound from './components/NotFound';
//Style Components
import Navbar from './components/Navbar'


class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: null,
    }
  }

  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_URL}/api/checkuser`, { withCredentials:true })
    .then(responseFromBackend => {
      // console.log("Check User in APP.JS: ",responseFromBackend.data)
      const { userDoc } = responseFromBackend.data;
      this.syncCurrentUser(userDoc);
    });
  }
  syncCurrentUser(user){
    this.setState({ currentUser: user });
    console.log(this.state);
  }
  logout(){
    axios.delete(
      `${process.env.REACT_APP_API_URL}/api/logout`,
      {withCredentials:true}
    )
    .then(()=> this.syncCurrentUser(null))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <header>
          <Navbar currentUser={this.state.currentUser} onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
        </header>

            <Switch >
              <Route exact path="/" component={Home} />
              <Route path="/signup-page" render={ () => 
                <Signup currentUser={ this.state.currentUser } 
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
                } />
              <Route path="/login-page" render={ () => 
                <Login currentUser={ this.state.currentUser } 
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
                } />
              <Route path="/park-list" component={ParkList} />
              <Route path="/add-park" render={() => <ParkAdd currentUser={this.state.currentUser}/>}/>
              <Route path="/park-list" component={ParkList}/>
              <Route path="/park-details/:id" component={ParkDetails} />
              <Route path="/activities" component={Activities} />
              <Route path="/community" component={Community} />
              <Route component={NotFound} /> 
            </Switch>
        

        <footer>
          Made with React
        </footer>
      </div>
    );
  }
}

export default App;