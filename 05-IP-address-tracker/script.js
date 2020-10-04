const form = document.querySelector('form');
const ipInput = document.querySelector('[name="ip-input"]');
const addressResult = document.querySelector('.address-result');
const locationResult = document.querySelector('.location-result');
const timezoneResult = document.querySelector('.timezone-result');
const ispResult = document.querySelector('.isp-result');

let currentIP = "";
let newData = ""
let mymap;


form.addEventListener('submit', event => {
    event.preventDefault();
    ipSearch();
});


const getNewIP = async () => {
    currentIP = ipInput.value;
    await retrieveIPInfo(currentIP);
    
};


const retrieveIPInfo = async ip => {
    const ipGeoKey = 'at_l1HbDiuaHTtAwMOUn8HdBLK5a202Z';

    await fetch(`https://geo.ipify.org/api/v1?apiKey=${ipGeoKey}&ipAddress=${ip}`)
        .then(response => response.json())
        .then(data => {
            newData = data;
            if(newData.code === 422){
                alert("This is not a valid IP address.");
                ipInput.value = "";
            } else {
                
            };
        })
        .catch(error => {
            alert("There was a problem retrieving the result, please try again.");
            console.log(error);
        });
};


const populateFields = data => {
    addressResult.innerHTML = data.ip;
    locationResult.innerHTML = `${data.location.city}, ${data.location.region}`;
    timezoneResult.innerHTML = `UTC ${data.location.timezone}`;
    ispResult.innerHTML = data.isp;
};


const displayMap = (location) => {
    if(mymap){
        mymap.remove();
    };
    const lat = location.lat;
    const long = location.lng;
    mymap = L.map('mapid', {
        center: [(lat - 0.02), long],
        zoom: 11,
        zoomControl: false
    });
    L.marker([lat, long]).addTo(mymap);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiaGFubmFoODgiLCJhIjoiY2tmc2p1NWF2MDdzMjJxdDh5cHBkcWkydyJ9.vbXECHYRthHA6OxzOcLL9A'
    }).addTo(mymap);
}


const ipSearch = async () => {
    await getNewIP();
    populateFields(newData);
    displayMap(newData.location);
}


// On first load
const init = (() => {
    ipSearch();
})();






