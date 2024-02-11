import express from'express';
import twilio from 'twilio';
import bodyParser from 'body-parser';
import * as ReciepeFunctions from './Recipe.js'
import { getPricesInLocations } from './kroger.js';
import getAccessToken from './authentication.js'

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

  // Use stored access token for location request
  let accessToken = await getAccessToken();

  if (isNaN(keyWord)) {
    // Call getRecipes with recipe ID
    console.log('we ran!')
    let reciepe = await ReciepeFunctions.getRecipes(keyWord)
    let string = "";
    for (let [key, value] of reciepe) {
        string += '\n' + key + ': ' + value; 
    }
    twiml.message(string);
    res.type('text/xml').send(twiml.toString());
    // for each recipe output something like:
    // Recipe Name: <name>
    // Recipe ID: <id>

  } else {
    // Call getProducts with recipe ID
    let products = await ReciepeFunctions.getIngredients(keyWord);
    // console.log("products:", products.length);
    let output = await getPricesInLocations(ZIP_CODE, products, accessToken);
    // console.log("output:", output.length);
    
    let string = "";
    // for each {location, totalPrice} in output output something like:
    for (let {location, totalPrice} of output) {
      let address = Object.values(location.address).join(" ");
      string += '\n' + location.name + '\n' + address + "\n" + totalPrice + "\n"; 
    }
    twiml.message(string);
    console.log("we got here");
    res.type('text/xml').send(twiml.toString());
    // for each {location, totalPrice} in output output something like:
    // Location Name: <name>
    // Location Address: <address>
    // Estimated Cost: <totalPrice>
  }
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});