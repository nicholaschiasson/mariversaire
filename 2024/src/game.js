import GameState from "./game-state.js";
import Player from "./player.js";
import Score from "./score.js";
import PlatformSpawner from "./platform-spawner.js";
import TextButton from "./text-button.js";
import Vector from "./vector.js";
import Fill from "./fill.js";

let player;

/**
 * @param {GameState} gameState
 */
export function initialize(gameState) {
	initializeStartMenu(gameState);
}

/**
 * @param {GameState} gameState
 * @param {number} deltaTime
 */
export function update(gameState, deltaTime) {
	for (const entity of gameState.entities) {
		if (entity.update) {
			entity.update(gameState, deltaTime);
		}
	}
}

/**
 * @param {GameState} gameState
 */
export function draw(gameState) {
	if (gameState.playing) {
		gameState.context.clearRect(0, 0, gameState.canvas.width, gameState.canvas.height);
	}
	for (const entity of gameState.entities) {
		if (entity.draw) {
			entity.draw(gameState);
		}
	}
}

/**
 * @param {GameState} gameState
 */
function initializeStartMenu(gameState) {
	gameState.playing = false;
	gameState.entities = [];
	const playButtonWidth = gameState.canvas.width / 3;
	const playButtonHeight = playButtonWidth / 2;
	const playButton = new TextButton(
		gameState,
		new Vector(gameState.canvas.width / 2 - playButtonWidth / 2, gameState.canvas.height / 2 + playButtonHeight),
		new Vector(playButtonWidth, playButtonHeight),
		"Play" // 🔇 🔊
	);
	playButton.onEnter = playButtonOnEnter;
	playButton.onLeave = playButtonOnLeave;
	playButton.onPress = playButtonOnPress;
	playButton.onRelease = playButtonOnRelease;
	gameState.addEntity(playButton);
}

/**
 * @param {GameState} gameState 
 */
function initializeGame(gameState) {
	gameState.playing = true;
	gameState.entities = [];
	player = new Player(gameState);
	player.layer = 3;
	player.onGameOver = initializeGameOver;
	gameState.addEntity(player);
	gameState.addEntity(new PlatformSpawner(gameState, player));
	const score = new Score(gameState);
	score.layer = 3;
	gameState.addEntity(score);
}

/**
 * @param {GameState} gameState 
 */
function initializeGameOver(gameState) {
	try {
		document.exitPointerLock();
	} catch (e) {
		console.warn(e);
	}
	gameState.playing = false;
	player = undefined;
	const dimFill = new Fill(gameState, "#00000088");
	dimFill.layer = 5;
	gameState.addEntity(dimFill);
	const playButtonWidth = gameState.canvas.width / 3;
	const playButtonHeight = playButtonWidth / 2;
	const playButton = new TextButton(
		gameState,
		new Vector(gameState.canvas.width / 2 - playButtonWidth / 2, gameState.canvas.height / 7 * 5),
		new Vector(playButtonWidth, playButtonHeight),
		"Play"
	);
	playButton.onEnter = playButtonOnEnter;
	playButton.onLeave = playButtonOnLeave;
	playButton.onPress = playButtonOnPress;
	playButton.onRelease = playButtonOnRelease;
	gameState.addEntity(playButton);
}

/**
 * @param {GameState} gameState
 */
function playButtonOnEnter(gameState) {
	if (!this.pressing) {
		this.backgroundColor = "darkgray";
		this.textColor = "white";
	}
}

/**
 * @param {GameState} gameState
 */
function playButtonOnLeave(gameState) {
	if (!this.pressing) {
		this.backgroundColor = "white";
		this.textColor = "black";
	}
}

/**
 * @param {GameState} gameState
 */
function playButtonOnPress(gameState) {
	this.backgroundColor = "dimgray";
	this.textColor = "darkgray";
}

/**
 * @param {GameState} gameState
 */
function playButtonOnRelease(gameState) {
	if (this.over) {
		this.backgroundColor = "darkgray";
		this.textColor = "white";
		try {
			gameState.canvas.requestPointerLock();
		} catch (e) {
			console.warn(e);
		}
		initializeGame(gameState);
	} else {
		this.backgroundColor = "white";
		this.textColor = "black";
	}
}
