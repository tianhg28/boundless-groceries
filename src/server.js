import express from'express';
import twilio from 'twilio';
import bodyParser from 'body-parser';
const { MessagingResponse } = twilio.twiml;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
    // If it is not a number (i.e tags) then we look for recipes
    // Call the Reciepe.getRecipes
    // Return list of reciepes
    console.log(req.body.Body)
    // Ask for Zip Code

    // else we look for indgredients
    // Call Reciepe.getIngredients
    // return a list of locations and their prices

  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.type('text/xml').send(twiml.toString());
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});