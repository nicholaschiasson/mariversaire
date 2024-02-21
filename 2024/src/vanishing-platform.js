import Platform from "./platform.js";

export default class VanishingPlatform extends Platform {
  /**
   * @param {GameState} gameState 
   * @param {Entity} entity 
   * @param {number} intersection 
   */
  collide(gameState, entity, intersection) {
		super.collide(gameState, entity, intersection);
		this.alive = false;
	}
}

