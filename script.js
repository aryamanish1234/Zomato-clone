const searchInput = document.querySelector('.mySearchBox')
const populateCards = document.querySelector('.suggestions')
dataRequired = [];
// const endpoint ="https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const endpoint ="https://api.jsonbin.io/b/5f9e3e27ce4aa2289553ee69";

// .address
// rating
// name
// type_of_food

fetch(endpoint)
.then(function (reponse) {
    // console.log(reponse)
  return reponse.json();
})
.then(function (data) {
    dataRequired.push(...data);
}).catch(function(error){
    console.log(error)
})



function getInputfromSearch(){
  const searchBoxinput = searchInput.value;
  return searchBoxinput
}

function findRequired(matchHere, dataRequired) {
  return dataRequired.filter(function(place)
  {
    const regex = new RegExp(`^${matchHere}`, 'gi');
    return place.name.match(regex) || place.type_of_food.match(regex)
  });
}



function numberCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

let dataCopy = [...dataRequired]
function searchRestaurant(){
  const value = getInputfromSearch()
  if(value.length === 0){
    determineIfEmpty(dataCopy)
  }else if(value.length !== 0){
    determineIfEmpty(dataRequired)
  }
}

function determineIfEmpty(getArrayData){
  const value = getInputfromSearch()
  const matchArray = findRequired(value, getArrayData)
  const html = matchArray.map(function(place){
  const regexNew = new RegExp(`^${value}`, 'gi')
  const cityName = place.name.replace(regexNew, `<span class ="hl">${value}</span>`)
  const stateName = place.type_of_food.replace(regexNew, `<span class = "hl">${value}</span>`)
  const rating = numberCommas(place.rating)
  
    
  const adderes = place.address
  return `
    <li>
    <span class ="name">${cityName}, ${stateName}</span>
    <span class ="rating">Ratings ${rating}</span>
    <h3 class = "displayGood">
    ${adderes}
    </h3>

    
    </li>`
  }).join('');
  populateCards.innerHTML = html
}

searchInput.addEventListener('change', searchRestaurant)
searchInput.addEventListener('keyup', searchRestaurant)



