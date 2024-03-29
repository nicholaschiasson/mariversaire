import Entity from "./entity.js";
import GameState from "./game-state.js";

export default class Label extends Entity {
	#fontSize;

	borderWidth;
	margin;
	text;
	textAlign;

	/**
	 * @param {GameState} gameState 
	 * @param {Vector} position 
	 * @param {Vector} dimensions 
	 * @param {string} text 
	 */
	constructor(gameState, position, dimensions, text) {
		super(gameState, position, dimensions);
		this.borderWidth = 2.5;
		this.margin = 0;
		this.text = text;
		this.textAlign = "center";
		this.#fontSize = 1;
		let textMetrics;
		do {
			this.#fontSize++;
			gameState.context.font = this.#font;
			textMetrics = gameState.context.measureText(text);
		} while (
			textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight + this.margin * 2 < dimensions.x
				&& textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent + this.margin * 2 < dimensions.y
		)
		this.#fontSize--;
	}

	get #font() {
		return `bold ${this.#fontSize}pt "Courier", sans-serif`;
	}

	/**
	 * @param {GameState} gameState 
	 */
	draw(gameState) {
		gameState.context.font = this.#font;
		gameState.context.textAlign = this.textAlign;
		gameState.context.textBaseline = "middle";
		gameState.context.fillStyle = "white";
		gameState.context.strokeStyle = "black";
		gameState.context.lineWidth = this.borderWidth;
		let x = this.position.x;
		switch (this.textAlign) {
			case "center":
				x += this.dimensions.x / 2;
				break;
			case "end":
			case "right":
				x += this.dimensions.x;
				break;
		}
		gameState.context.fillText(this.text, x, this.position.y + this.dimensions.y / 2);
		gameState.context.strokeText(this.text, x, this.position.y + this.dimensions.y / 2);
	}
}
