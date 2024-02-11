import fetch from 'node-fetch';

async function getPricesInLocations(zipCode, productNames, accessToken) {
  let res = [];
  let locations = await getLocations(zipCode, accessToken);

  for (const location of locations) {
    let locationId = location.locationId;
    let totalPrice = 0;
    for (let i = 0; i < productNames.length; i++) {
      let price = await getCheapestPrice(locationId, productNames[i], accessToken);
      if (price == -1) {
        totalPrice = null;
        break;
      }
      totalPrice += price; 
    }

    if (totalPrice != null) {
      res.push({location, totalPrice});
    }
  }

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
