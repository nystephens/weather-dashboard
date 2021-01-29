
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

    
})

localStorage.setItem("last-search", searchTerm);
// end search function
}

// local storage saves last search so that location is presented when the page is reloaded.  Hardcode a popular city to present on load by setting an intial value for the search term and then replace that with user's input.

// // On Load Function Start
// function onLoad(){
//     if (localStorage.getItem("last-search") === undefined){
//         searchTerm = "los angeles"
//         search(searchTerm);
//     } else {
//     localStorage.getItem("last-search").value = searchTerm;
//     console.log(searchTerm);
//     search(searchTerm);
//     }
// }

// onLoad();



// Click Handlers Start

// search button engages the fetch requests and clears text from search input
document.getElementById('search-button').addEventListener("click", function(){
    let searchInput = document.getElementById("search-input");
    let searchTerm = searchInput.value.toLowerCase().trim();
    search(searchTerm);
    console.log(searchTerm);
});

// look up event listeners for UL of popular search terms.  callback search with parameter of text in list link 

// popular cities list takes the name of the clicked city and enters it as a search term, then calls the search function for that city.
document.getElementById('pop-cit-0').addEventListener("click", function(){
    let searchTerm = document.getElementById('pop-cit-0').textContent;
    console.log(searchTerm);
    document.getElementById('search-input').value = searchTerm;
    search(searchTerm);
});

document.getElementById('pop-cit-1').addEventListener("click", function(){
    let searchTerm = document.getElementById('pop-cit-1').textContent;
    console.log(searchTerm);
    document.getElementById('search-input').value = searchTerm;
    search(searchTerm);
});

document.getElementById('pop-cit-2').addEventListener("click", function(){
    let searchTerm = document.getElementById('pop-cit-2').textContent;
    console.log(searchTerm);
    document.getElementById('search-input').value = searchTerm;
    search(searchTerm);
});

document.getElementById('pop-cit-3').addEventListener("click", function(){
    let searchTerm = document.getElementById('pop-cit-3').textContent;
    console.log(searchTerm);
    document.getElementById('search-input').value = searchTerm;
    search(searchTerm);
});

document.getElementById('pop-cit-4').addEventListener("click", function(){
    let searchTerm = document.getElementById('pop-cit-4').textContent;
    console.log(searchTerm);
    document.getElementById('search-input').value = searchTerm;
    search(searchTerm);
});

