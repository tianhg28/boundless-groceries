import getAccessToken from "../src/authentication.js";

async function getLocations(zipCode) {
    // Use stored access token for location request
    let accessToken = await getAccessToken();

    let locationUrl = "https://api.kroger.com/v1/locations?filter.zipCode.near=" + zipCode;
    // Location request body
    let locationResponse = await fetch(locationUrl, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Authorization": `bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    // Return JSON object
    let json = await locationResponse.json();
    return json.data;
    
  }

async function getPricesInLocations(zipCode, productNames) {
  let res = [];
  let locations = await getLocations(zipCode);
  locations.forEach(location => {
    let locationId = location.locationId;
    let totalPrice = 0;
    productNames.every(async productName => {
      let price = 1;// await getCheapestPrice(locationId, productName);
      if (price == null) {
        totalPrice = null;
        return false;
      }
      totalPrice += price;
      return true;
    })
    if (totalPrice != null) {
      res.push({location, totalPrice});
    }
  });
  return res;
}


async function getProducts(locationId, productName) {
    // Use stored access token for product request
    let accessToken = await getAccessToken();
    // Build product URL
    // Base URL (https://api.kroger.com)
    // Version/Endpoint (/v1/products)
    // Query String (?filter.locationId=term)
    let productUrl = `https://api.kroger.com/v1/products?filter.locationId=${locationId}&filter.term=${productName}`;
    // Product request body
    let productResponse = await fetch(productUrl, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    // Return JSON object
    let json = await productResponse.json();
    return json.data;
  }

export {getLocations, getProducts, getPricesInLocations};