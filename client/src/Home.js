import React from 'react';
import logo from './imgs/ophelos_logo.png';
import './Home.css';
import { Link } from 'react-router-dom'; 

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        }
    }

    render () {
      return (
      <div className="Home">
        <header className="App-header">
          <h1 style={h1_style}>
                  <Link to="/Home" style={{color:'inherit', textDecoration:'inherit'}}> Home </Link> |
                  <Link to="/About" style={{color:'inherit', textDecoration:'inherit'}}> About</Link>
          </h1>
          <img src={logo} className="App-logo" alt="ophelos_logo"  style = {{width:500, height:80, position:'inherit'}}/>
          <p> Hello {this.state.user}, welcome to your income and expenditure app! </p>
          <div>
            <button className="classicButton">History</button>
            <button className="classicButton">New Report</button>
          </div>
        </header>
      </div>
      );
    }
  }

  const h1_style = {
    fontSize : 16,
    position : 'absolute',
    top : 10,
    right : 30,
    color : 'white',
    textDecoration : 'none'
  }

  export default Home;
