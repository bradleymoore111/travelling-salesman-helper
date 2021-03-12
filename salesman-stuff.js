const points = [];
function addPoint(pos) {
	points.push(pos);
	estimateSalesmanPath();
}

function getPoints() {
	return points;
}

let edges = [];
function getEdges() {
	return edges;
}

function estimateSalesmanPath() {
	// Return a list of edges that are included.
	// Convert points to list of tuples
	const convertedPoints = [];
	for (const p of points) {
		convertedPoints.push([p.x, p.y]);
	}

	const tour = ChristofidesSerdyukovApproximate(convertedPoints);

	console.log("Found tour:", tour);

	edges = [];

	for (let i=0; i<tour.length; i++) {
		const firstPoint = points[tour[i]];
		const secondPoint = points[tour[(i+1) % tour.length]];

		edges.push([firstPoint, secondPoint]);
	}
}


