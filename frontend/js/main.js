// Constantes
const WORLD = [[-90, -180], [90, 180]];
const MOON_TILES =
  "https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{z}/{y}/{x}.jpg";

// Elementos de la página
const home = document.getElementById("home");
const mapDiv = document.getElementById("map");

// Mapa
const map = L.map("map", {
  crs: L.CRS.EPSG4326,
  minZoom: 1,
  maxZoom: 7,
  zoomSnap: 0.5
});

L.tileLayer(MOON_TILES, { noWrap: true, maxNativeZoom: 5, bounds: WORLD }).addTo(map);

map.setView([0, 0], 1);

// Pines 
fetch("api/machines?world=moon")
  .then((response) => response.json())
  .then((machines) => {
    machines.forEach((machine) => {
      L.marker([machine.lat, machine.lng]).addTo(map).bindPopup(machine.name.es);
    });
  });

// Botones de la portada
document.querySelectorAll("[data-world]").forEach((button) => {
  button.addEventListener("click", () => {
    home.classList.add("hidden");
    mapDiv.classList.remove("hidden");
    map.invalidateSize();
    const zoom = map.getBoundsZoom(WORLD, true);
    map.setView([0, 0], zoom);
    map.setMinZoom(zoom);
  });
});