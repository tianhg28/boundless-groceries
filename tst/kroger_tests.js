import {getLocations, getProducts} from "../src/kroger.js"

const zipCode = "98105";
const locations = await getLocations(zipCode);
const products = await getProducts(70500807, "milk");
console.log(products);