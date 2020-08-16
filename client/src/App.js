import React from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth=this.handleSuccessfulAuth.bind(this);
    this.state = {
      user:  {}
    }
  }

  handleSuccessfulAuth(res) {
    this.setState({user: res});
    console.log(res);
  }

  render () {
    return (
    <div className="App">
      {this.state.user.auth===true ? (<Home user={this.state.user} />) : (<Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>)}
    </div>
    );
  }
}

export default App; 