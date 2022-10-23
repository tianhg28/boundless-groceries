import XMLHttpRequest from 'xhr2';

const apiKey = '&apiKey=d6b702b943fe427884ffdcb4cc7bbf17'
const map = new Map();

function getRecipes(tags) {
  let searchString = 'https://api.spoonacular.com/recipes/complexSearch?';
  searchString += 'query=' + tags + apiKey;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', searchString, true);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const res = JSON.parse(xhr.responseText);
      for (var i = 0; i < res.results.length; i++) {
        // This needs to be changed to message the twilio thingy
        console.log((i + 1) + ") " + res.results[i]['title'])
        var id = res.results[i]['id'];
        map.set(i + 1, id);
      }
    }
  };
  xhr.send(null);
  // fetch(searchString)
  // .then((response) => response.json())
  // .then((data) => console.log(data));
}

getRecipes(process.argv[2])
