import React, { Component } from 'react';
import fire from './firebaseConfig';
import logo from './imgs/ophelos_logo.png';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: "",
            password: "" 
        }
    }
    

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            console.log(error);
        });
      }
    
      handleChange(e) {
        this.setState({
          [e.target.name] : e.target.value
        });
      }

    render() {
        return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="ophelos_logo"  style = {{width:500, height:80, position:'inherit'}}/>
            <p>Please Login.</p>
            <div><form>
                <input className="loginFields" type='text' placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}></input>
                <input className="loginFields" type='password' placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                <button className="loginButton" onClick={this.login}>Login</button>
            </form></div>
        </header>
        )
    }
}

export default Login;