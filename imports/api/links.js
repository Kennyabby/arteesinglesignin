import { Mongo } from 'meteor/mongo';

export const AppsheetLink = new Mongo.Collection('AppsheetLink');

if(Meteor.isClient) {
    Meteor.subscribe('AppsheetLink');
    
}