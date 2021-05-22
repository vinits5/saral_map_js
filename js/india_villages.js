var village_geojson;
var villageLoaded = false;
var district_chosen;
var village_loaded = false;

function zoomToFeatureVillage(e) {
    map.fitBounds(e.target.getBounds());
}

function resetHighlightVillage(e) {
    village_geojson.resetStyle(e.target);
    info.update();
}

function highlightFeatureVillage(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#ffff00',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function onEachFeatureVillage(feature, layer) {
    layer.on({
        mouseover: highlightFeatureVillage,
        mouseout: resetHighlightVillage,
        click: zoomToFeatureVillage,
    });
}

function openVillageMap(stateName, districtName) {
    console.log(districtName);
    district_chosen = districtName;
    if (stateName == 'Bihar'){
        let url = "./datasets/india/india_villages/js/" + stateName + "/" + districtName + ".js"
        loadVillageScript(url, villageCallBack);
    }
}

var villageCallBack = function () {
    showVillageMap(indianVillages);
    village_loaded = true;
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

function showVillageMap(indianVillages) {
    if (village_loaded == true) { map.removeLayer(village_geojson); }
    village_geojson = L.geoJSON(indianVillages, {
        style: function (feature) {
            return { weight: 2, color: "#ff0000" };
        },
        onEachFeature: onEachFeatureVillage
    }).addTo(map);
}