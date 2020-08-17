import React from 'react';
import logo from './imgs/ophelos_logo.png';
import './Home.css';
import { Link, withRouter } from 'react-router-dom'; 
import Modal from 'react-modal';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiText: "",
            openModal: false,
            user: {}
        }
    }

    componentDidMount() {
        Modal.setAppElement('body');
        this.setState({user: JSON.parse(localStorage.getItem('userData'))});
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

    logout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render () {

      return (
      <div className="Home">
        <header className="App-header">
          <h1 style={h1_style}>
                  <Link to="/Home" style={{color:'inherit', textDecoration:'inherit'}}> Home </Link> |
                  <Link to="/About" style={{color:'inherit', textDecoration:'inherit'}}> About</Link> |
                  <button onClick={() => this.logout()}>Logout</button>
          </h1>
          <img src={logo} className="App-logo" alt="ophelos_logo"  style = {{width:500, height:80, position:'inherit'}}/>
          <p> Hello {this.state.user.email}, welcome to your income and expenditure app! </p>
          <div>
            <button className="classicButton">History</button>
            <button className="classicButton" onClick={() => this.setNewReportCard()}>New Report</button>
          </div>
        </header>

        {/* New Report Modal */}
        <Modal isOpen={this.state.openModal}
               onRequestClose={() => this.setNewReportCard()}
               shouldCloseOnOverlayClick={false}
               style={modalStyles}>
            <header>
                <h1>New Report</h1>
            </header>
            <div className="row"><form>
                <div className="column">
                    <h2>Income</h2>
                    <div><label>Salary: </label><input></input></div>
                    <div><label>Other:  </label><input></input></div>
                </div>
                <div className="column">
                    <h2>Expenses</h2>
                    <div><label>Mortgage:</label><input></input></div>
                    <p>Rent:      <input></input></p>
                    <p>Utilities: <input></input></p>
                    <p>Travel:    <input></input></p>
                    <p>Food:      <input></input></p>

                    <h2>Debt</h2>
                    <p>Loans:        <input></input></p>
                    <p>Credit cards: <input></input></p>
                </div>
            </form></div>
            <footer>
                <button className="loginFields" style={{float:'left'}} onClick={() => this.setNewReportCard()} >Close</button>
                <button className="loginFields" style={{float:'right'}}>Save changes</button>
            </footer>
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

  const modalStyles = {
    content : {
      color: 'white',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      background: 'linear-gradient(118deg, #2b3a75 19%, #5586d8 79%)',
      borderRadius: '8px',
      border: 'none',
      width: '60%'
    }
  };

  export default withRouter(Home);
