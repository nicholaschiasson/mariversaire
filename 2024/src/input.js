import GameState from "./game-state.js";
import Vector from "./vector.js";

export default class Input {
  mouse;

  constructor() {
    this.mouse = new MouseInput();
  }

  /**
   * @param {GameState} gameState 
   * @param {number} deltaTime 
   */
  update(gameState, deltaTime) {
    this.mouse.update(gameState, deltaTime);
  }
}

class MouseInput {
  buttons;
  movement;
  position;

  constructor() {
    this.buttons = Array(5).fill(new MouseButton);
    this.movement = new Vector(0, 0);
    this.position = new Vector(0, 0);
    const mouse = this;
    addEventListener("mousedown", function(e) {
      mouse.buttons[e.button].press();
    });
    addEventListener("mouseup", function(e) {
      mouse.buttons[e.button].release();
    });
    addEventListener("mousemove", function(e) {
      mouse.movement.x = e.movementX;
      mouse.movement.y = e.movementY;
      mouse.position.x = e.x;
      mouse.position.y = e.y;
    });
  }

  /**
   * @param {GameState} gameState 
   * @param {number} deltaTime 
   */
  update(gameState, deltaTime) {
    for (const button of this.buttons) {
      button.update(gameState, deltaTime);
    }
    this.movement.x = 0;
    this.movement.y = 0;
  }
}

class MouseButton {
  #isDown;
  #wasDown;

  constructor() {
    this.#isDown = false;
    this.#wasDown = false;
  }

  press() {
    this.#isDown = true;
  }

  release() {
    this.#isDown = false;
  }

  down() {
    return this.#wasDown && this.#isDown;
  }

  up() {
    return !this.#wasDown && !this.#isDown;
  }

  pressed() {
    return !this.#wasDown && this.#isDown;
  }

  released() {
    return this.#wasDown && !this.#isDown;
  }

  /**
   * @param {GameState} gameState 
   * @param {number} deltaTime 
   */
  update(gameState, deltaTime) {
    this.#wasDown = this.#isDown;
  }

  static get Left() {
    return 0;
  }

  static get Middle() {
    return 1;
  }

  static get Right() {
    return 2;
  }

  static get BrowserBack() {
    return 3;
  }

  static get BrowserForward() {
    return 4;
  }
}
