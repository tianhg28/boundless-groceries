async function getLocations(zipCode) {
    // Use stored access token for location request
    let accessToken = authentication.getAccessToken();
    // Build location URL
    // Base URL (https://api.kroger.com)
    // Version/Endpoint (/v1/locations)
    // Query String (?filter.zipCode.near=term)
    let locationUrl = `${
      config.apiBaseUrl
    }/v1/locations?filter.zipCode.near=${zipCode}`;
    // Location request body
    let locationResponse = await fetch(locationUrl, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    // Return JSON object
    return locationResponse.json();
  }

async function getProducts(locationId) {
    // Use stored access token for product request
    let accessToken = authentication.getAccessToken();
    // Build product URL
    // Base URL (https://api.kroger.com)
    // Version/Endpoint (/v1/products)
    // Query String (?filter.locationId=term)
    let productUrl = `${
      config.apiBaseUrl
    }/v1/products?filter.locationId=${locationId}`;
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

module.exports = {
  getLocations,
  getProducts
};