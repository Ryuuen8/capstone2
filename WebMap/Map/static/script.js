var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2
});

var bounds = [
    [0, 0],
    [1000, 1000]
];
map.fitBounds(bounds);
L.imageOverlay(
  '/static/hallways.svg',
    bounds
).addTo(map);

var videoUrl = "C:/Users/sabri/Downloads/evernight-everknight.gif"
L.videoOverlay(videoUrl, bounds).addTo(map);

var coordControl = L.control({
    position: 'bottomleft'
});

coordControl.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'coords-display');
    this._div.style.background = 'white';
    this._div.style.padding = '5px';
    return this._div;
};

coordControl.addTo(map);

map.on('mousemove', function (e) {
    coordControl._div.innerHTML = "Lat: " + e.latlng.lat.toFixed(4) + " | Lng: " + e.latlng.lng.toFixed(4);
});

var path = JSON.parse(document.getElementById("path-data").textContent);

console.log("PATH:", path);

L.polyline.antPath(path, {
    color: "#00E5FF",
    weight: 12,
    opacity: 0.2,
    delay: 1200
}).addTo(map);

L.polyline.antPath(path, {
    color: "#00E5FF",
    weight: 5,
    opacity: 1,
    delay: 800,
    pulseColor: "#FFFFFF"
}).addTo(map);

console.log("PATH:", path);
console.log("PATH LENGTH:", path.length);