var machineLocations = [
    { "name": "Shri Sai Hygiene", "place": "Madurai", "lat": 9.9252, "lon": 78.1198, "State": "Tamil Nadu" },
    { "name": "Desai Foundation", "place": "Valsad", "lat": 20.5992, "lon": 72.9342, "State": "Gujarat" },
    { "name": "Piriprote Lab", "place": "Talaja", "lat": 21.3514, "lon": 72.0327, "State": "Gujarat" },
    { "name": "Rajeshthani Mahila Mandal", "place": "Worli", "lat": 18.9986, "lon": 72.8174, "State": "Maharashtra" },
    { "name": "Sakhi Foundation", "place": "Visnagar", "lat": 21.3514, "lon": 72.0327, "State": "Gujarat" },
    { "name": "Suman Industries", "place": "Latur", "lat": 18.4088, "lon": 76.5604, "State": "Maharashtra" },
    { "name": "Kalashree Healthcare", "place": "Bhor", "lat": 18.1458, "lon": 73.8430, "State": "Maharashtra" },
    { "name": "HEALING FIELDS", "place": "Buxar", "lat": 25.5647, "lon": 83.9777, "State": "Bihar" },
    { "name": "Feminy Srilatha", "place": "Chitoor", "lat": 13.2172, "lon": 79.1003, "State": "Andhra Pradesh" },
    { "name": "J.C.B", "place": "Kamrup", "lat": 26.3161, "lon": 91.5984, "State": "Assam" },
    { "name": "SPYM", "place": "Palwal", "lat": 28.1473, "lon": 77.3260, "State": "Haryana" },
    { "name": "Stylish Lady", "place": "Kurukshetra", "lat": 29.9695, "lon": 76.8783, "State": "Haryana" },
    { "name": "CED Society", "place": "Dehradun", "lat": 30.3791, "lon": 78.1051, "State": "Uttaranchal" },
    { "name": "Chechay Sanitary Pads", "place": "Timphu", "lat": 27.4712, "lon": 89.6339, "State": "Bhutan" },
    { "name": "Christian", "place": "Kigali", "lat": 1.9441, "lon": 30.0619, "State": "Rwanda" },
    { "name": "Anandwan", "place": "Chandrapur", "lat": 19.9615, "lon": 79.2961, "State": "Maharashtra" },
    { "name": "Gram Vikas Trust", "place": "Baruch", "lat": 21.7051, "lon": 72.9959, "State": "Gujarat" },
    { "name": "JS Emphasis", "place": "Ludhiana", "lat": 30.9010, "lon": 75.8573, "State": "Punjab" },
    { "name": "Agricultural Development Trust", "place": "Baramati", "lat": 18.1792, "lon": 74.6078, "State": "Maharashtra" },
    { "name": "Commissioner", "place": "Dungarpur", "lat": 23.8417, "lon": 73.7147, "State": "Rajasthan" },
    { "name": "Siiveri Padmavati", "place": "Karimnagar", "lat": 18.4386, "lon": 79.1288, "State": "Andhra Pradesh" },
    { "name": "Shubhamkaroti Foundation", "place": "Nanded", "lat": 19.1383, "lon": 77.3210, "State": "Maharashtra" },
    { "name": "Walson Industries", "place": "Nashik", "lat": 19.9975, "lon": 73.7898, "State": "Maharashtra" },
    { "name": "Kudos Hygeine Products", "place": "Chitradurga", "lat": 14.2251, "lon": 76.3980, "State": "Karnataka" },
    { "name": "Feel Free Sanitary Napkins", "place": "Bangalore", "lat": 12.9716, "lon": 77.5946, "State": "Karnataka" },
    { "name": "VCare Essentials", "place": "Kalanaur", "lat": 28.8312, "lon": 76.3956, "State": "Haryana" },
    { "name": "Ujjawal Rajeevika Mahila Sarwangeen Vikas Cooperative Societies", "place": "Jaipur", "lat": 26.9124, "lon": 75.7873, "State": "Rajasthan" },
    { "name": "JAIRINADHS ENTERPRISES", "place": "Parvada", "lat": 17.6217, "lon": 83.0818, "State": "Andhra Pradesh" },
    { "name": "Gia Industries", "place": "Tivim", "lat": 15.6181, "lon": 73.8438, "State": "Goa" },
    { "name": "Glee Napkin", "place": "Faridabad", "lat": 28.4089, "lon": 77.3178, "State": "Haryana" },
    { "name": "Prema Endeavors Pvt Ltd", "place": "New Delhi", "lat": 28.6139, "lon": 77.2090, "State": "Delhi" },
    { "name": "Caphealthy Pharma Pvt Ltd", "place": "Sanquelim", "lat": 15.5583, "lon": 74.0124, "State": "Goa" },
    { "name": "ARKA INITIATIVE", "place": "Colombo", "lat": 6.9271, "lon": 79.8612, "State": "Sri Lanka" },
    { "name": "Action India", "place": "Hapur", "lat": 26.4184, "lon": 83.3188, "State": "Uttar Pradesh" },
    { "name": "KSCF", "place": "Virat Nagar", "lat": 27.4310, "lon": 76.1900, "State": "Rajasthan" },
    { "name": "PRIDE ODHISA", "place": "Kurda", "lat": 20.1863, "lon": 85.6223, "State": "Orissa" },
]

var markers = [];
var machineDisplayState = false;
var functionCallCount = 0

function showStateMachines(){
    for(let i=0; i<machineLocations.length; i++){
        if(machineLocations[i].State == stateSelectedName){
            markers[i].addTo(map);
        }
    }
}

function showAllMachines(){
    for(let i=0; i<machineLocations.length; i++){
        markers[i].addTo(map);
    }
}

function showMachines(){
    if(functionCallCount == 0){
        for (let i = 0; i < machineLocations.length; i++) {
            marker = new L.marker([machineLocations[i].lat, machineLocations[i].lon]);
            markers.push(marker);
            marker.bindPopup(machineLocations[i].name + ", " + machineLocations[i].place);
        }
    }
    if(!machineDisplayState){
        console.log('stateSelected', stateSelected)
        if(stateSelected){
            showStateMachines();
        }
        else{
            showAllMachines();
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