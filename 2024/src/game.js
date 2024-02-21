import GameState from "./game-state.js";
import Platform from "./platform.js";
import Player from "./player.js";
import Score from "./score.js";
import Texture from "./texture.js";

let player;

/**
 * @param {GameState} gameState 
 */
export function initialize(gameState) {
  player = new Player(gameState, Texture.FromUrl("/rsrc/images/birthday-cake.png"));
  gameState.addEntity(player);
  const platformVerticalBuffer = gameState.canvas.width / 18;
  for (let i = gameState.canvas.height - platformVerticalBuffer; i > 0; i -= platformVerticalBuffer) {
    gameState.addEntity(new Platform(gameState, Texture.FromUrl("/rsrc/images/birthday-cake.png"), player, i));
  }
  gameState.addEntity(new Score(gameState));
}

/**
 * @param {GameState} gameState
 * @param {number} deltaTime 
 */
export function update(gameState, deltaTime) {
  for (const entity of gameState.entities) {
    if (entity.update) {
      entity.update(gameState, deltaTime);
    }
  }
}

/**
 * @param {GameState} gameState 
 */
export function draw(gameState) {
  for (const entity of gameState.entities) {
    if (entity.draw) {
      entity.draw(gameState);
    }
  }
}