/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */

function drawStations(tabDrawingInfos) {

    //On vide les carrés si ils en existent actuellement
    if (map.getLayer('points') != undefined) {
        map.removeLayer('points');
        map.removeSource('points');
    }

    //On redessine les nouveaux points
    map.addSource('points', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': tabDrawingInfos
        }
    });

    //On rajoute une layer
    map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
            'icon-image': ['concat', 'square-rgb-', ['get', 'color']],
            'text-field': ['get', 'title'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.85],
            'text-anchor': 'top'
        }
    });
}

mapboxgl.accessToken = 'pk.eyJ1IjoibXlybWlsbGlvbiIsImEiOiJja2F4aTI1Z2gwNmNvMnptYWU1MWppZDZrIn0.2FjbOgsHowyK0fQfFRfDEA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [8.222665776, 46.800663464], // starting position [lng, lat]
    zoom: 6.9 // starting zoom
});

map.on('styleimagemissing', function (e) {
    var id = e.id; // id of the missing image

    // check if this missing icon is one this function can generate
    var prefix = 'square-rgb-';
    if (id.indexOf(prefix) !== 0) return;

    // extract the color from the id
    var rgb = id
        .replace(prefix, '')
        .split(',')
        .map(Number);

    var width = 30; // The image will be 64 pixels square
    var bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
    var data = new Uint8Array(width * width * bytesPerPixel);

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            var offset = (y * width + x) * bytesPerPixel;
            data[offset + 0] = rgb[0]; // red
            data[offset + 1] = rgb[1]; // green
            data[offset + 2] = rgb[2]; // blue
            data[offset + 3] = 255; // alpha
        }
    }

    map.addImage(id, { width: width, height: width, data: data });
});

map.on('load', function () {
    map.addSource('points', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': []
        }
    });

    map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
            'icon-image': ['concat', 'square-rgb-', ['get', 'color']]
        }
    });
});