import React,{Component} from 'react';
import {LoginPage} from './LoginPage';
import {LinkPage} from './LinkPage.jsx';
//import {Dashboard} from '/client/Dashboard.jsx';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { LoginDetails } from '/imports/api/userLogin';



// function insertLink({ username, password }) {
//   LoginDetails.insert({username, password, createdAt: new Date()});
// }

// insertLink({
//   username: 'admin1234',
//   password: 'art@@9091'
// })
// console.log(process.env("GITHUB_LINK"))

/* initialized currentUser as an empty list, num as zero, nums as zero for later use.*/
var currentUser=[];
var num=0;
var nums=0;

/* Exporting the class App which extends Component from React.*/
export class App extends Component{

  /* The constructor() is an in built function that is called to set the state of variables.*/
  constructor(){
    /* super() is used to set the state of variables.*/
    super();
    /* "this" is used to represent the constructor, it is equivalent to _self in python.*/
    this.state={
      /* the state property initialized variables, whose values will be used or changed later on 
      in the code.*/
      view:"",
      user:""
    }
  }
  /* The loggout function is responsible for carrying out the process of signing out users after loggin in.*/
  loggout=(e)=>{
    /* "sub" stores an instance called by Meteor.subscribe().*/
    /* Meteor.subscribe('LoginDetails') subscribes to a published request of LoginDetails,
    in mongodb, from the main.js file in the server folder.*/
    var sub = Meteor.subscribe('LoginDetails');
    /* This is used to track the instance/process running in the sub variable*/ 
    Tracker.autorun(()=>{
      /*the if condition checks if the process running in sub is ready*/
      if (sub.ready()){
        /* if it is ready*/
        /* increased nums by 1*/
        nums++;
        if (nums===1){
          /* The currentUser variable is equal to an array of object fetched from
           LoginDetails in the mongodb databse with condition.*/
          currentUser=LoginDetails.find().fetch().filter(user=>{
              /* the value of currentUser depends on the condition below: 
              if for each object fetched as variable “user”, 
              the value of the username attribute in user is equal to 
              the value of the key “username” in the sessionStorage.*/
              if (user.username===localStorage.getItem("username")){
                  /* if the condition above is true, include the “user” object for this loop in 
                  the currentUser array.*/
                  return user;
              }
          });
          /* sets the attribute active to “off” for this “user”.*/
          LoginDetails.update({_id : currentUser[0]._id},{$set:{active:"off"}});
          /* removes the key “username” from sessionStorage*/
          window.localStorage.removeItem("username");
          // $.cookie("username",null);
          /* sets the attribute view in state in the constructor attribute to a new loginpage.*/
          this.setState({
            view:<LoginPage loggedin={this.goToLink} passUser={this.getUser}/>
            
          })
          /* reload the webpage.*/
          window.location.reload();
        }
      }
    });
    
    
  }
  /* This functions set the attribute view in state in the constructor attribute to a new linkpage */
  goToLink=(e)=>{
    
    this.setState({
      view:<LinkPage loggedout={this.loggout} currentUser={this.state.user}/>
      
    })
    
  }
  /* This function sets the attribute user in state in the constructor attribute to 
  the user value from the getUser parameter when called. */
  getUser=(user)=>{
    user=user;
    this.setState({
      user:user
    })
  }
  /* This function calls the inbuilt render function accessed from the extended Component in React */
  render(){
    /* the return function returns the value of the view in 
    the constructor’s state object which is a jsx component*/
    return(
      this.state.view
    );
  }
  /* This function is also inbuilt. It is part of the react life cycle. 
  It is the second function that is automatically called after the render() function is called 
  and mounted on the DOM*/
  async componentDidMount(){
    /* "subs" stores an instance called by Meteor.subscribe().*/
    /* Meteor.subscribe('LoginDetails') subscribes to a published request of LoginDetails, in mongodb, from the main.js file in the server folder.*/
    
    var subs = Meteor.subscribe('LoginDetails');
    // try{
    //   const opts = {
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json'
    //       },
    //   };
      
    //   const response= await fetch("/getUser", opts);
    //   // username = await response.json();
    // }catch(TypeError){
    //     console.log(TypeError);
    // }
    var username= window.localStorage.getItem("username");
    /* Checking if the value of the key "username" in sessionStorage is null.*/
    if (username==="arteeadmin"
    || username==="arteegroup"){
      /* This is used to track the instance/process running in the subs variable*/
      Tracker.autorun(()=>{
      /*the if condition checks if the process running in sub is ready*/
        if (subs.ready()){
          /* if it is ready*/
          /* increase num by 1*/
          num++;
          if (num===1){
            /* The currentUser variable is equal to an array of object fetched from LoginDetails in 
            the mongodb databse with condition.*/
            currentUser=LoginDetails.find().fetch().filter(user=>{
                /* the value of currentUser depends on the condition below: 
                if for each object fetched as variable “user”, the value of 
                the username attribute in user is equal to the value of the key “username” in 
                the sessionStorage.*/      
                if (user.username===username){
                    /* if the condition above is true, include 
                    the “user” object for this loop in the currentUser array.*/
                    
                    return user;
                }
                
            });
            this.setState({
              user:currentUser[0]
            })
            if(currentUser.length>0){
              if(currentUser[0].active==="on"){
                this.setState({
                  view:<LinkPage loggedout={this.loggout} currentUser={this.state.user}/>
                  
                })
              }else{
                this.setState({
                  view:<LoginPage loggedin={this.goToLink} passUser={this.getUser}/>
                  
                })
                
              }
            }
            else{
              this.setState({
                view:<LoginPage loggedin={this.goToLink} passUser={this.getUser}/>
                
              })
            }
            
          }
        }
      })
    }else{
      this.setState({
        view:<LoginPage loggedin={this.goToLink} passUser={this.getUser}/>
        
      })
    }
    
  }
}