import Content from "./content.js";
import GameData from "./game-data.js";
import GameState from "./game-state.js";
import { draw, initialize, update } from "./game.js";

const LS_DATA_KEY = `${location.pathname}`;
const UPDATE_DELAY = 1000 / 60; // 60 times per second

addEventListener("load", dispatchLoadContent);

/**
 * @param {HTMLCanvasElement} canvas
 */
function resizeGameCanvas(canvas) {
	const canvasComputedStyle = getComputedStyle(canvas);
	canvas.setAttribute("height", canvasComputedStyle.height);
	canvas.setAttribute("width", canvasComputedStyle.width);
}

async function dispatchLoadContent() {
	const content = new Content();
	await content.load();
	dispatchInitialize(content);
}

/**
 * @param {Content} content
 */
function dispatchInitialize(content) {
	const gameCanvas = document.getElementById("game-canvas");
	gameCanvas.setAttribute("assets", "ready");
	const gameContext = gameCanvas.getContext("2d");
	const gameState = new GameState(
		gameCanvas,
		gameContext,
		GameData.load(LS_DATA_KEY) ?? new GameData(LS_DATA_KEY),
		content,
	);

	try {
		screen.orientation.lock("natural").catch((e) => {
			console.warn(e);
		});
	} catch (e) {
		console.warn(e);
	}
	resizeGameCanvas(gameCanvas);
	// NOTE: Interesting, by not registering the resize handler, we have an effect where resizing the
	// whole window/canvas scales the contents of the canvas proportionally. The CSS keeps the canvas
	// aspect ratio in tact, so we don't actually need to recall the resize callback.
	// addEventListener("resize", function() { resizeGameCanvas(gameCanvas); });
	initialize(gameState);
	setTimeout(dispatchUpdate, UPDATE_DELAY, gameState);
	requestAnimationFrame(function () {
		dispatchDraw(gameState);
	});
}

/**
 * @param {GameState} gameState
 */
function dispatchUpdate(gameState) {
	const previousTime = gameState.previousTime;
	gameState.previousTime = performance.now();
	const deltaTime = (gameState.previousTime - previousTime) * 0.001;
	update(gameState, deltaTime);
	for (const entity of gameState.entities) {
		if (entity.position && !entity.fixed) {
			entity.position.x += gameState.world.x;
			entity.position.y += gameState.world.y;
		}
	}
	for (let i = gameState.entities.length - 1; i >= 0; i--) {
		if (!gameState.entities[i].alive) {
			gameState.entities.splice(i, 1);
		}
	}
	gameState.world.x = 0;
	gameState.world.y = 0;
	gameState.input.update(gameState, deltaTime);
	setTimeout(dispatchUpdate, UPDATE_DELAY, gameState);
}

/**
 * @param {GameState} gameState
 */
function dispatchDraw(gameState) {
	draw(gameState);
	requestAnimationFrame(function () {
		dispatchDraw(gameState);
	});
}
