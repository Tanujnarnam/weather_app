
const p = document.querySelector("#test");

function position_success(position){
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  p.innerHTML = `Your position is ${lat},${long}`;
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