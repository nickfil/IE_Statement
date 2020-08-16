import React from 'react';
import logo from './imgs/ophelos_logo.png';
import './Home.css';
import { Link } from 'react-router-dom'; 
import Modal from 'react-modal';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiText: "",
            openModal: false
        }
    }

    // componentDidMount() {
    //     fetch('/hello')
    //       .then((response) => response.json())
    //       .then((data) => console.log('This is your data:', data.text))
    //       .catch((e) => {console.log(e);});
    //   }

    setNewReportCard() {
        var st = this.state.openModal ? false : true;
        this.setState({openModal: st});
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
          <p> Hello {this.props.user.email}, welcome to your income and expenditure app! </p>
          <div>
            <button className="classicButton">History</button>
            <button className="classicButton" onClick={() => this.setNewReportCard()}>New Report</button>
          </div>
        </header>
        <Modal isOpen={this.state.openModal}
               onRequestClose={() => this.setNewReportCard()}
               shouldCloseOnOverlayClick={false}>
            Hello
            <button onClick={() => this.setNewReportCard()} style={{left:0, position: 'absolute', bottom:0}}>Cancel</button>
        </Modal>
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
