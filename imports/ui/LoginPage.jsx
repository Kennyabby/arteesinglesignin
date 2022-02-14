import React,{Component} from 'react';
import { Tracker } from 'meteor/tracker'
import { LoginDetails } from '/imports/api/userLogin';
import { LinkPage } from './LinkPage';
import { Meteor } from 'meteor/meteor';

var userValue="dkldfjklfdslk";
var passValue="kldkldkdsaklklsa";
var users=[{username:userValue, password:passValue}];
var username="";
var password="";
var cunt=0;
export class LoginPage extends Component{

  constructor(props){
      super(props);
      this.state={
          username:userValue,
          password:passValue,
          users:users,
          currentUser:"",
          err:"",
          topInput:"none",
          bottomInput:"none",
          border:"solid white 1px",
          inputBorderBottom:"solid black 1px",
          passBorderBottom:"solid black 1px"
      }
  }
  toggleFocus = (e)=>{
    var inputName = e.target.getAttribute("name");
    if(inputName==="Username"){
      this.setState({
        inputBorderBottom:"solid rgb(100,100,250) 1px",
        passBorderBottom:"solid black 1px"
      })
    }else if(inputName==="Password"){
      this.setState({
        inputBorderBottom:"solid black 1px",
        passBorderBottom:"solid rgb(100,100,250) 1px"
      })
    }
  }
  gotoMain=(e)=>{
    this.props.loggeout;
  }
  login  = (event)=>{
    var cot=0;
    this.state.users.map(user=>{
      
      if(username===user.username && password===user.password){
        this.setState({
          err: "",
          currentUser:user
        })
        
        LoginDetails.update({_id : user._id},{$set:{active:"on"}});
        this.props.passUser(user);
        window.sessionStorage.setItem("username",username);
        // event.target.innerHTML="Signin...";
        setTimeout(()=>{
          this.props.loggedin();
        },500)
        
      }else if(username==="" && password===""){
        this.setState({
          err: "Please enter the fields!",
          inputBorderBottom:"solid rgb(250,100,100) 1px",
          passBorderBottom:"solid rgb(250,100,100) 1px"
        })
      }
      else{
        cot++;
      }
      // window.sessionStorage.removeItem("username");
    })
    if (cot===this.state.users.length){
      this.setState({
        err: "You have entered an invalid detail!",
        inputBorderBottom:"solid rgb(250,100,100) 1px",
        passBorderBottom:"solid rgb(250,100,100) 1px"
      })
    }
  }
    
  signin = <button 
    className="login" 
    type="submit" 
    value="login" 
    onClick={this.login}>Signin
  </button>
  getUsername = (e)=>{
    username = e.target.value
    this.setState({
      err:""
    })
  }
  getPassword = (e)=>{
    password= e.target.value;
    this.setState({
      err:""
    })

    // console.log(e.key==='Enter');
  }
  gotoGoogle=(e)=>{

  }
  onKeyUpValue=(event)=>{
    if (event.key==='Enter'){
      this.login();
    }
  }
  render(){
    const userInputStyle={
      outline:this.state.topInput, 
      border:this.state.border,
      borderBottom:this.state.inputBorderBottom
    }
    const passInputStyle={
      outline:this.state.bottomInput, 
      border:this.state.border,
      borderBottom:this.state.passBorderBottom
    }
    const usernameInput = <input  
      className="input-top" 
      type="text" 
      name="Username"
      placeholder="Username"
      style={userInputStyle}
      onClick={this.toggleFocus}
      onChange={this.getUsername}
    />;
    const passwordInput = <input 
      className="input-bottom" 
      type="password" 
      name="Password"
      placeholder="Password"
      style={passInputStyle}
      onClick={this.toggleFocus}
      onChange={this.getPassword}
      onKeyUp={this.onKeyUpValue.bind(this)}
    />;
      return(
        <div className='cover'>
        <p><img src="sparLogo.png" style={{margin:"0px"}} alt="Spar Logo" width="400px"/></p>
        <div className="content" onClick={()=>{
        }}>
            <h1 className="top-label">Signin Into Your Account</h1>
            {/* <img src="logo.png" alt="Spar Logo" width="100px"/> */}
            <div className="input">
            <div style={{display:"inline-flex", marginTop:"50px"}}>
              <img src="username.png" alt="User Logo" height="30px"/>
              {usernameInput}
            </div>
            <div style={{display:"inline-flex", marginTop:"30px"}}>
              <img src="password.png" alt="Lock Logo" height="30px"/>
              {passwordInput}
            </div>
            <p className="error">{this.state.err}</p>
            </div>
            <div className="alternate">
              <p style={{cursor:"pointer"}} onClick={this.gotoGoogle}>Signin with Google</p></div>
              
            {this.signin}
            </div>
        </div>
      );
  }
  
  componentDidMount(){
    
    var subs = Meteor.subscribe('LoginDetails');
    
    Tracker.autorun(()=>{
      
      if (subs.ready()){
        users = LoginDetails.find().fetch();
        this.setState({
          users: users
        })
      }
    })
    
    
  }
}