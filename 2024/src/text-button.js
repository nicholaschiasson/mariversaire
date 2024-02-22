import Button from "./button.js";
import GameState from "./game-state.js";

export default class TextButton extends Button {
	backgroundColor;
	borderColor;
	borderRadius;
	borderWidth;
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
		this.text = text;
		this.textColor = "black";
	}

	/**
	 * @param {GameState} gameState 
	 */
	draw(gameState) {
		gameState.context.font = "bold 8vh \"Courier\", sans-serif";
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
