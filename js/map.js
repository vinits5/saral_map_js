// initialize the map
var map = L.map('map').setView([20, 80], 4);

// load a tile layer
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 17,
        minZoom: 2
    }).addTo(map);