import GameState from "./game-state.js";
import Platform from "./platform.js";
import Player from "./player.js";
import Texture from "./texture.js";

/**
 * @param {GameState} gameState 
 */
export function initialize(gameState) {
  gameState.addEntity(new Player(gameState, Texture.FromUrl("/rsrc/images/birthday-cake.png")));
  const platformVerticalBuffer = gameState.canvas.width / 18;
  for (let i = gameState.canvas.height - platformVerticalBuffer; i > 0; i -= platformVerticalBuffer) {
    gameState.addEntity(new Platform(gameState, Texture.FromUrl("/rsrc/images/birthday-cake.png"), i));
  }
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
