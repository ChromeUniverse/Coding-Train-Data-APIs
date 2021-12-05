const map = L.map('iss-map').setView([0, 0], 1);

const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl, { attribution });

tiles.addTo(map);

let marker = L.marker([0, 0]).addTo(map);

const url = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getISS() {
  const response = await fetch(url);
  const data = await response.json();
  console.log('Here is data', data);
  
  const { latitude, longitude } = data;
  console.log('Latitude:', latitude);
  console.log('Longitude:', longitude);

  document.getElementById("lat").textContent = latitude;
  document.getElementById("lon").textContent = longitude;

  marker.setLatLng([parseFloat(latitude), parseFloat(longitude)]);
}

getISS();

setInterval(getISS, 1000);