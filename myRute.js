<script src="https://api.mapbox.com/mapbox-gl-js/v3.9.2/mapbox-gl.js"></script>
let coordinates = [];

map.on('load', () => {
  map.addSource('route', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': coordinates
      }
    }
  });

  map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#888',
      'line-width': 8
    }
  });
});

// Update the route as the user moves
geolocate.on('geolocate', function(e) {
  const lon = e.coords.longitude;
  const lat = e.coords.latitude;
  coordinates.push([lon, lat]);
  map.getSource('route').setData({
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'LineString',
      'coordinates': coordinates
    }
  });
});
let startTime, endTime;

geolocate.on('geolocate', function(e) {
  if (!startTime) {
    startTime = new Date();
  }
  endTime = new Date();
  let travelTime = (endTime - startTime) / 1000; // in seconds
  console.log('Travel time:', travelTime, 'seconds');
});
function calculateDistance(coords) {
    // This is a simplified calculation and won't be as accurate as GPS data
    let distance = 0;
    for (let i = 1; i < coords.length; i++) {
      let dx = coords[i][0] - coords[i-1][0];
      let dy = coords[i][1] - coords[i-1][1];
      distance += Math.sqrt(dx*dx + dy*dy);
    }
    return distance * 111000; // rough conversion to meters
  }
  
  geolocate.on('geolocate', function(e) {
    // ... previous code ...
    let distance = calculateDistance(coordinates);
    let averageSpeed = distance / travelTime; // in meters per second
    console.log('Average speed:', averageSpeed, 'm/s');
  });