var village_geojson;
var villageLoaded = false;
var district_chosen;

function openVillageMap(stateName, districtName) {
    console.log(districtName);
    console.log(stateName);
    district_chosen = districtName;
    if (stateName == 'Bihar'){
        let url = "./datasets/india/india_villages/js/" + stateName + ".js"
        // loadVillageScript(url, villageCallBack);
    }
}

var villageCallBack = function () {
    // showVillageMap(indianVillages);
    console.log(indianVillages);
    // loaded = true;
};

function loadVillageScript(url, callback) {
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

function showVillageMap(indianDistricts) {
    // if (loaded == true) { map.removeLayer(district_geojson); }
    village_geojson = L.geoJSON(indianDistricts, {
        style: function (feature) {
            return { weight: 2, color: "#0000ff" };
        },
        onEachFeature: onEachFeatureDistrict
    }).addTo(map);
}