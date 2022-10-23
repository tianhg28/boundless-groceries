import {getLocations, getProducts} from "../src/kroger.js"

let zipCode = "98105";
console.log(await getLocations(zipCode));
console.log(await getProducts(70500807, "milk"));