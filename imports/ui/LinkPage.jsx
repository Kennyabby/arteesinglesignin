import React,{Component} from 'react';
import { AppsheetLink } from '/imports/api/links';
import { LoginDetails } from '/imports/api/userLogin';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import {AddForm} from './AddForm';


var linkList="";
var countt=0;

function gotoLink(e){
    var appsheetLink = e.target.getAttribute("url");
    window.open(appsheetLink, "_blank");

}
async function cancleLink(e){
    var url = e.target.getAttribute("urll");
    var id = e.target.getAttribute("id");
    var subs = Meteor.subscribe('AppsheetLink');
    var counts=0;
    var link = AppsheetLink.findOne({_id: id})
    // var link = {logo: "logo.png", title: "Google"}
    console.log(link);
    var sub = Meteor.subscribe('deleteImage',link);
    Tracker.autorun(()=>{
        if (subs.ready()){
            counts++;
            if (counts===1){
                AppsheetLink.remove({
                    _id: id
                });   
            }
        }
    })
    
    // const sendDataString = JSON.stringify(link);
    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", '/deleteImage', true);
    // xhr.setRequestHeader("Content-type", "application/json");
    // xhr.send(sendDataString);
    // try{
    //     const opts = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(link),
    //     };
    //     console.log("passing data");
    //     const response= await fetch("/deleteImage", opts);
    // }catch(TypeError){
    //     console.log(TypeError);
    // }
    
    // const MatricList = await response.json();
    
    // if (MatricList.matricList.includes(inputMatricNo.value)){
    //     isIncludeMatric=true;
    // }
    // else{
    //     isIncludeMatric=false;
    // }

    
    
}


export class LinkPage extends Component{
    
    constructor(props){
        super(props);
        this.state={
            link:[],
            displayStatus:"none",
            search:"",
            show:false,
            showAddButton:false,
            cancle:"none"
        }
        this.showAddForm = this.showAddForm.bind(this);
        this.hideAddForm = this.hideAddForm.bind(this);
    }

    showAddForm = () => {
        this.setState({ 
            show: true, 
            displayStatus:"none"
        });
    };

    hideAddForm = () => {
        this.setState({ 
            show: false,
            displayStatus:"inline-flex" 
        });
    };
    
    gotoLogin=()=>{
        
        this.props.loggedout();
    }

    changeDetect=(e)=>{
        var subs = Meteor.subscribe('AppsheetLink');
        this.setState({search: e.target.value.toLowerCase()});
        Tracker.autorun(()=>{
            if (subs.ready()){
                var newLinkList=linkList.filter(list=>{return (list.title.toLowerCase().includes(this.state.search))});
                this.setState({
                    link:newLinkList
                })
                
            }
        })
    }
    
    checkUserStatus=()=>{
        var subt = Meteor.subscribe('LoginDetails');
        Tracker.autorun(()=>{
            if (subt.ready()){
                countt++;
                if (countt===1){
                    const currentuser=LoginDetails.find().fetch().filter(user=>{
                        
                        if (user._id===this.props.currentUser._id){
                            
                            return user;
                            
                        }

                    });
                   
                    if (currentuser[0].status==="Admin"){
                        // console.log("yes")
                        this.setState({
                            cancle:"block",
                            displayStatus:"inline-flex"
                        })
                    }
                    else{
                        this.setState({
                            cancle:"none",
                            displayStatus:"none"
                        })
                    }
                }   
            }
        })
    }
    render(){
        
        this.checkUserStatus();
        return(
            <div>
                <p className='logout' title="Click to Log out" onClick={this.gotoLogin}>Signout</p>
                <div><h1 className='top-label2'>ARTEE INTRANET</h1></div>
                <div className='addLinkRight' style={{display:this.state.displayStatus}} onClick={this.showAddForm}>
                    <img src="add.jpg" style={{borderRadius:"100px", padding:"0px", margin:"0px"}} alt="add appsheet link" title="Click to add a new link" height="20px"/>    
                </div>
                <div className='sch'><p><input className="search" type="search" placeholder="Search for Link" onChange={this.changeDetect}/></p></div>
                <p className='top-label1'>Choose a link</p>
                <div style={{textAlign:"center"}}>
                    <div className='cover1'>
                        {this.state.link.map((link,id)=>{
                            var urlVal=link.url;
                            return(
                            <div key={id} className="content1" url={urlVal} title={link.title}>
                                <img urll={urlVal} id={link._id} style={{display:this.state.cancle}} src="cancle.png" className="cancleUrl" title="remove link" src="cancle.png" alt="cancle link" onClick={cancleLink}/>
                                <img url={urlVal} src={link.logo} alt="appsheet link" height="150px" onClick={gotoLink}/>
                                <h1 key={id} url={urlVal} onClick={gotoLink}>{link.title}</h1>
                            </div>)
                        })}
                    </div>
                </div>
                <AddForm show={this.state.show} updates={this.hideAddForm}/>
            </div>   
        )
    }

    componentDidMount(){
        var sub = Meteor.subscribe('AppsheetLink');
        Tracker.autorun(()=>{
            if (sub.ready()){
                linkList=AppsheetLink.find().fetch();
                this.setState({
                    link:linkList
                })
                
            }
        })
    }
}