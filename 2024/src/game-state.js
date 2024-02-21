import Input from "./input.js";
import Vector from "./vector.js";

export default class GameState {
  canvas;
  context;
  entities;
  gameData;
  input;
  previousTime;
  world;
  
  constructor(canvas, context, gameData) {
    this.canvas = canvas;
    this.context = context;
    this.entities = [];
    this.gameData = gameData;
    this.input = new Input();
    this.previousTime = performance.now();
    this.world = new Vector(0, 0);
    canvas.addEventListener("click", async function() {
      try {
        await canvas.requestPointerLock();
      } catch (e) {
        console.warn(e);
      }
    });
  }

  addEntity(entity) {
    this.entities.push(entity);
  }
}
