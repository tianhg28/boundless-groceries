import fetch from 'node-fetch';

const apiKey = 'apiKey=25bf532c17584c89868dde09b7c4a847'
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

  const response = await fetch(searchString);
  const data = await response.json();
  const ingredients = data['extendedIngredients'].map(ingredient => ingredient.name);
  return ingredients;
}