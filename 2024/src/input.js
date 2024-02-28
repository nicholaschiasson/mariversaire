import GameState from "./game-state.js";
import Vector from "./vector.js";

export default class Input {
	mouse;

	/**
	 * @param {HTMLCanvasElement} canvas 
	 */
	constructor(canvas) {
		this.mouse = new MouseInput(canvas);
	}

	/**
	 * @param {GameState} gameState
	 * @param {number} deltaTime
	 */
	update(gameState, deltaTime) {
		this.mouse.update(gameState, deltaTime);
	}
}

export class MouseInput {
	buttons;
	movement;
	position;

	/**
	 * @param {HTMLCanvasElement} canvas 
	 */
	constructor(canvas) {
		this.buttons = Array(5).fill().map(() => new MouseButton());
		this.movement = new Vector(0, 0);
		this.position = new Vector(0, 0);
		const mouse = this;
		addEventListener("mousedown", function(e) {
			mouse.buttons[e.button].press();
		});
		addEventListener("mouseup", function(e) {
			mouse.buttons[e.button].release();
		});
		addEventListener("mousemove", function(e) {
			mouse.movement.x = e.movementX;
			mouse.movement.y = e.movementY;
			mouse.position.x = e.x - canvas.offsetLeft;
			mouse.position.y = e.y - canvas.offsetTop;
		});
	}

	/**
	 * @param {GameState} gameState
	 * @param {number} deltaTime
	 */
	update(gameState, deltaTime) {
		for (const button of this.buttons) {
			button.update(gameState, deltaTime);
		}
		this.movement.x = 0;
		this.movement.y = 0;
	}
}

export class MouseButton {
	#isDown;
	#wasDown;

	constructor() {
		this.#isDown = false;
		this.#wasDown = false;
	}

	press() {
		this.#isDown = true;
	}

	release() {
		this.#isDown = false;
	}

	get down() {
		return this.#wasDown && this.#isDown;
	}

	get up() {
		return !this.#wasDown && !this.#isDown;
	}

	get pressed() {
		return !this.#wasDown && this.#isDown;
	}

	get released() {
		return this.#wasDown && !this.#isDown;
	}

	/**
	 * @param {GameState} gameState
	 * @param {number} deltaTime
	 */
	update(gameState, deltaTime) {
		this.#wasDown = this.#isDown;
	}

	static get Left() {
		return 0;
	}

	static get Middle() {
		return 1;
	}

	static get Right() {
		return 2;
	}

	static get BrowserBack() {
		return 3;
	}

	static get BrowserForward() {
		return 4;
	}
}
