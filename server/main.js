import { Meteor } from 'meteor/meteor';
import { AppsheetLink } from '/imports/api/links';
import { LoginDetails } from '/imports/api/userLogin';
// import Slingshot from 'slingshot';
import AWS from 'aws-sdk';

const S3_BUCKET ='spar-help-desk';
const REGION ='eu-west-1';
var credentials = new AWS.EC2MetadataCredentials();
// const authorize=()=>{
// }
// console.log(process.env.ACCESS_KEY_ID);



// AWS.config.update({
    
    
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
      // console.log(process.env.ACCESS_KEY_ID);
      const settings = Meteor.settings.google;

      if (settings) {  
        ServiceConfiguration.configurations.remove({
          service: 'google'
        });

        ServiceConfiguration.configurations.insert({
          service: 'google',
          clientId: process.env.CLIENT_ID,
          secret: process.env.CLIENT_SECRET
        });
      }
     
      Slingshot.fileRestrictions("imageUpload",{
        allowedFileTypes: ["image/png", "image/jpeg", "image/gif", "image/jpg"],
        maxSize: 5 * 1024 * 1024,
      })
      // console.log(process.env.ACCESS_KEY_ID);
      Slingshot.createDirective("imageUpload", Slingshot.S3Storage, {
          // AWSAccessKeyId: process.env.ACCESS_KEY_ID,
          // AWSSecretAccessKey: process.env.SECRET_ACCESS_KEY,
          bucket: S3_BUCKET,
          acl: "public-read",
          region: REGION,
          temporaryCredentials: function () {
            if (credentials.needsRefresh()) {
              updateCredentials();
            }
        
            return {
              AccessKeyId: credentials.accessKeyId,
              SecretAccessKey: credentials.secretAccessKey,
              SessionToken: credentials.sessionToken
            };
          },
          authorize: function () {
            return true;
          },
          key: function (file){
            return file.name + Date.now();
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
    // Meteor.publish('UploadImg', function(e){

    //   console.log("Started uploading");
    //   var file = e.target.files[0];
    //     this.setState({
    //         logo: file.name
    //     })

    //     const params = {
    //         ACL: 'public-read',
    //         Body: file,
    //         Bucket: S3_BUCKET,
    //         Key: file.name
    //     };
    //     // axios.post("/public", params);
    //     myBucket.putObject(params).on('httpUploadProgress', (evt) => {
    //             // setProgress(Math.round((evt.loaded / evt.total) * 100))
    //         }).send((err) => {
    //             if (err) {
    //                 console.log(err)
    //             }
    //         })
    //         // console.log(data.url);
    //     console.log("Finished Uploading");
    // });
    });
}

  