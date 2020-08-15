import React from 'react';
import logo from './imgs/ophelos_logo.png';
import './App.css';
// import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1 style={h1_style}><Link to="/About">About</Link></h1> */}
        <h1 style={h1_style}>About</h1>
        <img src={logo} className="App-logo" alt="ophelos_logo" style={{width:500, height:80}} />
        <p>
          This is the first page of the Ophelos final assessment.
        </p>
      </header>
    </div>
  );
}


const h1_style = {
  fontSize : 16,
  position : 'absolute',
  top : 0
}
export default App;
