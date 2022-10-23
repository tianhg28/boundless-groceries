async function getAccessToken() {
    let url = "https://api.kroger.com/v1/connect/oauth2/token";
    let client_id = "boundlessgroceries-54a8f2bbd34a77ef33396a66c8801cf8401111886519534563";
    let client_secret = "P-R3POo8eFhbSE4sjI1XZkB-TCasiwwGvTdVt-wc";
    let response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Authorization": "Basic {{base64(" + client_id  + ":" + client_secret + "client_secret)}}",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials&scope={{N/A}}"
      });
    return response.json();
}

export default getAccessToken;