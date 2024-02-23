import GameState from "./game-state.js";
import Player from "./player.js";
import ScoreDisplay from "./score-display.js";
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
	for (const entity of gameState.backgroundEntities) {
		if (entity.update) {
			entity.update(gameState, deltaTime);
		}
	}
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
	for (const entity of gameState.backgroundEntities) {
		if (entity.draw) {
			entity.draw(gameState);
		}
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
	try {
		document.exitPointerLock();
	} catch (e) {
		console.warn(e);
	}
	gameState.playing = false;
	gameState.backgroundEntities = [];
	gameState.entities = [];
	const playButtonWidth = gameState.canvas.width / 3;
	const playButtonHeight = playButtonWidth / 2;
	const buttonBuffer = playButtonHeight / 3;
	const playButton = new TextButton(
		gameState,
		new Vector(gameState.canvas.width / 2 - playButtonWidth / 2, gameState.canvas.height / 2),
		new Vector(playButtonWidth, playButtonHeight),
		"Play" // 🔇 🔊
	);
	playButton.onEnter = buttonOnEnter;
	playButton.onLeave = buttonOnLeave;
	playButton.onPress = buttonOnPress;
	playButton.onRelease = playButtonOnRelease;
	gameState.addEntity(playButton);
	const optionsButton = new TextButton(
		gameState,
		new Vector(gameState.canvas.width / 2 - playButtonWidth / 2, gameState.canvas.height / 2 + playButtonHeight + buttonBuffer),
		new Vector(playButtonWidth, playButtonHeight),
		"Options" // 🔇 🔊
	);
	optionsButton.onEnter = buttonOnEnter;
	optionsButton.onLeave = buttonOnLeave;
	optionsButton.onPress = buttonOnPress;
	optionsButton.onRelease = function(gameState) { optionsButtonOnRelease.bind(optionsButton)(gameState, initializeStartMenu); };
	gameState.addEntity(optionsButton);
}

/**
 * @param {GameState} gameState
 */
function initializeOptionsMenu(gameState, previousStateCallback) {
	try {
		document.exitPointerLock();
	} catch (e) {
		console.warn(e);
	}
	gameState.playing = false;
	gameState.backgroundEntities = gameState.backgroundEntities || gameState.entities;
	gameState.entities = [];
	const backButtonWidth = gameState.canvas.width / 3;
	const backButtonHeight = backButtonWidth / 2;
	const backButton = new TextButton(
		gameState,
		new Vector(gameState.canvas.width / 2 - backButtonWidth / 2, gameState.canvas.height / 2 + backButtonHeight),
		new Vector(backButtonWidth, backButtonHeight),
		"Back" // 🔇 🔊
	);
	backButton.onEnter = buttonOnEnter;
	backButton.onLeave = buttonOnLeave;
	backButton.onPress = buttonOnPress;
	backButton.onRelease = backButtonOnRelease(backButton, previousStateCallback);
	gameState.addEntity(backButton);
}

/**
 * @param {GameState} gameState 
 */
function initializeGame(gameState) {
	try {
		gameState.canvas.requestPointerLock();
	} catch (e) {
		console.warn(e);
	}
	gameState.playing = true;
	gameState.score = 0;
	gameState.backgroundEntities = [];
	gameState.entities = [];
	player = new Player(gameState);
	player.layer = 3;
	player.onGameOver = initializeGameOver;
	gameState.addEntity(player);
	gameState.addEntity(new PlatformSpawner(gameState, player));
	const score = new ScoreDisplay(gameState);
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
	gameState.backgroundEntities = gameState.backgroundEntities.length > 0 ? gameState.backgroundEntities : gameState.entities;
	gameState.entities = [];
	player = undefined;
	if (!gameState.backgroundEntities.find(entity => entity instanceof Fill)) {
		const dimFill = new Fill(gameState, "#00000088");
		dimFill.layer = 5;
		gameState.backgroundEntities.push(dimFill);
	}
	const playButtonWidth = gameState.canvas.width / 3;
	const playButtonHeight = playButtonWidth / 2;
	const buttonBuffer = playButtonHeight / 3;
	const playButton = new TextButton(
		gameState,
		new Vector(gameState.canvas.width / 2 - playButtonWidth / 2, gameState.canvas.height / 7 * 5),
		new Vector(playButtonWidth, playButtonHeight),
		"Again?"
	);
	playButton.onEnter = buttonOnEnter;
	playButton.onLeave = buttonOnLeave;
	playButton.onPress = buttonOnPress;
	playButton.onRelease = playButtonOnRelease;
	gameState.addEntity(playButton);
	const optionsButton = new TextButton(
		gameState,
		new Vector(gameState.canvas.width / 2 - playButtonWidth / 2, gameState.canvas.height / 7 * 5 + playButtonHeight + buttonBuffer),
		new Vector(playButtonWidth, playButtonHeight),
		"Options" // 🔇 🔊
	);
	optionsButton.onEnter = buttonOnEnter;
	optionsButton.onLeave = buttonOnLeave;
	optionsButton.onPress = buttonOnPress;
	optionsButton.onRelease = function(gameState) { optionsButtonOnRelease.bind(optionsButton)(gameState, initializeGameOver); };
	gameState.addEntity(optionsButton);
}

/**
 * @param {GameState} gameState
 */
function buttonOnEnter(gameState) {
	if (!this.pressing) {
		this.backgroundColor = "darkgray";
		this.textColor = "white";
	}
}

/**
 * @param {GameState} gameState
 */
function buttonOnLeave(gameState) {
	if (!this.pressing) {
		this.backgroundColor = "white";
		this.textColor = "black";
	}
}

/**
 * @param {GameState} gameState
 */
function buttonOnPress(gameState) {
	this.backgroundColor = "dimgray";
	this.textColor = "darkgray";
}

/**
 * @param {GameState} gameState
 */
function buttonOnRelease(gameState) {
	if (this.over) {
		this.backgroundColor = "darkgray";
		this.textColor = "white";
	} else {
		this.backgroundColor = "white";
		this.textColor = "black";
	}
}

/**
 * @param {GameState} gameState
 */
function playButtonOnRelease(gameState) {
	buttonOnRelease.bind(this)(gameState);
	if (this.over) {
		initializeGame(gameState);
	}
}

/**
 * @param {GameState} gameState
 */
function optionsButtonOnRelease(gameState, previousStateCallback) {
	buttonOnRelease.bind(this)(gameState);
	if (this.over) {
		initializeOptionsMenu(gameState, previousStateCallback);
	}
}

/**
 * @param {GameState} gameState
 */
function backButtonOnRelease(button, previousStateCallback) {
	return function(gameState) {
		buttonOnRelease.bind(button)(gameState);
		if (this.over) {
			previousStateCallback(gameState);
		}
	}
}
