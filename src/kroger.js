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
    return locationResponse.json();
    
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
    return productResponse.json();
  }

export {getLocations, getProducts};