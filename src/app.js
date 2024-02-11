import twilio from 'twilio';
import * as dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const twilioNumber =  process.env.TWILIO_NUMBER;
const userNumber = process.env.USER_NUMBER;

client.messages
  .create({
     body: 'What do you want to eat?',
     from: twilioNumber,
     to: userNumber
   })
  .then(message => console.log(message.sid));