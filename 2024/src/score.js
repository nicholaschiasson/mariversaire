import BoundingBox from "./bounding-box.js";
import Entity from "./entity.js";
import GameState from "./game-state.js";
import Vector from "./vector.js";

export default class Score extends Entity {
	borderRadius;
	margin;
	maxTextMetrics;

	/**
	 * @param {GameState} gameState
	 */
	constructor(gameState) {
		super(gameState, new Vector(gameState.canvas.width / 2, gameState.canvas.height / 12));
		this.fixed = true;
		this.layer = Infinity;
		this.borderRadius = 10;
		this.margin = 10;
		this.maxTextMetrics = new BoundingBox();
	}

	/**
	 * @param {GameState} gameState
	 */
	draw(gameState) {
		gameState.context.font = "bold 8vh \"Courier\", sans-serif";
		gameState.context.textAlign = "center";
		gameState.context.textBaseline = "middle";
		const score = Math.floor(gameState.gameData.score);
		const textMetrics = gameState.context.measureText(score);
		this.maxTextMetrics.left = Math.max(this.maxTextMetrics.left, textMetrics.actualBoundingBoxLeft);
		this.maxTextMetrics.right = Math.max(this.maxTextMetrics.right, textMetrics.actualBoundingBoxRight);
		this.maxTextMetrics.top = Math.max(this.maxTextMetrics.top, textMetrics.fontBoundingBoxAscent);
		this.maxTextMetrics.bottom = Math.max(this.maxTextMetrics.bottom, textMetrics.fontBoundingBoxDescent);
		gameState.context.fillStyle = "white";
		gameState.context.strokeStyle = "black";
		gameState.context.lineWidth = this.margin / 2;
		gameState.context.beginPath();
		gameState.context.roundRect(
			this.position.x - this.maxTextMetrics.left - this.margin * 2,
			this.position.y - this.maxTextMetrics.top - this.margin,
			this.maxTextMetrics.left + this.maxTextMetrics.right + this.margin * 4,
			this.maxTextMetrics.top + this.maxTextMetrics.bottom + this.margin,
			this.borderRadius,
		);
		gameState.context.fill();
		gameState.context.stroke();
		gameState.context.fillStyle = "black";
		gameState.context.fillText(score, this.position.x, this.position.y);
	}
}
