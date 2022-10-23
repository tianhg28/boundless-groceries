const accountSid = 'ACb0f3b0c2c9a44c07957da94250c84e39';
const authToken = '45cb0e5cdd2887d24e58f2cecdf76354';
import twilio from 'twilio';
import * as ReciepeFunctions from './Recipe.js'
const client = twilio(accountSid, authToken);

client.messages
  .create({
     body: 'What do you want to eat?',
     from: '+13802104609',
     to: '+12532493440'
   })
  .then(message => console.log(message.sid));