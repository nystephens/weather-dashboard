
// Search Function Start
// create fetch requests that get weather info from open weather and populate them into their respective HTML areas
function search(searchTerm) {

// fetch current weather conditions for search city
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=191533fb1cf9b39f93e215abebe1b6c9`)
.then(function(response){
    return response.json();
})
.then(function(data){
    // get name of city
    document.getElementById('name').innerHTML = data.name;
    // pass in temperature value
    document.getElementById('temp').innerHTML = Math.floor(data.main.temp);
    // pass in humidity value
    document.getElementById('hum').innerHTML = data.main.humidity;
    // pass in wind speed
    document.getElementById('wind').innerHTML = data.wind.speed;
    // weather icon
    let currentIcon = data.weather[0].icon;
    document.getElementById('current-icon').setAttribute("src", `http://openweathermap.org/img/wn/${currentIcon}@2x.png`);
    // description
    document.getElementById('description').innerHTML = data.weather[0].description;

    // set variables for lat and long to be used in next call
    let lon = data.coord.lon;
    let lat = data.coord.lat;

        // fetch results for UV Index using One Call API.  
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=191533fb1cf9b39f93e215abebe1b6c9`)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
        document.getElementById('uv').innerHTML = data.current.uvi;

            console.log(document.getElementById('uv').innerHTML);
            // if UVI is good then add class .uvi-good, if moderate add .uv-mod, if bad add .uvi-warn
            if (document.getElementById('uv').innerHTML < 3) {
                document.getElementById('uv').classList.add("uvi-good");
                document.getElementById('uv').classList.remove("class", "uvi-mod");
                document.getElementById('uv').classList.remove("class", "uvi-warn");
            } else if (document.getElementById('uv').innerHTML >= 3 && document.getElementById('uv').innerHTML <= 6 ) {
                document.getElementById('uv').classList.add("class", "uvi-mod");
                document.getElementById('uv').classList.remove("class", "uvi-good");
                document.getElementById('uv').classList.remove("class", "uvi-warn");
            } else {
                document.getElementById('uv').classList.add("class", "uvi-warn");
                document.getElementById('uv').classList.remove("class", "uvi-good");
                document.getElementById('uv').classList.remove("class", "uvi-mod");
            }
        })

    // fetch results for the 5 day forecast cards
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=191533fb1cf9b39f93e215abebe1b6c9&units=imperial`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // create a new array of only data objects for the 12:00:00 time block
        let fiveDayArray = data.list.filter(day => day.dt_txt.includes('12:00:00'));
        // itirate over length of fiveDayArray and pass in values for each element of the card
        for(let i = 0; i < fiveDayArray.length; i++){
        // format date for use in card
        let dateCard1 = new Date(fiveDayArray[i].dt_txt).toLocaleString().split(',')[0];
        // pass date to card
        document.getElementById(`date-card-${i}`).innerHTML = dateCard1;
        let iconId = fiveDayArray[i].weather[0].icon;
        // pass in icon
        document.getElementById(`img-card-${i}`).setAttribute("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`);
        // pass in temp
        document.getElementById(`temp-card-${i}`).innerHTML =  Math.floor(fiveDayArray[i].main.temp);
        // pass in hum
        document.getElementById(`hum-card-${i}`).innerHTML = fiveDayArray[i].main.humidity;
        }
    })

    
}).catch(function(){
    document.getElementById('name').innerHTML = "City not found!  Please try again.";
});

// display current date
let today = new Date();
document.getElementById('current-date').innerHTML = today.toDateString();

// set last search term as data item
localStorage.setItem("last-search", searchTerm);

// end search function
}



// local storage saves last search so that location is presented when the page is reloaded.  Hardcode a popular city to present on load by setting an intial value for the search term and then replace that with user's input.

// On Load Function Start
function onLoad(){
    if (localStorage.getItem("last-search") === null){
        searchTerm = "los angeles";
        search(searchTerm);
    } else {
        searchTerm = localStorage.getItem("last-search");
        search(searchTerm);
    }
}

onLoad();



// Handlers Start

// search button engages the fetch requests and clears text from search input
document.getElementById('search-button').addEventListener("click", function(){
    let searchInput = document.getElementById("search-input");
    let searchTerm = searchInput.value.toLowerCase().trim();
    search(searchTerm);
    searchInput.value = "";
    console.log(searchTerm);
});

// submit search on enter
let searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById('search-button').click();
    }
  });

// look up event listeners for UL of popular search terms.  callback search with parameter of text in list link 

// popular cities list takes the name of the clicked city and enters it as a search term, then calls the search function for that city.
document.getElementById('pop-cit-0').addEventListener("click", function(){
    let searchTerm = document.getElementById('pop-cit-0').textContent;
    document.getElementById('search-input').value = searchTerm;
    search(searchTerm);
    searchInput.value = "";
});

document.getElementById('pop-cit-1').addEventListener("click", function(){
    let searchTerm = document.getElementById('pop-cit-1').textContent;
    document.getElementById('search-input').value = searchTerm;
    search(searchTerm);
    searchInput.value = "";
});

document.getElementById('pop-cit-2').addEventListener("click", function(){
    let searchTerm = document.getElementById('pop-cit-2').textContent;
    document.getElementById('search-input').value = searchTerm;
    search(searchTerm);
    searchInput.value = "";
});

document.getElementById('pop-cit-3').addEventListener("click", function(){
    let searchTerm = document.getElementById('pop-cit-3').textContent;
    document.getElementById('search-input').value = searchTerm;
    search(searchTerm);
    searchInput.value = "";
});

document.getElementById('pop-cit-4').addEventListener("click", function(){
    let searchTerm = document.getElementById('pop-cit-4').textContent;
    document.getElementById('search-input').value = searchTerm;
    search(searchTerm);
    searchInput.value = "";
});

