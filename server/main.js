import { Meteor } from 'meteor/meteor';
import { AppsheetLink } from '/imports/api/links';
import { LoginDetails } from '/imports/api/userLogin';
// import AWS from 'aws-sdk';
// const S3_BUCKET ='help-desk-bucket';
// const REGION ='eu-west-1';

// AWS.config.update({
//     apiVersion: "2010-12-01",
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     region: REGION,
//     endpoint: "http://54.247.57.9:3000",
// })

// const myBucket = new AWS.S3({
//     params: { Bucket: S3_BUCKET},
//     region: REGION,
// })

if(Meteor.isServer) {
  // console.log(sessionStorage)
    Meteor.startup(function () {
      // console.log(LoginDetails.find().fetch());
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
      //   username:"arteegroup",
      //   password:"10artee01",
      //   status:"User",
      //   active:"off",
      //   page:"loginPage"
      //  })
      //  LoginDetails.insert({
      //   username:"arteeadmin",
      //   password:"admin114",
      //   status:"Admin",
      //   active:"off",
      //   page:"loginPage"
      //  })
      //  console.log(LoginDetails.find().fetch());
    //   Myvars = new Mongo.Collection("myvars");
      // LoginDetails.remove({});
      // AppsheetLink.remove({});
      // console.log(AppsheetLink.find().fetch());
      // console.log(process.env.ACCESS_KEY_ID);
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
    });
}

  