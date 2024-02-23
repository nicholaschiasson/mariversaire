import Button from "./button.js";
import GameState from "./game-state.js";

export default class TextButton extends Button {
	#fontSize;

	backgroundColor;
	borderColor;
	borderRadius;
	borderWidth;
	margin;
	text;
	textColor;

	/**
	 * @param {GameState} gameState 
	 * @param {Vector} position 
	 * @param {Vector} dimensions 
	 * @param {string} text 
	 */
	constructor(gameState, position, dimensions, text) {
		super(gameState, position, dimensions);
		this.backgroundColor = "white";
		this.borderColor = "black";
		this.borderRadius = 10;
		this.borderWidth = 5;
		this.margin = 10;
		this.text = text;
		this.textColor = "black";
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
		gameState.context.textAlign = "center";
		gameState.context.textBaseline = "middle";
		gameState.context.fillStyle = this.backgroundColor;
		gameState.context.strokeStyle = this.borderColor;
		gameState.context.lineWidth = this.borderWidth;
		gameState.context.beginPath();
		gameState.context.roundRect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y, this.borderRadius);
		gameState.context.fill();
		gameState.context.stroke();
		gameState.context.fillStyle = this.textColor;
		gameState.context.fillText(this.text, this.position.x + this.dimensions.x / 2, this.position.y + this.dimensions.y / 2);
	}
}
