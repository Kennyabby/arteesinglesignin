import { Meteor } from 'meteor/meteor';
import { AppsheetLink } from '/imports/api/links';
import { LoginDetails } from '/imports/api/userLogin';
import express from 'express';
import { WebApp } from 'meteor/webapp';
import bodyParser from 'body-parser';
// import Slingshot from 'slingshot';
import AWS from 'aws-sdk';
import { Session } from 'inspector';

const app = express();
const S3_BUCKET = process.env.S3_BUCKET;
const REGION = process.env.REGION;
const ACL = process.env.ACL;

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: REGION
})

const myBucket = new AWS.S3();
// var user = null;
// var val = Meteor.call("deleteImage");
// console.log(val);
Meteor.publish("deleteImage",function(link){
  // console.log(link);
  // console.log("deleting now!");
  var keys = link.logo;
  var keyIndex = keys.indexOf("m/")
  var key = keys.slice(keyIndex+2,);
  const params = {
    Bucket: S3_BUCKET,
    Key: key
  };
  myBucket.deleteObject(params,(err,data)=>{
    if (err) {
      console.log(err);
    }else{
      // console.log("File has been deleted successfully", data);
    }
    
  })
  return [];
})
if(Meteor.isServer) {
    
    Meteor.startup(function () {

      // app.post("/getUser", async (req,res)=>{

      //   res.json({
      //     user : Session.get("username"),
      //   });
      // })

      WebApp.connectHandlers.use(app);
      // WebApp.connectHandlers.use('/deleteImage',async (req, res, next)=>{
      //   try{
      //     console.log("deleting now!");
      //     const val = await req.params;
      //     console.log(val);
      //     const params = {
      //       ACL: ACL,
      //       Bucket: S3_BUCKET,
      //       Key: val
      //     };
      //   }catch(error){

      //   }
      //   res.writeHead(200);
      //   res.end();
      // })
      

      
      // WebApp.connectHandlers.use(app);
      //  AppsheetLink.insert({
      //   title:"Artee Visitor Regulator",
      //   logo:"artee_visitor_regulator.png",
      //   url:"https://www.appsheet.com/start/e20ae8b0-dc92-40fd-b080-a8fbc767b0ea",
      //   createdAt:new Date()
      //  })
      //  AppsheetLink.insert({
      //   title:"Artee Ticketing 2021",
      //   logo:"artee_ticketing_2021.jpg",
      //   url:"https://www.appsheet.com/start/345a570c-710d-4a30-9d56-a6450994860b",
      //   createdAt:new Date()
      //  })
      //  AppsheetLink.insert({
      //   title:"Artee Vehicle Inspection",
      //   logo:"artee_vehicle_inspection.png",
      //   url:"https://www.appsheet.com/start/8f7ae2fa-acdb-42f0-afb3-cd2fe696c9a2",
      //   createdAt:new Date()
      //  })
      //  AppsheetLink.insert({
      //   title:"Barman Stock Take",
      //   url:"https://www.appsheet.com/start/e5a0150f-6668-4ee8-8e10-c0a4130a3e3e",
      //   createdAt:new Date()
      //  })
      // LoginDetails.insert({
      //   username:"hdghhg",
      //   password:"jhjg",
      //   status:"User",
      //   active:"off",
      //   page:"loginPage"
      //  })
      //  console.log(LoginDetails.find().fetch());
    //   Myvars = new Mongo.Collection("myvars");
      // LoginDetails.remove({});
      // AppsheetLink.remove({});
      // console.log(AppsheetLink.find().fetch());
     
      Slingshot.createDirective("imageUpload", Slingshot.S3Storage, {
          allowedFileTypes: ["image/png", "image/jpeg", "image/gif", "image/jpg"],
          maxSize: 5 * 1024 * 1024,
          AWSAccessKeyId: process.env.ACCESS_KEY_ID,
          AWSSecretAccessKey: process.env.SECRET_ACCESS_KEY,
          bucket: S3_BUCKET,
          acl: ACL,
          region: REGION,
          authorize: function () {
            // console.log("authorized");
            return true;
          },
          key: function (file){
          //   console.log(file)
          //   console.log(Date.now()+"-"+file.name);
          //   const params = {
          //       ACL: ACL,
          //       Body: JSON.stringify(file),
          //       Bucket: S3_BUCKET,
          //       Key: file.name
          //   };
          // // axios.post("/public", params);
          //   myBucket.putObject(params).on('httpUploadProgress', (evt) => {
          //           // setProgress(Math.round((evt.loaded / evt.total) * 100))
          //       }).send((err,data) => {
          //           if (err) {
          //               console.log(err)
          //           }
          //           else{
          //             console.log(data)
          //           }
          //       })
                // console.log(data.url);
            var name = Date.now()+"-"+file.name;
            return name;
          }
      })

      LoginDetails.allow({
        insert: function () {
          return true;
        },
        update: function () {
          return true;
        },
        remove: function () {
          return true;
        }
      });

      AppsheetLink.allow({
        insert: function () {
          return true;
        },
        update: function () {
          return true;
        },
        remove: function () {
          return true;
        }
      });

    Meteor.publish("LoginDetails", function(){

        return LoginDetails.find();
    });
    Meteor.publish("AppsheetLink", function(){

        return AppsheetLink.find();
    });
    // Meteor.publish("Username", function(username){
    //     // user=username;
    //     Session.set("username",username);
    //     console.log(Session.get("username"));
    //     return [];
    // });
    // console.log(user);
    // Meteor.publish('UploadImg', function(e){

    //   console.log("Started uploading");
    //   var file = e.target.files[0];
    //     this.setState({
    //         logo: file.name
    //     })

        // const params = {
        //     ACL: 'public-read',
        //     Body: file,
        //     Bucket: S3_BUCKET,
        //     Key: file.name
        // };
        // // axios.post("/public", params);
        // myBucket.putObject(params).on('httpUploadProgress', (evt) => {
        //         // setProgress(Math.round((evt.loaded / evt.total) * 100))
        //     }).send((err) => {
        //         if (err) {
        //             console.log(err)
        //         }
        //     })
        //     // console.log(data.url);
        // console.log("Finished Uploading");
    // });
    });
}

  