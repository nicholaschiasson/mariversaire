import Entity from "./entity.js";
import GameState from "./game-state.js";
import Platform from "./platform.js";
import Player from "./player.js";
import MovingPlatform from "./moving-platform.js";
import Vector from "./vector.js";

export default class PlatformSpawner extends Entity {
	intervalUpperBound;
	maxInterval;
	nextSpawn;
	platformVerticalBuffer;
	player;

	/**
	 * @param {GameState} gameState
	 * @param {Player} player
	 */
	constructor(gameState, player) {
		super(gameState, new Vector(0, gameState.canvas.height));
		this.intervalUpperBound = 0;
		this.maxInterval = gameState.canvas.height * 0.25;
		this.nextSpawn = 0;
		this.platformVerticalBuffer = gameState.canvas.width / (Platform.heightToScreenWidthFactor - 5);
		this.player = player;
		while (this.position.y > 0) {
			this.spawn(gameState);
			this.position.y -= this.nextSpawn;
		}
	}

	/**
	 * @param {GameState} gameState
	 * @param {number} deltaTime
	 */
	update(gameState, deltaTime) {
		if (this.position.y >= this.nextSpawn) {
			this.position.y = 0;
			this.spawn(gameState);
		}
	}

	/**
	 * @param {GameState} gameState
	 */
	spawn(gameState) {
		gameState.addEntity(new MovingPlatform(gameState, this.player, this.position.y - this.platformVerticalBuffer));
		this.position.y -= this.platformVerticalBuffer;
		this.intervalUpperBound = Math.min(this.maxInterval, this.intervalUpperBound + 1);
		this.nextSpawn = Math.random() * this.intervalUpperBound;
	}
}