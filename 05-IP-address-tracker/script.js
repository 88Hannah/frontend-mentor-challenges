const form = document.querySelector('form');
const ipInput = document.querySelector('[name="ip-input"]');
const addressResult = document.querySelector('.address-result');
const locationResult = document.querySelector('.location-result');
const timezoneResult = document.querySelector('.timezone-result');
const ispResult = document.querySelector('.isp-result');


let currentIP = "";




form.addEventListener('submit', event => {
    event.preventDefault();
    getNewIP();
});


const getNewIP = () => {
    currentIP = ipInput.value;
    retrieveIPInfo(currentIP);
};


let newData = ""

let success;

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
};


retrieveIPInfo("");

