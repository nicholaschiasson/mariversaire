import GameState from "./game-state.js";
import Player from "./player.js";
import ScoreDisplay from "./score-display.js";
import PlatformSpawner from "./platform-spawner.js";
import TextButton from "./text-button.js";
import Vector from "./vector.js";
import Fill from "./fill.js";
import Background from "./background.js";
import Checkbox from "./checkbox.js";
import Label from "./label.js";
import Entity from "./entity.js";
import Score from "./score.js";

let player;
let background;

/**
 * @param {GameState} gameState
 */
export function initialize(gameState) {
	background = new Background(gameState);
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
	// gameState.context.clearRect(0, 0, gameState.canvas.width, gameState.canvas.height);
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
	gameState.addEntity(background);
	const buttonWidth = gameState.canvas.width / 3;
	const buttonHeight = buttonWidth / 2;
	const buttonBuffer = buttonHeight / 3;
	const optionsButton = new TextButton(
		gameState,
		new Vector(gameState.canvas.width / 2 - buttonWidth / 2, gameState.canvas.height - buttonHeight - buttonBuffer),
		new Vector(buttonWidth, buttonHeight),
		"Options"
	);
	optionsButton.onEnter = buttonOnEnter;
	optionsButton.onLeave = buttonOnLeave;
	optionsButton.onPress = buttonOnPress;
	optionsButton.onRelease = function(gameState) {
		gameState.entities = [];
		optionsButtonOnRelease.bind(optionsButton)(gameState, initializeStartMenu);
	};
	gameState.addEntity(optionsButton);
	const playButton = new TextButton(
		gameState,
		new Vector(gameState.canvas.width / 2 - buttonWidth / 2, optionsButton.position.y - buttonHeight - buttonBuffer),
		new Vector(buttonWidth, buttonHeight),
		"Play"
	);
	playButton.onEnter = buttonOnEnter;
	playButton.onLeave = buttonOnLeave;
	playButton.onPress = buttonOnPress;
	playButton.onRelease = playButtonOnRelease;
	gameState.addEntity(playButton);
	const titleIndex = Math.floor(Math.random() * gameState.content.texture().title.length);
	const titleTexture = gameState.content.texture().title[titleIndex];
	const title = new Entity(gameState, new Vector(buttonBuffer / 2, buttonHeight), new Vector(gameState.canvas.width - buttonBuffer));
	title.fixed = true;
	title.layer = Infinity;
	title.texture = titleTexture;
	gameState.addEntity(title);
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
	gameState.entities = [];
	if (gameState.backgroundEntities.length < 1) {
		gameState.addEntity(background);
	}
	const buttonWidth = gameState.canvas.width / 3;
	const buttonHeight = buttonWidth / 2;
	const buttonBuffer = buttonHeight / 3;
	const backButton = new TextButton(
		gameState,
		new Vector(gameState.canvas.width / 2 - buttonWidth / 2, gameState.canvas.height - buttonHeight - buttonBuffer),
		new Vector(buttonWidth, buttonHeight),
		"Back"
	);
	backButton.onEnter = buttonOnEnter;
	backButton.onLeave = buttonOnLeave;
	backButton.onPress = buttonOnPress;
	backButton.onRelease = backButtonOnRelease(backButton, previousStateCallback);
	gameState.addEntity(backButton);
	const soundCheckbox = new Checkbox(
		gameState,
		new Vector(gameState.canvas.width / 2 - buttonWidth, gameState.canvas.height / 2 - buttonHeight),
		new Vector(buttonWidth * 2, buttonHeight),
		"Sounds",
		gameState.sound.enabled
	);
	soundCheckbox.onEnter = buttonOnEnter;
	soundCheckbox.onLeave = buttonOnLeave;
	soundCheckbox.onPress = buttonOnPress;
	soundCheckbox.onRelease = function(gameState) {
		buttonOnRelease.bind(this)(gameState);
		gameState.sound.enabled = soundCheckbox.checked;
	};
	gameState.addEntity(soundCheckbox);
	const musicCheckbox = new Checkbox(
		gameState,
		new Vector(gameState.canvas.width / 2 - buttonWidth, soundCheckbox.position.y + buttonHeight + buttonBuffer),
		new Vector(buttonWidth * 2, buttonHeight),
		"Music",
		gameState.music.enabled
	);
	musicCheckbox.onEnter = buttonOnEnter;
	musicCheckbox.onLeave = buttonOnLeave;
	musicCheckbox.onPress = buttonOnPress;
	musicCheckbox.onRelease = function(gameState) {
		buttonOnRelease.bind(this)(gameState);
		gameState.music.enabled = musicCheckbox.checked;
	};
	gameState.addEntity(musicCheckbox);
	const titleLabel = new Label(
		gameState,
		new Vector(gameState.canvas.width / 2 - buttonWidth * 1.25, buttonHeight),
		new Vector(buttonWidth * 2.5, buttonHeight * 2),
		"Options"
	);
	gameState.addEntity(titleLabel);
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
	gameState.score.score = 0;
	gameState.backgroundEntities = [];
	gameState.entities = [];
	gameState.addEntity(background);
	player = new Player(gameState);
	player.layer = 3;
	player.onGameOver = initializeGameOver;
	gameState.addEntity(player);
	gameState.addEntity(new PlatformSpawner(gameState, player));
	const score = new ScoreDisplay(gameState);
	score.layer = 3;
	gameState.addEntity(score);
	if (!gameState.music.playing) {
		const track = gameState.music.current ? -1 : 0;
		gameState.music.play(gameState.content.music(track));
	}
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
	while (!gameState.score.player || !/^[A-Z]{3}$/.test(gameState.score.player)) {
		gameState.score.player = prompt("Please enter your initials (must be three letters).").substring(0, 3).toUpperCase();
	}
	const scoreIndex = gameState.gameData.leaderBoard.findIndex(s => gameState.score.score >= s.score);
	const newScore = new Score(gameState.score.player, Math.floor(gameState.score.score));
	if (scoreIndex < 0) {
		gameState.gameData.leaderBoard.push(newScore);
	} else {
		gameState.gameData.leaderBoard.splice(scoreIndex, 0, newScore);
	}
	gameState.gameData.leaderBoard.splice(100);
	gameState.gameData.save();
	gameState.playing = false;
	gameState.backgroundEntities = gameState.backgroundEntities.length ? gameState.backgroundEntities : gameState.entities;
	gameState.entities = [];
	player = undefined;
	if (!gameState.backgroundEntities.find(entity => entity instanceof Fill)) {
		const dimFill = new Fill(gameState, "#00000088");
		dimFill.layer = 5;
		gameState.backgroundEntities.push(dimFill);
	}
	const buttonWidth = gameState.canvas.width / 3;
	const buttonHeight = buttonWidth / 2;
	const buttonBuffer = buttonHeight / 3;
	const optionsButton = new TextButton(
		gameState,
		new Vector(gameState.canvas.width / 2 - buttonWidth / 2, gameState.canvas.height - buttonHeight - buttonBuffer),
		new Vector(buttonWidth, buttonHeight),
		"Options"
	);
	optionsButton.onEnter = buttonOnEnter;
	optionsButton.onLeave = buttonOnLeave;
	optionsButton.onPress = buttonOnPress;
	optionsButton.onRelease = function(gameState) { optionsButtonOnRelease.bind(optionsButton)(gameState, initializeGameOver); };
	gameState.addEntity(optionsButton);
	const playButton = new TextButton(
		gameState,
		new Vector(gameState.canvas.width / 2 - buttonWidth / 2, optionsButton.position.y - buttonHeight - buttonBuffer),
		new Vector(buttonWidth, buttonHeight),
		"Again?"
	);
	playButton.onEnter = buttonOnEnter;
	playButton.onLeave = buttonOnLeave;
	playButton.onPress = buttonOnPress;
	playButton.onRelease = playButtonOnRelease;
	gameState.addEntity(playButton);
	const titleLabel = new Label(
		gameState,
		new Vector(gameState.canvas.width / 2 - buttonWidth * 1.375, buttonHeight),
		new Vector(buttonWidth * 2.75, buttonHeight * 2),
		"High Scores"
	);
	gameState.addEntity(titleLabel);
	gameState.gameData.leaderBoard.slice(0, 7).forEach((s, i) => {
		const rank = new Label(
			gameState,
			new Vector(buttonBuffer, buttonHeight * 2.5 + buttonHeight / 2 * i + buttonBuffer),
			new Vector(gameState.canvas.width - buttonBuffer * 2, buttonHeight / 2),
			`#${i + 1}`
		);
		rank.textAlign = "left";
		gameState.addEntity(rank);
		const player = new Label(
			gameState,
			new Vector(buttonBuffer, buttonHeight * 2.5 + buttonHeight / 2 * i + buttonBuffer),
			new Vector(gameState.canvas.width - buttonBuffer * 2, buttonHeight / 2),
			s.player
		);
		gameState.addEntity(player);
		const score = new Label(
			gameState,
			new Vector(buttonBuffer, buttonHeight * 2.5 + buttonHeight / 2 * i + buttonBuffer),
			new Vector(gameState.canvas.width - buttonBuffer * 2, buttonHeight / 2),
			s.score
		);
		score.textAlign = "right";
		gameState.addEntity(score);
	});
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
