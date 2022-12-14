import fetch from 'node-fetch';

const apiKey = 'apiKey=79e72bb78e0a4ea09a550126ed3a0279'
const ingredients = [];
const map = new Map();

export async function getRecipes(tags) {
  let searchString = 'https://api.spoonacular.com/recipes/complexSearch?';
  searchString += 'query=' + tags + '&' + apiKey;
  let response = await fetch(searchString, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  let json = await response.json();
  for (let i = 0; i < json.results.length; i++) {
    map.set(json.results[i]['id'], json.results[i]['title']);
  }
  return map;
  // fetch(searchString)
  // .then((response) => response.json())
  // .then((data) => console.log(data));
}

export async function getIngredients(id) {
  let searchString = 'https://api.spoonacular.com/recipes/' + id + '/information';
  // Append api key
  searchString += '?' + apiKey + '&includeNutrition=false';

  fetch(searchString)
  .then((response) => response.json())
  .then((data) => {
    for (var i = 0; i < data['extendedIngredients'].length; i++) {
          ingredients.push(data['extendedIngredients'][i].name);
          // This needs to be changed to message the twilio thingy
        }
  });
  return ingredients;
}