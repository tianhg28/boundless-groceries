import { Buffer } from 'node:buffer';

async function getAccessToken() {
    let url = "https://api.kroger.com/v1/connect/oauth2/token";
    let clientId = "boundlessgroceries-54a8f2bbd34a77ef33396a66c8801cf8401111886519534563";
    let clientSecret = "P-R3POo8eFhbSE4sjI1XZkB-TCasiwwGvTdVt-wc";

    const encoded = Buffer.from(`${clientId}:${clientSecret}`, `ascii`);
    // ClientId and clientSecret must be encoded
    const authorization = "Basic " + encoded.toString("base64");
  
    let response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
          //"Authorization": "Basic {{base64(" + client_id  + ":" + client_secret + ")}}",
          "Authorization": authorization,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials&scope="
      })
    
    response.json().then(res => res.access_token);
}

export default getAccessToken;