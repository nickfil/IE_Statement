import React, { Component } from 'react';
import logo from './imgs/ophelos_logo.png';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: "",
            password: "",
            flag: 0
        }
    }

    login(e) {
        e.preventDefault();
        fetch('/flaskLogin', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(this.state),
            })
            .then(res => res.json())
            .then(res => {
                console.log(res.auth);
                if(res.auth===true){
                    localStorage.setItem('userData', JSON.stringify(res));
                    this.props.handleSuccessfulAuth(res);
                    this.setState({flag: 1});
                }
                else {
                    this.setState({flag: 2});
                    return false;
                }
            })
            .catch(error => {
                this.setState({flag: 2});
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
                {this.state.flag === 2 && <p style={{color:"red", fontSize:16}}>Your login credentials could not be verified, please try again.</p>} 
            </form></div>
        </header>
        )
    }
}

export default Login;