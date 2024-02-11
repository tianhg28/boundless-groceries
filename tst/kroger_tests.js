import {getLocations, getProducts} from "../src/kroger.js"
import getAccessToken from "../src/authentication.js";

// Use stored access token for location request
let accessToken = await getAccessToken();
console.log(accessToken)

const zipCode = "98105";
const locations = await getLocations(zipCode, accessToken);
const products = await getProducts(70500807, "milk", accessToken);
console.log(locations[0].name, locations.length);
console.log(products[0].brand, products.length);