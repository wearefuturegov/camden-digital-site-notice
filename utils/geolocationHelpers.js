// Calculates the Haversine distance between two points
// Expects to receive two points in format { latitude: xxx, longitude: xxx }
function distanceInMiles(point1, point2) {
      var R = 3958.8; // Radius of the Earth in miles
      var rlat1 = point1.latitude * (Math.PI/180); // Convert degrees to radians
      var rlat2 = point2.latitude * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (point2.longitude-point1.longitude) * (Math.PI/180); // Radian difference (longitudes)

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d;
    }

export default distanceInMiles;
