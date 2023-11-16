//Handling the getCurrentPosition function
function position_success(position){
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  getLocation(lat,long);
  getWeather(lat,long);
}

function position_error(){
  p.textContent = "Sorry could not return location";
}

if(!navigator.geolocation) {
  p.textContent = "Geolocation not supported";
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
    insertImage(result);
    insertSunTime(result);
  } catch (error) {
    console.error(error);
  }
}

function insertTemp(json){
  const curr_temp = document.querySelector('#temp');
  curr_temp.textContent = `${json.data.current_condition[0].temp_F}°F`;
}

function insertFeelsLike(json){
  const feel_like = document.querySelector('#feels-info');
  feel_like.textContent = `${json.data.current_condition[0].FeelsLikeF}°F`;
}

function insertWindSpeed(json){
  const wind_speed = document.querySelector('#speed-info');
  const wind_direction = document.querySelector('#speed-dir');

  wind_speed.textContent = `${json.data.current_condition[0].windspeedMiles} mph`;
  wind_direction.textContent = `${json.data.current_condition[0].winddir16Point}`;
}

function insertPrecip(json){
  const precipitation = document.querySelector('#precip-info');
  precipitation.textContent = `${json.data.current_condition[0].precipMM} mm`;
}

function insertHumidity(json){
  const humidity = document.querySelector('#humid-info');
  humidity.textContent = `${json.data.current_condition[0].humidity}%`
}

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

function insertImage(json){
  const weather_img = document.querySelector('#image');
  const designation = json.data.current_condition[0].weatherDesc[0].value
  if(designation === "Overcast" || designation === "Cloudy"){
    weather_img.src = "/assets/cloudy.png";
  }
  else if(designation == "Clear"){
    weather_img.src = "/assets/moon.png";
  }
  else if(designation == "Sunny"){
    weather_img.src = "/assets/sunny.png";
  }
  else if(designation == "Mist"){
    weather_img.src = "/assets/mist.png";
  }
}

function insertSunTime(json){
  const sunrise = document.querySelector('#sunrise-info');
  const sunset = document.querySelector('#sunset-info');

  sunrise.textContent = json.data.weather[0].astronomy[0].sunrise;
  sunset.textContent = json.data.weather[0].astronomy[0].sunset;
}