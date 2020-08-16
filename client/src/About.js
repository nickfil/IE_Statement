import React from 'react';
import logo from './imgs/ophelos_logo.png';
import './About.css';
import { Link } from 'react-router-dom';

class About extends React.Component {
    render() {
        return (
            <div className="About">
                <header className="About-header">
                    <h1 style={h1_style}>
                        <Link to="/Home" style={{color:'inherit', textDecoration:'inherit'}}> Home </Link>
                    </h1>
                    <Link to="/Home"><img src={logo} className="App-logo" alt="ophelos_logo"/></Link>
                    <p>
                        BLA BLA BLA HOW I BUILT THIS HERE
                    </p>
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

export default About;
