import Content from "./content.js";
import Entity from "./entity.js";
import GameData from "./game-data.js";
import Input from "./input.js";
import Vector from "./vector.js";

export default class GameState {
	canvas;
	content;
	context;
	entities;
	gameData;
	input;
	playing;
	previousTime;
	world;

	/**
	 * @param {HTMLCanvasElement} canvas
	 * @param {CanvasRenderingContext2D} context
	 * @param {GameData} gameData
	 */
	constructor(canvas, context, gameData) {
		this.canvas = canvas;
		this.content = new Content();
		this.context = context;
		this.entities = [];
		this.gameData = gameData;
		this.input = new Input(this.canvas);
		this.playing = false;
		this.previousTime = performance.now();
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
		this.entities.splice(this.entities.findIndex(e => e.layer > entity.layer), 0, entity);
	}
}
