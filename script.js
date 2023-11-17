//Handling the getCurrentPosition function
function position_success(position){
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  getLocation(lat,long);
  getWeather(lat,long);
}

function position_error(){
  const grid = document.querySelector('#grid');
  grid.style.display = 'none';
  
  alert("Please Enable Location Services");
}

if(!navigator.geolocation) {
  alert("Geolocation Unavailable, Please Try Later");
}
else{
  navigator.geolocation.getCurrentPosition(position_success, position_error);
}

//Utilizing the Trueway Reverse Geocoding API
async function getLocation(lat,long){
    const url = `https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${lat}%2C${long}&language=en`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '72bef8a0e0mshc2a48bfbf76a33cp1f0bf9jsn2eba487d9cba',
        'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      insertLocation(result);
    } catch (error) {
      console.error(error);
    }
  }
//Function to print results retured by the Reverse Geocoding
function insertLocation(json){
  const curr_city = document.querySelector('#city');
  curr_city.textContent = `${json.results[0].locality}, ${json.results[0].region}`;
}

async function getWeather(lat,long){
  const url = `https://world-weather-online-api1.p.rapidapi.com/weather.ashx?q=${lat}%2C${long}&num_of_days=5&lang=en&aqi=yes&alerts=no&format=json`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '72bef8a0e0mshc2a48bfbf76a33cp1f0bf9jsn2eba487d9cba',
      'X-RapidAPI-Host': 'world-weather-online-api1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    insertTemp(result);
    insertFeelsLike(result);
    insertWindSpeed(result);
    insertPrecip(result);
    insertHumidity(result);
    insertUV(result);
    insertImageandBackground(result);
    insertSunTime(result);
  } catch (error) {
    console.error(error);
  }
}

//Updating temperature
function insertTemp(json){
  const curr_temp = document.querySelector('#temp');
  curr_temp.textContent = `${json.data.current_condition[0].temp_F}°F`;
}

//Updating feels like
function insertFeelsLike(json){
  const feel_like = document.querySelector('#feels-info');
  feel_like.textContent = `${json.data.current_condition[0].FeelsLikeF}°F`;
}

//Updating Wind Speed
function insertWindSpeed(json){
  const wind_speed = document.querySelector('#speed-info');
  const wind_direction = document.querySelector('#speed-dir');

  wind_speed.textContent = `${json.data.current_condition[0].windspeedMiles} mph`;
  wind_direction.textContent = `${json.data.current_condition[0].winddir16Point}`;
}

//Updating precipitation
function insertPrecip(json){
  const precipitation = document.querySelector('#precip-info');
  precipitation.textContent = `${json.data.current_condition[0].precipMM} mm`;
}

//Updating Humidity
function insertHumidity(json){
  const humidity = document.querySelector('#humid-info');
  humidity.textContent = `${json.data.current_condition[0].humidity}%`
}

//Updating UV and also rating for UV
function insertUV(json){
  const uv = document.querySelector('#uv-info');
  const uv_scale = document.querySelector('#uv-scale');

  uv.textContent = `${json.data.current_condition[0].uvIndex}`
  if(Number(uv.textContent) <= 2){
    uv_scale.textContent = 'Low';
  }
  else if(Number(uv.textContent) <= 5){
    uv_scale.textContent = 'Moderate';
  }
  else if(Number(uv.textContent) <= 7){
    uv_scale.textContent = 'High';
  }
  else if(Number(uv.textContent) <= 10){
    uv_scale.textContent = 'Very high';
  }
  else{
    uv_scale.textContent = 'Extreme';
  }
}

//Updating Image and also changing color of background(both based on weather designation)
function insertImageandBackground(json){
  const weather_img = document.querySelector('#image');
  const designation = json.data.current_condition[0].weatherDesc[0].value;
  const background = document.querySelector('body');

  if(designation === "Overcast" || designation === "Cloudy"){
    weather_img.src = "/assets/cloudy.png";
    background.style.backgroundImage = 'linear-gradient(#b2beb5,#848884)';
  }
  else if(designation === "Clear"){
    weather_img.src = "/assets/moon.png";
    background.style.backgroundImage = 'linear-gradient(#131862,#2e4482,#546bab)';
  }
  else if(designation === "Sunny"){
    weather_img.src = "/assets/sunny.png";
  }
  else if(designation === "Mist"){
    weather_img.src = "/assets/mist.png";
    background.style.backgroundImage = 'linear-gradient(#a5c0c2,#96a8ae)';
  }
  else if(designation === "Partly cloudy"){
    weather_img.src = "/assets/partlycloudy.png";
    background.style.backgroundImage = 'linear-gradient(#7ea1b2,#207e8b)';
  }
  else if(designation === "Patchy snow possible" || designation === "Blowing snow" || designation === "Blizzard" || designation === "Freezing drizzle" || designation === "Heavy freezing drizzle" || designation === "Light freezing rain"){
    weather_img.src = "/assets/snowflake.png";
    background.style.backgroundImage = 'linear-gradient(#98b0d7,#dadfec)';
  }
  else if(designation === "Moderate rain" ||designation === "Heavy rain"){
    weather_img.src = "/assets/rain.png";
    background.style.backgroundImage = 'linear-gradient(#4e6881,#4a6583)';
  }
  else if(designation === "Patchy light rain" || designation === "Light rain"){
    weather_img.src = "/assets/shower.png";
    background.style.backgroundImage = 'linear-gradient(#4799c0,#c8d4e7)';
  }
  else if(designation === "Thundery outbreaks possible"){
    weather_img.src = "/assets/thunderstorm.png";
    background.style.backgroundImage = 'linear-gradient(#372951,#765c96)';
  }
  else if(designation === "Light drizzle" || designation === "Patchy light drizzle"){
    weather_img.src = "/assets/drizzle.png";
    background.style.backgroundImage = 'linear-gradient(#4799c0,#c8d4e7)';
  }
}

//Inserting sunrise and sunset times
function insertSunTime(json){
  const sunrise = document.querySelector('#sunrise-info');
  const sunset = document.querySelector('#sunset-info');

  sunrise.textContent = json.data.weather[0].astronomy[0].sunrise;
  sunset.textContent = json.data.weather[0].astronomy[0].sunset;
}