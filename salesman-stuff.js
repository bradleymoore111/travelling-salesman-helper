const points = [];
function addPoint(pos) {
	points.push(pos);
	estimateSalesmanPath(document.getElementById("select-solver").value);
}

function getPoints() {
	return points;
}

let edges = [];
function getEdges() {
	return edges;
}

function estimateSalesmanPath(method) {
	// Return a list of edges that are included.
	// Convert points to list of tuples
	const convertedPoints = [];
	for (const p of points) {
		convertedPoints.push([p.x, p.y]);
	}

	let tour;

	if (method == "auto") {
		if (points.length < 20) {
			method = "dynamic";
		} else {
			method = "christofides-serdyukov";
		}
	}

	if (method == "christofides-serdyukov") {
		console.log("CS");
		tour = ChristofidesSerdyukovApproximate(convertedPoints);
	} else {
		console.log("DS");
		tour = DynamicExactTSPSolver(convertedPoints);
	}

	console.log("Found tour:", tour);

	edges = [];

	for (let i=0; i<tour.length; i++) {
		const firstPoint = points[tour[i]];
		const secondPoint = points[tour[(i+1) % tour.length]];

		edges.push([firstPoint, secondPoint]);
	}
}


