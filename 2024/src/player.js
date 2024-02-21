import Entity from "./entity.js";
import Vector from "./vector.js";

const GRAVITY = 28;
const JUMP_FORCE = 18;

export default class Player extends Entity {
  velocity;

  /**
   * @param {GameState} gameState 
   * @param {HTMLImageElement} texture 
   */
  constructor(gameState, texture) {
    const playerWidth = gameState.canvas.width / 6;
    const position = new Vector(gameState.canvas.width / 2 - playerWidth / 2, gameState.canvas.height / 2 - playerWidth / 2);
    const dimensions = new Vector(playerWidth, playerWidth);

    super(position, texture, dimensions);
    this.velocity = new Vector(0, 0);
  }

  /**
   * @param {GameState} gameState 
   * @param {number} deltaTime 
   */
  update(gameState, deltaTime) {
    // calculate velocity
    const mouseMovement = gameState.input.mouse.movement;
    if (document.pointerLockElement) {
      this.velocity.x = mouseMovement.x / 2;
    }
    // if (document.pointerLockElement && mouseMovement.x !== 0) {
    //   this.velocity.x = mouseMovement.x / 2;
    // } else {
    //   this.velocity.x -= this.velocity.x * deltaTime * 10;
    // }

    this.velocity.y += GRAVITY * deltaTime;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // calculate collisions
    const bottom = this.position.y + this.dimensions.y;
    const screenIntersection = bottom - gameState.canvas.height;
    if (screenIntersection > 0) {
      this.position.y -= screenIntersection * 2;
      this.velocity.y = -JUMP_FORCE;
    }

    this.position.x = (this.position.x + gameState.canvas.width) % gameState.canvas.width;

    const moveUpBoundary = gameState.canvas.height / 2 - this.position.y - this.dimensions.y / 2;
    if (moveUpBoundary > 0) {
      gameState.world.y += moveUpBoundary;
      gameState.gameData.score += moveUpBoundary;
    }
  }
}
