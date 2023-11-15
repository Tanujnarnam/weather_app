//Selecting the paragraph element with id test
/*const p = document.querySelector("#test");

//Handling the getCurrentPosition function
function position_success(position){
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  //getLocation(lat,long);
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
      printLocation(result);
    } catch (error) {
      console.error(error);
    }
  }
//Function to print results retured by the Reverse Geocoding
function printLocation(json){
  p.textContent += `${json.results[0].locality}, ${json.results[0].region}`
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
    printWeather(result);
  } catch (error) {
    console.error(error);
  }
}

function printWeather(json){
  p.textContent += `${json.data.current_condition[0].temp_F}`
}*/