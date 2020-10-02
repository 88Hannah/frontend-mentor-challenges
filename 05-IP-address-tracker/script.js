const form = document.querySelector('form');
const ipInput = document.querySelector('[name="ip-input"]');
const addressResult = document.querySelector('.address-result');
const locationResult = document.querySelector('.location-result');
const timezoneResult = document.querySelector('.timezone-result');
const ispResult = document.querySelector('.isp-result');


let currentIP = "";
let newData = ""

let success;
let mymap;



form.addEventListener('submit', event => {
    event.preventDefault();
    getNewIP();
});


const getNewIP = () => {
    currentIP = ipInput.value;
    retrieveIPInfo(currentIP);
};




const retrieveIPInfo = async ip => {

    const ipGeoKey = 'at_l1HbDiuaHTtAwMOUn8HdBLK5a202Z';
    const ipAddress = ip;

    await fetch(`https://geo.ipify.org/api/v1?apiKey=${ipGeoKey}&ipAddress=${ipAddress}`)
        .then(response => response.json())
        .then(data => {
            newData = data;
            success = true;
            console.log(newData);
        })
        .catch(error => {
            success = false;
            console.log(error);
        });

        if(!success) {
            alert("it didn't work");
        } else if (newData.code === 422){
            alert("Wrong IP address");
        };

        populateFields(newData);

};



const populateFields = data => {
    addressResult.innerHTML = data.ip;
    locationResult.innerHTML = `${data.location.city}, ${data.location.region}`;
    timezoneResult.innerHTML = `UTC ${data.location.timezone}`;
    ispResult.innerHTML = data.isp;

    displayMap(data.location);

};



const displayMap = (location) => {
    if(mymap){
        mymap.remove();
    };
    const lat = location.lat;
    const long = location.lng;
    mymap = L.map('mapid').setView([lat, long], 11);
    var marker = L.marker([lat, long]).addTo(mymap);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGFubmFoODgiLCJhIjoiY2tmc2p1NWF2MDdzMjJxdDh5cHBkcWkydyJ9.vbXECHYRthHA6OxzOcLL9A'
}).addTo(mymap);
}



// On first load
const init = (async () => {
    await retrieveIPInfo("");
})();






