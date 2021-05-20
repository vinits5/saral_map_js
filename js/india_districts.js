var district_geojson;
var loaded = false;
var districtBounds;

function goToState() {
	// console.log("go to india called");
	map.fitBounds(districtBounds);
}

function zoomToFeatureDistrict(e) {
	map.fitBounds(e.target.getBounds());
}

function resetHighlightDistrict(e) {
	district_geojson.resetStyle(e.target);
	info.update();
}

function highlightFeatureDistrict(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 2,
		color: '#0000ff',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}

	info.update(layer.feature.properties);
}

function onEachFeatureDistrict(feature, layer) {
	layer.on({
		mouseover: highlightFeatureDistrict,
		mouseout: resetHighlightDistrict,
		click: zoomToFeatureDistrict,
	});
}

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
			return { weight: 2, color: "#0000ff" };
		},
		onEachFeature: onEachFeatureDistrict
	}).addTo(map);
}