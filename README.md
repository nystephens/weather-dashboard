# Weather Dashboard
A web app that displays up to date weather statistics and predictions.  The user is able to type a city name into the search box and when their input is submitted, the users input is used as a search term to fetch data from the Open Weather API.  Data for that corresponding city is then fetched and populated onto the page in an easily readable graphic dashboard.  

There are two main sections on this webpage, the search section and the results section.  The search section contains the searh bar, search button, a user generated list of previously searched cities, and a delete search history button.  Upon submission of the search form, the search term is saved to an array in local storage.  A DOM element containing the name of past searched cities will appear below the search button, listing the users search history.  When the previously searched cities are clicked, the name of the clicked city is entered as a search term. This search history list is rendered when the page is reloaded.

In the results section there are two rows.  The first is a current forecast card that shows the forecast information for that moment.  Below that is a five day forecast.  The data contained in these cards is fetched from the Open Weather API and then presented on the page.  

Local storage saves the last search and loads that search upon reloading the webpage.  If there is no last search value then the default city on display is Los Angeles.  In the future it would be good to build a feature that gets the users current location and loads that upon opening, but for now LA works for the MVP default.

Here is a link to my deployed application on GitHub pages:
https://nystphens.github.io/weather-dashboard/


Here is a screenshot of the deployed application:
![weather dashboard screenshot](./assets/weather-dashboard.png)
