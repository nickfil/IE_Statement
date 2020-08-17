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
  }

  componentDidMount() {
     this.setState({user: JSON.parse(localStorage.getItem('userData'))});
     console.log(this.state.user);
   }

  render () {
    return (
    <div className="App">
      {this.state.user && this.state.user.auth===true ? (<Home/>) : (<Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>)}
    </div>
    );
  }
}

export default App; 