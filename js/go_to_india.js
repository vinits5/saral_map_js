function goToIndia() {
    // console.log("go to india called");
    map.setView([20, 80], 4);
    map.removeLayer(district_geojson);
    // map.removeLayer(village_geojson);
    taluka_loaded = false;
    stateSelected = false;
    map.removeLayer(taluka_geojson);
}