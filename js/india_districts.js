var district_geojson;
var loaded = false;

async function openDistrictsMap(stateName) {
	console.log(stateName);
	let url = "./datasets/india/india_district/districts/js/" + stateName + ".js"
	var script = await loadScript(url, callback);
}

var callback = function () {
	showMap(indianDistricts);
	loaded = true;
};

function loadScript(url, callback) {
	// Adding the script tag to the head as suggested before
	var head = document.head;
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	// Then bind the event to the callback function.
	// There are several events for cross browser compatibility.
	script.onreadystatechange = callback;
	script.onload = callback;

	// Fire the loading
	head.appendChild(script);
}

function showMap(indianDistricts) {
	if (loaded == true){map.removeLayer(district_geojson);}
	district_geojson = L.geoJSON(indianDistricts, {
		style: function (feature) {
			return { weight: 1, color: "#ff0000" };
		},
		onEachFeature: onEachFeature
	}).addTo(map);
}