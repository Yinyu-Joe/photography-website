// One projection for the land dots and the place markers, so a city always lands where its coastline is drawn.
// Miller cylindrical, cut at the Bering Strait so Alaska and Chukotka stay whole, and with Antarctica left out.
export const worldMapFrame = Object.freeze({
  projection: "miller",
  west: -168.5,
  north: 83.7,
  south: -56.5
});

const toRadians = Math.PI / 180;

function millerY(latitude) {
  return 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * latitude * toRadians));
}

const top = millerY(worldMapFrame.north);
const bottom = millerY(worldMapFrame.south);

// Width ÷ height of the map.
export const worldMapAspect = (2 * Math.PI) / (top - bottom);

// Longitude as a share of the map width. Pass wrap: false to keep values outside 0–1 (used when drawing coastlines).
export function worldMapX(longitude, { wrap = true } = {}) {
  const degrees = longitude - worldMapFrame.west;
  return (wrap ? ((degrees % 360) + 360) % 360 : degrees) / 360;
}

// Latitude as a share of the map height, from the top.
export function worldMapY(latitude) {
  return (top - millerY(latitude)) / (top - bottom);
}
