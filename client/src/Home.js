import React from 'react';
import logo from './imgs/ophelos_logo.png';
import './Home.css';
import { Link, withRouter } from 'react-router-dom'; 
import Modal from 'react-modal';
import Card from 'react-bootstrap/Card';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleObjectChange=this.handleObjectChange.bind(this);
        this.state = {
            apiText: "",
            openModal: false,
            openHistoryModal: false,
            errorInInput: false,
            user: {},
            history: {},
            dname: "",
            name: "",
            email: "",
            phone: "",
            dob: "",
            address: "",
            salary: "",
            other: "",
            mortgage: "",
            rent: "",
            utilities: "",
            travel: "",
            food: "",
            loans: "",
            creditCards: ""
        }
    }

    componentDidMount() {
        Modal.setAppElement('body');
        this.setState({user: JSON.parse(localStorage.getItem('userData'))});
        var info = JSON.parse(localStorage.getItem('userData'))
        fetch('/getName', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(info.email),
        })
          .then((response) => response.json())
          .then((data) => this.setState({dname: data.dname}))
          .catch((e) => {console.log(e);
        });
    }

    getHistory(st8) {
        fetch('/getHistory', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(st8),
            })
            .then((res) => res.json())
            .then(data => {
                this.setState({history: data});
            })
    } 

    submit(st8) {
        // eslint-disable-next-line
        // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // if(!st8.name || !re.test(st8.email) || !st8.phone || !st8.dob || !st8.address){
        //     return false;
        // }

            fetch('/sendForm', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(st8),
                })
                .then(res => {
                    console.log(res);
                    if(res.statusText==="OK"){
                        window.location.reload();
                    }
                })
    }

    setNewReportCard() {
        var st = this.state.openModal ? false : true;
        this.setState({openModal: st});
    }

    historyCard() {
        var st = this.state.openHistoryModal ? false : true;
        this.setState({openHistoryModal: st});
    }

    logout() {
        localStorage.clear();
        this.props.history.push('/');
        window.location.reload();
    }

    handleObjectChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    projectCards = () => {
        var hist = this.state.history;
        if(hist.outcome==="FAILURE"){
            return <div><span style={{width:'500px', fontSize: '18px'}}> Nothing here yet, please complete a form.</span></div>
        }
        else{
            return (
            Object.keys(hist).map(key => {
                return (
                    <Card key={key} className="infoCards">
                        <Card.Title style={{fontSize: '20px', textDecoration:'underline'}}>{key.split("|")[0]}</Card.Title>
                        <Card.Text style={{fontSize: '16px', display: 'grid'}}>
                            <span > Disposable Income: {hist[key]["di"]} </span>
                            <span style={{marginTop: '10px'}}> I&amp;E Rating: {hist[key]["ieRating"]} </span>
                        </Card.Text>
                    </Card>
                )})
            )
        }
    }

    render () {
      return (
      <div className="Home">
        <header className="App-header">
          <h1 style={h1_style}>
                  <Link to="/Home" style={{color:'inherit', textDecoration:'inherit'}}> Home </Link> |
                  <Link to="/About" style={{color:'inherit', textDecoration:'inherit'}}> About</Link> |
                  <button className="logoutBtn" onClick={() => this.logout()}>Logout</button>
          </h1>
          <img src={logo} className="App-logo" alt="ophelos_logo"  style = {{width:500, height:80, position:'inherit'}}/>
          <p> {this.state.dname ? "Hello " + this.state.dname + ", welcome to your income and expenditure app!" : "Welcome, please start a new report to setup your profile"} </p>
          <div>
            <button className="classicButton" onClick={() => {this.getHistory(this.state); this.historyCard()}}>History</button>
            <button className="classicButton" onClick={() => this.setNewReportCard()}>New Report</button>
          </div>
        </header>

        {/* New Report Modal */}
        <Modal isOpen={this.state.openModal}
               onRequestClose={() => this.setNewReportCard()}
               shouldCloseOnOverlayClick={false}
               style={modalStyles}>
            <header>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.setNewReportCard()}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <h1>New Report</h1>
            </header>
            <div className="row"><form>
                {this.state.dname ? null :
                <div className="column">
                    <h2>Personal Info</h2>
                    <div className="inputItem"><label>Name </label><input className="inputData" type="text" name="name" value={this.state.name} onChange={this.handleObjectChange} required></input></div>
                    <div className="inputItem"><label>Email  </label><input className="inputData" type="email" name="email" value={this.state.email} onChange={this.handleObjectChange} required></input></div>
                    <div className="inputItem"><label>Phone </label><input className="inputData" type="tel" name="phone" value={this.state.phone} onChange={this.handleObjectChange} required></input></div>
                    <div className="inputItem"><label>Date of Birth  </label><input className="inputData" type="date" name="dob" value={this.state.dob} onChange={this.handleObjectChange} required></input></div>
                    <div className="inputItem"><label>Address  </label><input className="inputData" type="text" name="address" value={this.state.address} onChange={this.handleObjectChange} required></input></div>
                </div>
                }
                <div className="column">
                    <h2>Income</h2>
                    <div className="inputItem"><label>Salary </label><input className="inputData" type="number" name="salary" value={this.state.salary} onChange={this.handleObjectChange} min="0"></input></div>
                    <div className="inputItem"><label>Other  </label><input className="inputData" type="number" name="other" value={this.state.other} onChange={this.handleObjectChange} min="0"></input></div>

                    <h2>Debt</h2>
                    <div className="inputItem"><label>Loans        </label><input className="inputData" type="number" name="loans" value={this.state.loans} onChange={this.handleObjectChange} min="0"></input></div>
                    <div className="inputItem"><label>Credit cards </label><input className="inputData" type="number" name="creditCards" value={this.state.creditCards} onChange={this.handleObjectChange} min="0"></input></div>
                </div>
                <div className="column">
                    <h2>Expenses</h2>
                    <div className="inputItem"><label>Mortgage  </label><input className="inputData" type="number" name="mortgage" value={this.state.mortgage} onChange={this.handleObjectChange} min="0"></input></div>
                    <div className="inputItem"><label>Rent      </label><input className="inputData" type="number" name="rent" value={this.state.rent} onChange={this.handleObjectChange} min="0"></input></div>
                    <div className="inputItem"><label>Utilities </label><input className="inputData" type="number" name="utilities" value={this.state.utilities} onChange={this.handleObjectChange} min="0"></input></div>
                    <div className="inputItem"><label>Travel    </label><input className="inputData" type="number" name="travel" value={this.state.travel} onChange={this.handleObjectChange} min="0"></input></div>
                    <div className="inputItem"><label>Food      </label><input className="inputData" type="number" name="food" value={this.state.food} onChange={this.handleObjectChange} min="0"></input></div>
                </div>
            </form></div>
            <footer>
                {this.state.errorInInput ?
                    <span style={{color: 'red', width:'100%', display:'inline-block'}}> One of the fields is wrong, please enter the correct type of input.</span> :
                    null
                }
                <div>
                    <button className="loginButton" style={{float:'left'}} onClick={() => this.setNewReportCard()} >Close</button>
                    <button className="loginButton" style={{float:'right'}} onClick={() => this.submit(this.state)} type="submit">Submit</button>
                </div>
            </footer>
        </Modal>

        {/* History Modal */}
        <Modal  isOpen={this.state.openHistoryModal}
                onRequestClose={() => this.historyCard()}
                shouldCloseOnOverlayClick={false}
                style={modalStyles}>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.historyCard()}>
                <span aria-hidden="true">&times;</span>
            </button>
            {this.projectCards()}
            <button className="loginButton" style={{float:'left'}} onClick={() => this.historyCard()} >Close</button>
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
      maxHeight: '90%',
      overflow: 'auto',
      color: 'white',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      background: 'linear-gradient(118deg, #2b3a75 19%, #5586d8 79%)',
      borderRadius: '8px',
      border: 'none',
      width: 'fit-content',
      transition: 'color 0.3s ease-in-out',
      padding: '20px 20px 20px 50px'
    }
  };

  export default withRouter(Home);
