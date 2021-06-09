var geojson;

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    let showInfo = '<h4>State Details</h4> Hover over a state<br />';

    if (props && props.NAME_1){
        showInfo = '<h4>State Details</h4>' + 'State: <b>' + props.NAME_1 + '</b><br/>';
        
        if (props.NAME_2){
            showInfo += 'District: <b>' + props.NAME_2 + '</b><br/>'
            if (props.NAME_3) {
                showInfo += 'Taluka: <b>' + props.NAME_3 + '</b><br/>'
            }
        }
    }

    else if(props && props.STATE){
        showInfo = '<h4>State Details</h4>' +
                            'State: <b>' + props.STATE + '</b><br/>' +
                            'District: <b>' + props.DISTRICT + '</b><br/>' + 
                            'Village: <b>' + props.NAME + '</b><br/>'
    }
    this._div.innerHTML = showInfo;
};

info.addTo(map);

function zoomToFeature(e) {
    districtBounds = e.target.getBounds();
    map.fitBounds(e.target.getBounds());
    var layer = e.target;
    openDistrictsMap(layer.feature.properties.NAME_1);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function highlightFeature(e) {
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

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
    });
}

geojson = L.geoJSON(indianStates, {style: function(feature) {
        return {weight: 1, color: "#ff0000"};
        },
        onEachFeature: onEachFeature
    }).addTo(map);

var stateList = [];
for (let feature of indianStates[0].features){
    stateList.push(feature.properties.NAME_1);
}