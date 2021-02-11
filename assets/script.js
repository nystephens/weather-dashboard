let searchHistArray = JSON.parse(localStorage.getItem("last-search")) || [];


// Search Function Start
// create fetch requests that get weather info from open weather and populate them into their respective HTML areas
function search(searchTerm) {

    // fetch current weather conditions for search city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=191533fb1cf9b39f93e215abebe1b6c9`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    document.getElementById('uv').innerHTML = data.current.uvi;

                    // if UVI is good then add class .uvi-good, if moderate add .uv-mod, if bad add .uvi-warn
                    if (document.getElementById('uv').innerHTML < 3) {
                        document.getElementById('uv').classList.add("uvi-good");
                        document.getElementById('uv').classList.remove("class", "uvi-mod");
                        document.getElementById('uv').classList.remove("class", "uvi-warn");
                    } else if (document.getElementById('uv').innerHTML >= 3 && document.getElementById('uv').innerHTML <= 6) {
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
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // create a new array of only data objects for the 12:00:00 time block
                    let fiveDayArray = data.list.filter(day => day.dt_txt.includes('12:00:00'));
                    // itirate over length of fiveDayArray and pass in values for each element of the card
                    for (let i = 0; i < fiveDayArray.length; i++) {
                        // format date for use in card
                        let dateCard1 = new Date(fiveDayArray[i].dt_txt).toLocaleString().split(',')[0];
                        // pass date to card
                        document.getElementById(`date-card-${i}`).innerHTML = dateCard1;
                        let iconId = fiveDayArray[i].weather[0].icon;
                        // pass in icon
                        document.getElementById(`img-card-${i}`).setAttribute("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`);
                        // pass in temp
                        document.getElementById(`temp-card-${i}`).innerHTML = Math.floor(fiveDayArray[i].main.temp);
                        // pass in hum
                        document.getElementById(`hum-card-${i}`).innerHTML = fiveDayArray[i].main.humidity;
                    }
                })


        }).catch(function () {
            document.getElementById('name').innerHTML = "City not found!  Please try again.";
        });

    // display current date
    let today = new Date();
    document.getElementById('current-date').innerHTML = today.toDateString();


    // set last search term as a data item in search history array if it is not already present in that array
    // if (searchHistArray.includes(searchTerm) === false) searchHistArray.push(searchTerm);
    // searchHistArray.push(searchTerm);


    // end search function
}



// local storage saves last search so that location is presented when the page is reloaded.  Hardcode a popular city to present on load by setting an intial value for the search term and then replace that with user's input.

// On Load Function Start
function onLoad() {
    if (localStorage.getItem("last-search") === null) {
        searchTerm = "los angeles";
        search(searchTerm);
        localStorage.clear();
    } else {
        // searchTerm = localStorage.getItem("last-search");
        search(searchHistArray[searchHistArray.length - 1]);

        renderHistory();

        // for (let i = 0; i < searchHistArray.length; i++) {
        //     saveSearchHistory(searchHistArray[i]);
        // }
    }
}


onLoad();

function renderHistory() {
    // create DOM element that holds the quick search list

    let quickSearchList = document.querySelector(".collection");
    quickSearchList.innerHTML = '';

    searchHistArray.forEach(function (city) {
        // create DOM <a> element that holds the last search
        let searchHistoryEl = document.createElement("a");

        searchHistoryEl.setAttribute("href", "#!");
        // searchHistoryEl.id = "search-history-el-" + searchHistArray.indexOf(searchHistArray[i]);
        searchHistoryEl.className = "collection-item";
        searchHistoryEl.classList.add("search-hist-el")
        searchHistoryEl.innerHTML = city.toUpperCase();


        // append new dom element to collection
        quickSearchList.appendChild(searchHistoryEl);
    });





}


// Save Search History Function
function saveSearchHistory(city) {
    if (!searchHistArray.includes(city)) {
        searchHistArray.push(city);
        localStorage.setItem("last-search", JSON.stringify(searchHistArray));
        console.log(searchHistArray);
    }
}


function deleteSearchHistory() {
    let searchHist = document.querySelector(".collection");
    searchHist.innerHTML = "";
}


// Handlers Start

// search button click engages the fetch requests and clears text from search input
document.getElementById('search-form').addEventListener("submit", function (e) {
    e.preventDefault();
    let searchInput = document.getElementById("search-input");
    let searchTerm = searchInput.value.toLowerCase().trim();
    console.log(searchTerm);
    search(searchTerm);
    saveSearchHistory(searchTerm);
    searchInput.value = "";
    renderHistory();
});

// submit search on enter
// let searchInput = document.getElementById("search-input");
// searchInput.addEventListener("keyup", function (event) {
//     if (event.keyCode === 13) {
//         event.preventDefault();
//         document.getElementById('search-button').click();
//     }
// });

// click handler for search history cities
document.querySelector(".collection").addEventListener("click", function (e) {
    e.preventDefault();
    search(e.target.textContent);
    console.log(e.target.textContent);
    console.log("Hello");
    console.log(this);
});

// document.querySelector(".collection-item").addEventListener("click", function(){
// console.log("Hello");

//     console.log(this);
//     // // let the searchTerm equal the city name that is in the search element
//     // let searchTerm = document.getElementById(this).innerHTML;

//     // console.log(searchTerm);

//     // // search with selected searchTerm.
//     // search(searchTerm);
// });

// reference click handler for previous popular city list
// document.getElementById('pop-cit-4').addEventListener("click", function(){
//     let searchTerm = document.getElementById('pop-cit-4').textContent;
//     document.getElementById('search-input').value = searchTerm;
//     search(searchTerm);
//     searchInput.value = "";
// });

// delete button click handler
document.getElementById('delete').addEventListener("click", function () {
    searchHistArray = [];
    localStorage.clear();
    deleteSearchHistory();
});
