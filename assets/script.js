// Define global variables up here

let searchInput = document.getElementById("search-bar");

// Use this filter to change all letters in string to uppercase if needed.
// searchInput.value.toUppercase();


// fetch requests
// create fetch requests that get weather info from open weather and populate them into their respective HTML areas
function search() {

// fetch current weather conditions for search city
fetch("https://api.openweathermap.org/data/2.5/weather?q=london&units=imperial&appid=191533fb1cf9b39f93e215abebe1b6c9")
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
    // get name of city
    console.log(data.name); 
    document.getElementById('name').innerHTML = data.name;
    // pass in temperature value
    console.log(data.main.temp);
    document.getElementById('temp').innerHTML = Math.floor(data.main.temp);
    // pass in humidity value
    console.log(data.main.humidity);
    document.getElementById('hum').innerHTML = data.main.humidity;
    // pass in wind speed
    console.log(data.wind.speed);
    document.getElementById('wind').innerHTML = data.wind.speed;
    // set variables for lat and long to be used in next call
    let lon = data.coord.lon;
    let lat = data.coord.lat;
});
// fetch results for UV Index using One Call API.  
console.log(lat, lon);
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=191533fb1cf9b39f93e215abebe1b6c9`)
// fetch results for the 5 day forecast cards
fetch("https://api.openweathermap.org/data/2.5/forecast?q=london&appid=191533fb1cf9b39f93e215abebe1b6c9")


// end search function
}

// write content with fetched variables

// local storage saves last search so that localtion is presented when the page is reloaded.  Hardcode a popular city to present on load by setting an intial value for the searchh term and then replace that with user's input.

// search button engages the fetch requests and clears text from search input
document.getElementById('search-button').addEventListener("click", search);

// popular cities list takes the name of the clicked city and enters it as a search term, then calls the search function for that city.


