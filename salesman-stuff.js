const points = [];
function addPoint(pos) {
  points.push(pos);
}

function getPoints() {
  return points;
}

function estimateSalesmanPath() {
  if (points.length < 5) {
    // brute force
  } else if (points.length < 50) {
    // branch and bound
    // https://en.wikipedia.org/wiki/Branch_and_bound
  }
}
