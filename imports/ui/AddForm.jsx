import React,{Component,useState} from 'react';
import { AppsheetLink } from '/imports/api/links';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import AWS from 'aws-sdk';
// import axios from 'axios';


var title="";
var url="";
var uploader = new ReactiveVar();
const S3_BUCKET = "spar-hep-desk";
const REGION = "eu-west-1";

export class AddForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isViewAdd:"none",
            logo:"logo.png",
            file:null
        }
        
    }
    
    getAppName=(e)=>{
        title=e.target.value;
        sessionStorage.setItem("currentLink", e.target.value);
        if (title.length===0 || url.length===0){
            this.setState({
                isViewAdd:"none"
            })
        }
        if(title.length!=0 && url!=0){
            this.setState({
                isViewAdd:"inline-block"
            })
        }
    }
    
    getAppUrl=(e)=>{
        url=e.target.value;
        if (title.length===0 || url.length===0){
            this.setState({
                isViewAdd:"none"
            })
        }
        if(title.length!=0 && url!=0){
            this.setState({
                isViewAdd:"inline-block"
            })
        }
        
    }

    getLogo=(e)=>{
        this.setState({
            file:e.target.files[0]
        })   
    }
    
    appName = <input className='formInput' type="text" placeholder='Enter Appsheet Name' onChange={this.getAppName}/>;
    appUrl = <input className='formInput' type="text" placeholder='Enter Appsheet Link' onChange={this.getAppUrl}/>;
    appLogo = <input className='formInput' type="file" placeholder='Select an Image for the link' onChange={this.getLogo}/>;
    
    updateLinks=()=>{
        // console.log(this.appName.target);
        if (this.state.file!=null){
            var upload = new Slingshot.Upload("imageUpload");
            upload.send(this.state.file, (error, downloadUrl)=>{
                uploader.set();
                if (error) {
                    console.log(error);
                    alert(error);
                    
                }
                else{
                    
                    this.setState({
                        logo:downloadUrl
                    })
                }
                console.log(downloadUrl);
                uploader.set(upload);
                var sub = Meteor.subscribe('AppsheetLink');
                var count=0;
                Tracker.autorun(()=>{
                    if (sub.ready()){
                        count++;
                        if (count===1){
                            console.log("Added Link");
                            if (!url.includes("http://")){
                                url="http://"+url;
                            }
                            
                            AppsheetLink.insert({
                                title:title,
                                url:url,
                                logo:this.state.logo,
                                createdAt: new Date()
                            })
                            this.props.updates();
                        
                        }
                    }
                })
                
            }); 
        }else{
            var sub = Meteor.subscribe('AppsheetLink');
            var count=0;
            Tracker.autorun(()=>{
                if (sub.ready()){
                    count++;
                    if (count===1){
                        console.log("Added Link");
                        if (!url.includes("http://")){
                            url="http://"+url;
                        }
                        
                        AppsheetLink.insert({
                            title:title,
                            url:url,
                            logo:this.state.logo,
                            createdAt: new Date()
                        })
                        this.props.updates();
                    
                    }
                }
            })
        }
        
    }
    cancleUpdateLinks=()=>{
        this.props.updates();
    }
    
    render(){
        const changeFormview = this.props.show? "display-view":"display-none";
        return(
            <div className={changeFormview} style={{justifyContent: "center", textAlign:"center"}}>
                <div className="formDetails">
                    <p>Name: {this.appName}</p>
                    <p>Url: {this.appUrl}</p>
                    <p>Logo: {this.appLogo}</p>
                    <button className='add' style={{display:this.state.isViewAdd}} title="Add Link" onClick={this.updateLinks}>Add Link</button>
                    <button className='ccl' title="Cancel" onClick={this.cancleUpdateLinks}>Cancel</button>
                </div>
            </div>
        );
    }
}