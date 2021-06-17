var taluka_geojson;
var district_chosen;
var taluka_loaded = false;
var highlighted_layers = [];

function findLatLong(layer){
    let latLongArray = layer.feature.geometry.coordinates[0];
    latLong = [0, 0];
    for(let i=0; i<latLongArray.length; i++){
        latLong[0] += latLongArray[i][0];
        latLong[1] += latLongArray[i][1];
    }
    latLong[0] = latLong[0]/latLongArray.length;
    latLong[1] = latLong[1]/latLongArray.length;
    return latLong
}

function highlightPenetratedTalukas(e) {
    var layer = e.target;
    population = layer.feature.properties.POPULATION;

    layer.setStyle({
        weight: 2,
        color: '#ffffff',
        dashArray: '',
        fillOpacity: 0.7
    });
    target_latlng = findLatLong(layer);

    taluka_layers = taluka_geojson.getLayers();
    taluka_layers_dist = [];

    for(var i=0; i<taluka_layers.length; i++){
        taluka_layers_latlng = findLatLong(taluka_layers[i]);
        temp = Math.pow(taluka_layers_latlng[0] - target_latlng[0], 2) + 
        Math.pow(taluka_layers_latlng[1] - target_latlng[1], 2);
        taluka_layers_dist.push([i, Math.sqrt(temp), taluka_layers[i].feature.properties.NAME_3]);
    }
    
    taluka_layers_dist.sort(function (a, b){return a[1] - b[1]});
    // taluka_layers_dist = taluka_layers_dist.map(function (a) {return a[0]});
    
    var highlight_layer_ids = [];
    var total_population = 0;

    for(let i=0; i<taluka_layers_dist.length; i++){
        total_population += taluka_layers[taluka_layers_dist[i][0]].feature.properties.POPULATION;
        if(total_population > 20000){
            break;
        }
        else{
            highlight_layer_ids.push(taluka_layers_dist[i][0]);
        }
    }

    highlighted_layers = [];
    for(let i=0; i<highlight_layer_ids.length; i++){
        highlighted_layers.push(taluka_layers[highlight_layer_ids[i]]);

        if (i == 0){
            taluka_layers[highlight_layer_ids[i]].setStyle({
                weight: 2,
                color: '#0f0f0f',
                dashArray: '',
                fillOpacity: 0.7
            });
        }
        else{
            taluka_layers[highlight_layer_ids[i]].setStyle({
                weight: 2,
                color: '#ffffff',
                dashArray: '',
                fillOpacity: 0.7
            });
        }
    }
    
}

function zoomToFeatureTaluka(e) {
    // map.fitBounds(e.target.getBounds());

    for(let i=0; i<highlighted_layers.length; i++){
        taluka_geojson.resetStyle(highlighted_layers[i]);
    }

    highlightPenetratedTalukas(e);
}

function resetHighlightTaluka(e) {
    var reset = 0;
    for(let i = 0; i<highlighted_layers.length; i++){
        if(e.target == highlighted_layers[i]){
            reset = 1;
        }
    }
    if(reset == 0){taluka_geojson.resetStyle(e.target);}
    info.update();
}

function highlightFeatureTaluka(e) {
    var layer = e.target;

    var reset = 0;
    for (let i = 0; i < highlighted_layers.length; i++) {
        if (layer == highlighted_layers[i]) {
            reset = 1;
        }
    }

    if(reset == 0){
        layer.setStyle({
            weight: 2,
            color: '#ffff00',
            dashArray: '',
            fillOpacity: 0.7
        });
    }

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