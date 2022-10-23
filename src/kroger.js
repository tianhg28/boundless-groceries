import getAccessToken from "../src/authentication.js";
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config({path: '../.env'});




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
    console.log(json);
    return json.data;
    
  }

async function getPricesInLocations(zipCode, productNames) {
  let res = [];
  let locations = await getLocations(zipCode);
  await locations.forEach(async location => {
    let locationId = location.locationId;
    let totalPrice = 0;
    await productNames.forEach(async productName => {
      let price = await getCheapestPrice(locationId, productName);
      if (price == -1) {
        totalPrice = null;
      }
      totalPrice += price; 
      if (totalPrice != null) {
        res.push({location, totalPrice});
      }
    });
  })
  return res;
}

// given locationId and product, return item object containing
// cheaptest price
// Param: LocationId, Product
// Returns: Price of cheapest item, -1 if product doesn't exist
async function getCheapestPrice(locationId, productName) {
  // Get array of products
  let products = await getProducts(locationId, productName)

  if (products == undefined || products.length == 0) {
    return -1;
  }

  let cheapestIndex = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < products.length; i++) {
    if (products[i].items[0].price != null) {
      cheapestIndex = Math.min(cheapestIndex, products[i].items[0].price.regular);
    }
  }

  if (cheapestIndex == Number.MAX_SAFE_INTEGER) {
    return -1;
  }
  return cheapestIndex;
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

export {getLocations, getProducts, getPricesInLocations, getCheapestPrice};
