function changeMachine() {
    var e = document.getElementById('custom-select');
    var population_limit = (parseInt(e.options[e.selectedIndex].value));
    var e = document.getElementById('population-penetrated');
    var population_penetrated = (parseInt(e.options[e.selectedIndex].value));
    highlightPenetratedTalukas(selected_taluka_layer, population_limit, population_penetrated);
}