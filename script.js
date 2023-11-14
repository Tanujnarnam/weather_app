
const p = document.querySelector("#test");

function position_success(position){
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  getLocation(lat,long);
}

function position_error(){
  p.innerHTML = "Sorry could not return location";
}

if(!navigator.geolocation) {
  p.innerHTML = "Geolocation not supported";
}
else{
  navigator.geolocation.getCurrentPosition(position_success, position_error);
}

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

function printLocation(json){
  p.innerHTML = `${json.results[0].locality}, ${json.results[0].region}`
}