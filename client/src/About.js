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
                    <div style={{textAlign:'left', width:'60%', marginTop:'60px'}}>
                        <h1 style={{fontSize:'30px'}}>A few notes</h1>
                        <ul>
                            <li>The personal info section of a card will appear only when completing the
                                first report
                            </li>
                            <li>The email is assumed to be the same as the login, so it is not asked</li>
                            <li>If an I&amp;E Rating is less than 0 or more than 100%, it is displayed
                                as "Not Available"
                            </li>
                        </ul>
                        <h1 style={{fontSize:'30px'}}>Technologies</h1>
                        <ul>
                            <li>The frontend is built using React.js</li>
                            <li>The backend is built using Python and is running on a Flask server</li>
                            <li>The database is a firebase noSQL database</li>
                        </ul>
                        <h1 style={{fontSize:'30px'}}> Known Issues </h1>
                        <ul>
                            <li>A SQL database could be better in this case, I was however 
                                very familiar with the integration of firebase</li>
                            <li>Rendering could be done faster</li>
                        </ul>
                        <h1 style={{fontSize:'30px'}}> Improvements (If I were to spend more time on it) </h1>
                        <ul>
                            <li>Editing a user's personal details</li>
                            <li>Showing a summary of a user's expenses when clicking a history item</li>
                            <li>Being able to choose which month to input to</li>
                        </ul>
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

export default About;
