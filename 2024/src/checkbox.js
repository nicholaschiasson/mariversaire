import Button from "./button.js";
import GameState from "./game-state.js";

export default class Checkbox extends Button {
	#fontSize;
	#onRelease;

	backgroundColor;
	borderColor;
	borderRadius;
	borderWidth;
	checked;
	margin;
	text;

	/**
	 * @param {GameState} gameState 
	 * @param {Vector} position 
	 * @param {Vector} dimensions 
	 * @param {string} text 
	 * @param {boolean} [checked=false]
	 */
	constructor(gameState, position, dimensions, text, checked = false) {
		super(gameState, position, dimensions);
		this.backgroundColor = "white";
		this.borderColor = "black";
		this.borderRadius = 10;
		this.borderWidth = 5;
		this.checked = checked;
		this.margin = 10;
		this.text = text;
		this.#fontSize = 1;
		let textMetrics;
		do {
			this.#fontSize++;
			gameState.context.font = this.#font;
			textMetrics = gameState.context.measureText(text);
		} while (
			textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight + this.margin * 2 < dimensions.x - dimensions.y
				&& textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent + this.margin * 2 < dimensions.y
		)
		this.#fontSize--;
		this.#onRelease = () => { console.log("UNINIT"); this.checked = !this.checked; };
	}

	get #font() {
		return `bold ${this.#fontSize}pt "Courier", sans-serif`;
	}

	get onRelease() {
		return this.#onRelease;
	}

	set onRelease(callback) {
		this.#onRelease = gameState => {
			this.checked = !this.checked;
			callback.bind(this)(gameState);
		};
	}

	/**
	 * @param {GameState} gameState 
	 */
	draw(gameState) {
		gameState.context.font = this.#font;
		gameState.context.textAlign = "left";
		gameState.context.textBaseline = "middle";
		gameState.context.fillStyle = this.backgroundColor;
		gameState.context.strokeStyle = this.borderColor;
		gameState.context.lineWidth = this.borderWidth;
		gameState.context.beginPath();
		gameState.context.roundRect(this.position.x + this.dimensions.x - this.dimensions.y, this.position.y, this.dimensions.y, this.dimensions.y, this.borderRadius);
		gameState.context.fill();
		gameState.context.stroke();
		gameState.context.fillStyle = "white";
		gameState.context.strokeStyle = "black";
		gameState.context.lineWidth = this.borderWidth / 2;
		gameState.context.fillText(this.text, this.position.x, this.position.y + this.dimensions.y / 2);
		gameState.context.strokeText(this.text, this.position.x, this.position.y + this.dimensions.y / 2);
		if (this.checked) {
			gameState.context.font = `bold ${this.dimensions.y} "Courier", sans-serif`;
			gameState.context.textAlign = "left";
			gameState.context.textAlign = "center";
			gameState.context.fillText("✔️", this.position.x + this.dimensions.x - this.dimensions.y / 2, this.position.y + this.dimensions.y / 2);
		}
	}
}
