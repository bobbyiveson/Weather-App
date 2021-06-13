// base url
const baseUrl = 'http://api.weatherapi.com/v1';

// routes
const currentWeather = '/current.json';
const forecast = '/forecast.json';

// key
const apiKey = '?key=a2b8e7e39db140c18df215438212105';

// params
const qParam = '&q=';
let qLocation = '';

function setLocation(event) {
  const locationQuery = event.target[0].value;
  console.log(locationQuery);
  qLocation = locationQuery;
  console.log(qLocation);
}

function fetchData() {
  fetch(baseUrl + currentWeather + apiKey + qParam + qLocation)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((response) => {
      renderResponse(response);
      console.log(response);
    })
    .catch((error) => {
      const output = document.getElementById('output');
      output.style.display = 'none';
      console.log('error', error);
    });
}
// output.style.display = 'none;';

function renderResponse(jsonObject) {
  const output = document.getElementById('output');
  console.log();
  const jsonString = JSON.stringify(jsonObject, null, 2);
  //   output.innerHTML = '<pre>' + jsonString + '</pre>';
  output.style.display = 'block';

  const name = document.getElementById('name');
  name.innerHTML = jsonObject.location.name;
  const region = document.getElementById('region');
  region.innerHTML = jsonObject.location.region;
  const country = document.getElementById('country');
  country.innerHTML = jsonObject.location.country;
  const time = document.getElementById('time');
  time.innerHTML = jsonObject.location.localtime;

  const tempC = document.getElementById('temp-c');
  tempC.innerHTML = '<span>Temp: </span>' + jsonObject.current.temp_c + 'C';
  const feelsLikeTemp = document.getElementById('feels-like-c');
  feelsLikeTemp.innerHTML =
    '<span>Feels like: </span>' + jsonObject.current.feelslike_c + 'C';
  const conditionText = document.getElementById('text');
  conditionText.innerHTML =
    '<span>Condition: </span>' + jsonObject.current.condition.text;
  const conditionIcon = document.getElementById('icon');
  conditionIcon.setAttribute('src', jsonObject.current.condition.icon);
  const windMph = document.getElementById('wind-mph');
  windMph.innerHTML = '<span>mph: </span>' + jsonObject.current.wind_mph;
  const windDirection = document.getElementById('wind-direction');
  windDirection.innerHTML =
    '<span>direction: </span>' + jsonObject.current.wind_dir;
  const humidity = document.getElementById('humidity');
  humidity.innerHTML = '<span>Humidity: </span>' + jsonObject.current.humidity;
  const cloud = document.getElementById('cloud');
  cloud.innerHTML = '<span>Cloud: </span>' + jsonObject.current.cloud + '%';
  const uv = document.getElementById('uv');
  uv.innerHTML = '<span>UV: </span>' + jsonObject.current.uv;
  const gustMph = document.getElementById('gust-mph');
  gustMph.innerHTML = '<span>gust mph: </span>' + jsonObject.current.gust_mph;
}

const locationSearchForm = document.getElementById('location-search-form');
locationSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  setLocation(event);
  fetchData();
});
