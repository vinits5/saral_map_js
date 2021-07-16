var machineLocations = [
    { "name": "Shri Sai Hygiene", "place": "Madurai", "lat": 9.9252, "lon": 78.1198, "State": "Tamil Nadu" },
    { "name": "Desai Foundation", "place": "Valsad", "lat": 20.5992, "lon": 72.9342, "State": "Gujrat" },
    { "name": "Piriprote Lab", "place": "Talaja", "lat": 21.3514, "lon": 72.0327, "State": "Gujrat" },
    { "name": "Rajeshthani Mahila Mandal", "place": "Worli", "lat": 18.9986, "lon": 72.8174, "State": "Maharashtra" },
    { "name": "Sakhi Foundation", "place": "Visnagar", "lat": 21.3514, "lon": 72.0327, "State": "Gujrat" },
    { "name": "Suman Industries", "place": "Latur", "lat": 18.4088, "lon": 76.5604, "State": "Maharashtra" },
    { "name": "Kalashree Healthcare", "place": "Bhor", "lat": 18.1458, "lon": 73.8430, "State": "Maharashtra" },
    { "name": "HEALING FIELDS", "place": "Buxar", "lat": 25.5647, "lon": 83.9777, "State": "Bihar" },
    { "name": "Feminy Srilatha", "place": "Chitoor", "lat": 13.2172, "lon": 79.1003, "State": "Andhra Pradesh" },
    { "name": "J.C.B", "place": "Kamrup", "lat": 26.3161, "lon": 91.5984, "State": "Assam" },
    { "name": "SPYM", "place": "Palwal", "lat": 28.1473, "lon": 77.3260, "State": "Haryana" },
    { "name": "Stylish Lady", "place": "Kurukshetra", "lat": 29.9695, "lon": 76.8783, "State": "Haryana" },
    { "name": "CED Society", "place": "Dehradun", "lat": 30.3791, "lon": 78.1051, "State": "Uttarakhan" },
    { "name": "Chechay Sanitary Pads", "place": "Timphu", "lat": 27.4712, "lon": 89.6339, "State": "Bhutan" },
    { "name": "Christian", "place": "Kigali", "lat": 1.9441, "lon": 30.0619, "State": "Rwanda" },
    { "name": "Anandwan", "place": "Chandrapur", "lat": 19.9615, "lon": 79.2961, "State": "Maharashtra" },
    { "name": "Gram Vikas Trust", "place": "Baruch", "lat": 21.7051, "lon": 72.9959, "State": "Gujrat" },
    { "name": "JS Emphasis", "place": "Ludhiana", "lat": 30.9010, "lon": 75.8573, "State": "Punjab" },
    { "name": "Agricultural Development Trust", "place": "Baramati", "lat": 18.1792, "lon": 74.6078, "State": "Maharashtra" },
    { "name": "Commissioner", "place": "Dungarpur", "lat": 23.8417, "lon": 73.7147, "State": "Rajasthan" },
    { "name": "Siiveri Padmavati", "place": "Karimnagar", "lat": , "lon": , "State": "Telangana" },
]

var markers = [];
var machineDisplayState = false;
var functionCallCount = 0
function showMachines(){
    if(functionCallCount == 0){
        for (let i = 0; i < machineLocations.length; i++) {
            marker = new L.marker([machineLocations[i].lat, machineLocations[i].lon]);
            markers.push(marker);
            marker.bindPopup(machineLocations[i].place);
        }
    }
    if(!machineDisplayState){
        for(let i=0; i<machineLocations.length; i++){
            markers[i].addTo(map);
        }
        machineDisplayState = true;
    }
    else{
        for (let i = 0; i < machineLocations.length; i++) {
            map.removeLayer(markers[i]);
        }
        machineDisplayState = false;
    }
    functionCallCount = functionCallCount + 1;
}