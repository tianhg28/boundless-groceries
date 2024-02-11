import fetch from 'node-fetch';
import { Buffer } from 'node:buffer';
import * as dotenv from 'dotenv';
dotenv.config();

async function getAccessToken() {
    let url = "https://api.kroger.com/v1/connect/oauth2/token";
    let clientId = process.env.KROGER_CLIENT_ID;
    let clientSecret = process.env.KROGER_CLIENT_SECRET;

    const encoded = Buffer.from(`${clientId}:${clientSecret}`, `ascii`);
    // ClientId and clientSecret must be encoded
    const authorization = "Basic " + encoded.toString("base64");
  
    let response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Authorization": authorization,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials&scope=product.compact"
      });
    let responseJSON = await response.json();
    return responseJSON.access_token;
}

export default getAccessToken;