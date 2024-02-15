import fetch from 'node-fetch';

async function getPricesInLocations(zipCode, productNames, accessToken) {
  let locations = await getLocations(zipCode, accessToken);

  // Wrap the logic for processing each location into a function that returns a promise
  const processLocation = async (location) => {
    let locationId = location.locationId;
    let pricesPromises = productNames.map(productName => 
      getCheapestPrice(locationId, productName, accessToken)
    );

    // Execute all promises for product prices in parallel
    let prices = await Promise.all(pricesPromises);

    // Check if any price is -1, if so, set totalPrice to null
    let totalPrice = prices.includes(-1) ? null : prices.reduce((total, price) => total + price, 0);

    return totalPrice !== null ? {location, totalPrice} : null;
  };

  // Map each location to a promise processing that location
  let resultsPromises = locations.map(location => processLocation(location));

  // Execute all location processing in parallel
  let results = await Promise.all(resultsPromises);

  // Filter out any null results (where totalPrice was null)
  let res = results.filter(result => result !== null);

  return res;
};

// given locationId and product, return item object containing
// cheaptest price
// Param: LocationId, Product
// Returns: Price of cheapest item, -1 if product doesn't exist
async function getCheapestPrice(locationId, productName, accessToken) {
  // Get array of products
  let products = await getProducts(locationId, productName, accessToken)
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

async function getProducts(locationId, productName, accessToken) {
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
        "Content-Type": "application/json"
      }
    });
    // Return JSON object
    let json = await productResponse.json();
    return json.data;
}


async function getLocations(zipCode, accessToken) {
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

export {getLocations, getProducts, getPricesInLocations, getCheapestPrice};
