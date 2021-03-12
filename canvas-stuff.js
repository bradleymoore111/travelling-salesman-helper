"use strict";

function XY(a, b) {
	return {x: a, y: b};
}

const canvas = document.getElementById("canvas");
const file = document.getElementById("file");
const span = document.getElementById("pasted-image");
let width, height;
function resize() {
	width  = 0.8 * window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	canvas.width = width;
	height = 0.8 * window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
	canvas.height = height;
}
window.addEventListener("resize", resize);

const ctx = canvas.getContext("2d");

const background = new Image();
let h = false;
function hasBackground() {
	return h;
}

function maybeDrawBackground() {
	if (hasBackground()) {
		// Compare aspect ratio of canvas to image.
		const canvasRatio = width / height;
		const imageRatio = background.width / background.height;

		// If imageRatio < canvasRatio, width dominates
		// Else, height dominates

		if (imageRatio > canvasRatio) {
			// width dominates, update height accordingly
			const scaledWidth = width;
			const scaledHeight = width / background.width * background.height;
			ctx.drawImage(background, 0, (height - scaledHeight) / 2, scaledWidth, scaledHeight);
		} else {
			// height dominates, update width
			const scaledWidth = height / background.height * background.width;
			const scaledHeight = height;
			ctx.drawImage(background, (width - scaledWidth) / 2, 0, scaledWidth, scaledHeight);
		}
	}
}

function getCursorPosition(event) {
	const rect = canvas.getBoundingClientRect();
	const x = Math.round(event.clientX - rect.left);
	const y = Math.round(event.clientY - rect.top);
	if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
		return null;
	}

	return XY(x, y);
}

let dragging = false;
let position = null;
function mouseDown(event) {
	if (dragging)
		return;
	dragging = true;
	document.addEventListener("mousemove", mouseMove, false);
	document.addEventListener("mouseup", mouseUp, false);
	position = getCursorPosition(event);
}
canvas.addEventListener("mousedown", mouseDown, false);

function mouseMove(event) {
	if (!dragging)
		return;
	position = getCursorPosition(event);
}

function mouseUp(event) {
	if (dragging) {
		document.removeEventListener("mousemove", mouseMove, false);
		document.removeEventListener("mouseup", mouseUp, false);
		dragging = false;
		addPoint(position);
	}
}

function fillPoint(point) {
	ctx.beginPath();
	ctx.arc(point.x, point.y, 5, 0, 2*Math.PI);
	ctx.strokeStyle = "red";
	ctx.stroke();
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}

function fillEdge(edge) {
	ctx.beginPath();
	ctx.moveTo(edge[0].x, edge[0].y);
	ctx.lineTo(edge[1].x, edge[1].y);
	ctx.stroke();
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, width, height);

	maybeDrawBackground();

	if (dragging && position) {
		fillPoint(position);
	}

	getPoints().forEach(p => fillPoint(p));

	getEdges().forEach(e => fillEdge(e));
}

/**
 * Provides requestAnimationFrame in a cross browser way.
 *
 * Ty google
 */
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
				 window.webkitRequestAnimationFrame ||
				 window.mozRequestAnimationFrame ||
				 window.oRequestAnimationFrame ||
				 window.msRequestAnimationFrame ||
				 function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
					 return window.setTimeout(callback, 1000/60);
				 };
})();

function frame() {
	draw();
	window.requestAnimFrame(frame, canvas);
}
