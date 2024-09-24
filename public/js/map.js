let map = L.map("map").setView(coordinates, 12);

// Using Google Street
let googleStreets = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
googleStreets.addTo(map);

// let map = L.map("map").setView([51.505, -0.09], 13);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: "© OpenStreetMap contributors",
// }).addTo(map);

let myMarker = L.icon({
  iconUrl: "/images/red-map-marker.png",
  iconSize: [45, 45],
  iconAnchor: [25, 40],
});

let marker = L.marker(coordinates, { icon: myMarker }).addTo(map);

let popup = L.popup(coordinates, {
  content: `<h6>${listingLocation}</h6><p>Exact location after booking</p>`,
  offset: [-2, -10],
}).openOn(map);

// geocode();

// function geocode() {
//   let address = listingLocation;
//   let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//     address
//   )}`;

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.length > 0) {
//         let lat = data[0].lat;
//         let lon = data[0].lon;

//         // Set map view and add a marker at the found location
//         map.setView([lat, lon], 13);
//         L.marker([lat, lon])
//           .addTo(map)
//           .bindPopup(data[0].display_name)
//           .openPopup();
//       } else {
//         console.log("Location not found");
//       }
//     })
//     .catch((err) => {
//       console.error("Geocoding error:", err);
//     });
// }
