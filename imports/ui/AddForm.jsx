import React,{Component,useState} from 'react';
import { AppsheetLink } from '/imports/api/links';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
// import axios from 'axios';


var title="";
var url="";


export class AddForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isViewAdd:"none",
            logo:"logo.png"
        }
        
    }
    
    getAppName=(e)=>{
        title=e.target.value;
        console.log("title: ",title.length,url.length)
        if (title.length===0 || url.length===0){
            console.log("none");
            this.setState({
                isViewAdd:"none"
            })
        }
        if(title.length!=0 && url!=0){
            console.log("block");
            this.setState({
                isViewAdd:"inline-block"
            })
        }
    }
    
    getAppUrl=(e)=>{
        url=e.target.value;
        console.log("url: ",title.length,url.length)
        if (title.length===0 || url.length===0){

            console.log("none");
            this.setState({
                isViewAdd:"none"
            })
        }
        if(title.length!=0 && url!=0){
            console.log("block");
            this.setState({
                isViewAdd:"inline-block"
            })
        }
        
    }

    getLogo=(e)=>{
        var file = e.target.files[0];
        this.setState({
            logo: file.name
        })

        // const [progress,setProgress] = useState(0);
        // const formData = new FormData();
    
        // // Update the formData object
        // formData.append(
        //     "myFile",
        //     file,
        //     file.name
        // );

        // const params = {
        //     ACL: 'public-read',
        //     Body: file,
        //     Bucket: S3_BUCKET,
        //     Key: file.name
        // };
        // axios.post("/public", params);
        // myBucket.putObject(params).on('httpUploadProgress', (evt) => {
        //         // setProgress(Math.round((evt.loaded / evt.total) * 100))
        //     }).send((err) => {
        //         if (err) {
        //             console.log(err)
        //         }
        //     })
    }
    
    appName = <input className='formInput' type="text" placeholder='Enter Appsheet Name' onChange={this.getAppName}/>;
    appUrl = <input className='formInput' type="text" placeholder='Enter Appsheet Link' onChange={this.getAppUrl}/>;
    appLogo = <input className='formInput' type="file" placeholder='Select an Image for the link' onChange={this.getLogo}/>;
    
    updateLinks=()=>{
        // console.log(this.appName.target);
        var sub = Meteor.subscribe('AppsheetLink');
        var count=0;
        Tracker.autorun(()=>{
            if (sub.ready()){
                count++;
                if (count===1){
                    if (!url.includes("http://")){
                        url="http://"+url;
                    }
                    // console.log(AppsheetLink.find().fetch());
                    AppsheetLink.insert({
                        title:title,
                        url:url,
                        logo:this.logo,
                        createdAt: new Date()
                    })
                    this.props.updates();
                // console.log(AppsheetLink.find().fetch());
                }
            }
        })
        
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