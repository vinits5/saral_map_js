var taluka_geojson;
var district_chosen;
var taluka_loaded = false;

function zoomToFeatureTaluka(e) {
    map.fitBounds(e.target.getBounds());
}

function resetHighlightTaluka(e) {
    taluka_geojson.resetStyle(e.target);
    info.update();
}

function highlightFeatureTaluka(e) {
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

function onEachFeatureTaluka(feature, layer) {
    layer.on({
        mouseover: highlightFeatureTaluka,
        mouseout: resetHighlightTaluka,
        click: zoomToFeatureTaluka,
    });
}

function openTalukaMap(stateName, districtName) {
    console.log(districtName);
    district_chosen = districtName;
    let url = "./datasets/india/india_taluka/js/" + stateName + "/" + districtName + ".js"
    loadTalukaScript(url, talukaCallBack);
}

var talukaCallBack = function () {
    // console.log(indianTalukas);
    showTalukaMap(indianTalukas);
    taluka_loaded = true;
};

function loadTalukaScript(url, callback) {
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

function showTalukaMap(indianTalukas) {
    if (taluka_loaded == true) { map.removeLayer(taluka_geojson); }
    taluka_geojson = L.geoJSON(indianTalukas, {
        style: function (feature) {
            return { weight: 2, color: "#ff0000" };
        },
        onEachFeature: onEachFeatureTaluka
    }).addTo(map);
}