const map = L.map("map", {
  crs: L.CRS.EPSG4326,
  minZoom: 1,
  maxZoom: 7,
  zoomSnap: 0.5
});

L.tileLayer(
  "https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
  { noWrap: true, maxNativeZoom: 5 }
).addTo(map);

map.setView([0, 0], 1);