import * as dotenv from 'dotenv';
dotenv.config({path: '../.env'});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import twilio from 'twilio';
import * as ReciepeFunctions from './Recipe.js'
const client = twilio(accountSid, authToken);

client.messages
  .create({
     body: 'What do you want to eat?',
     from: '+13802104609',
     to: '+12066980855'
   })
  .then(message => console.log(message.sid));