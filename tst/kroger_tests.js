import {getLocations, getProducts} from "../src/kroger.js"

let zipCode = "78704";
console.log(await getLocations(zipCode));