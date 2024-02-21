import Entity from "./entity.js";
import GameState from "./game-state.js";
import Vector from "./vector.js";

export default class Platform extends Entity {
  /**
   * @param {GameState} gameState 
   * @param {HTMLImageElement} texture 
   * @param {number} positionY 
   */
  constructor(gameState, texture, positionY) {
    const platformWidth = gameState.canvas.width / 4;
    const platformHeight = platformWidth / 5;
    const platformX = Math.random() * (gameState.canvas.width - platformWidth);
    const position = new Vector(platformX, positionY ?? 0);
    const dimensions = new Vector(platformWidth, platformHeight);

    super(position, texture, dimensions);
  }

  /**
   * @param {GameState} gameState 
   * @param {number} deltaTime 
   */
  update(gameState, deltaTime) {
    if (this.position.y > gameState.canvas.height) {
      gameState.entities.splice(gameState.entities.indexOf(this));
    }
  }
}
