import Entity from "./entity.js";
import GameState from "./game-state.js";
import { MouseButton } from "./input.js";
import Vector from "./vector.js";

export default class Button extends Entity {
	onEnter;
	onLeave;
	onPress;
	onRelease;
	over;
	pressing;

	/**
	 * @param {GameState} gameState 
	 * @param {Vector} position 
	 * @param {Vector} dimensions 
	 */
	constructor(gameState, position, dimensions) {
		super(gameState, position, dimensions);
		this.over = false;
		this.pressing = false;
	}

	/**
	 * @param {GameState} gameState 
	 * @param {number} deltaTime 
	 */
	update(gameState, deltaTime) {
		const isOverButton = gameState.input.mouse.position.x >= this.position.x
			&& gameState.input.mouse.position.x <= this.position.x + this.dimensions.x
			&& gameState.input.mouse.position.y >= this.position.y
			&& gameState.input.mouse.position.y <= this.position.y + this.dimensions.y;
		if (isOverButton) {
			if (!this.over) {
				if (this.onEnter) {
					this.onEnter(gameState);
				}
			}
			this.over = true;
			if (!this.pressing) {
				if (gameState.input.mouse.buttons[MouseButton.Left].pressed) {
					this.pressing = true;
					if (this.onPress) {
						this.onPress(gameState);
					}
				}
			} else {
				if (gameState.input.mouse.buttons[MouseButton.Left].released) {
					this.pressing = false;
					if (this.onRelease) {
						this.onRelease(gameState);
					}
				}
			}
		} else {
			if (this.over) {
				if (this.onLeave) {
					this.onLeave(gameState);
				}
			}
			this.over = false;
			if (this.pressing) {
				if (gameState.input.mouse.buttons[MouseButton.Left].released) {
					this.pressing = false;
					if (this.onRelease) {
						this.onRelease(gameState);
					}
				}
			}
		}
	}
}
