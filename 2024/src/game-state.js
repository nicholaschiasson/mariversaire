import Content from "./content.js";
import Entity from "./entity.js";
import GameData from "./game-data.js";
import Input from "./input.js";
import MusicManager from "./music-manager.js";
import Score from "./score.js";
import SoundManager from "./sound-manager.js";
import Vector from "./vector.js";

export default class GameState {
	backgroundEntities;
	canvas;
	content;
	context;
	entities;
	gameData;
	input;
	music;
	playing;
	previousTime;
	score;
	shoesOn;
	sound;
	world;

	/**
	 * @param {HTMLCanvasElement} canvas
	 * @param {CanvasRenderingContext2D} context
	 * @param {GameData} gameData
	 * @param {Content} content
	 */
	constructor(canvas, context, gameData, content) {
		this.backgroundEntities = [];
		this.canvas = canvas;
		this.content = content;
		this.context = context;
		this.entities = [];
		this.gameData = gameData;
		this.input = new Input(this.canvas);
		this.music = new MusicManager(true);
		this.playing = false;
		this.previousTime = performance.now();
		this.score = new Score(undefined, 0);
		this.shoesOn = false;
		this.sound = new SoundManager(true);
		this.world = new Vector(0, 0);
		canvas.addEventListener("click", () => {
			if (this.playing) {
				try {
					canvas.requestPointerLock();
				} catch (e) {
					console.warn(e);
				}
			}
		});
	}

	/**
	 * @param {Entity} entity
	 */
	addEntity(entity) {
		const index = this.entities.findIndex(e => e.layer > entity.layer);
		if (index < 0) {
			this.entities.push(entity);
		} else {
			this.entities.splice(index, 0, entity);
		}
	}
}
