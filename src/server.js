import express from'express';
import twilio from 'twilio';
import bodyParser from 'body-parser';
import isValidZipcode from 'is-valid-zipcode';
import { getIngredients } from './Recipe';
import { getPricesInLocations } from './kroger';
const { MessagingResponse } = twilio.twiml;
const ZIP_CODE = 98105;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', async (req, res) => {
    // If it is not a number (i.e tags) then we look for recipes
    // Call the Reciepe.getRecipes
    // Return list of reciepes
    // console.log(req.body.Body)
    // Ask for Zip Code

    // else we look for indgredients
    // Call Reciepe.getIngredients
    // return a list of locations and their prices

  const twiml = new MessagingResponse();

  const response = req.body.Body.split(' ');

  const keyWord = response[0].toLowerCase();
  

  if (isNaN(keyWord)) {
    // Call getRecipes with recipe ID
    let recipes = await getRecipes(keyWord);
    // for each recipe output something like:
    // Recipe Name: <name>
    // Recipe ID: <id>

  } else {
    // Call getProducts with recipe ID
    let products = await getIngredients(keyWord);
    let output = await getPricesInLocations(ZIP_CODE, products);
    // for each {location, totalPrice} in output output something like:
    // Location Name: <name>
    // Location Address: <address>
    // Estimated Cost: <totalPrice>
  }



  twiml.message('The Robots are coming! Head for the hills!');

  res.type('text/xml').send(twiml.toString());
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});