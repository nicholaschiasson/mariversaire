import Entity from "./entity.js";
import GameData from "./game-data.js";
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
  
  /**
   * @param {HTMLCanvasElement} canvas 
   * @param {CanvasRenderingContext2D} context 
   * @param {GameData} gameData 
   */
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

  /**
   * @param {Entity} entity 
   */
  addEntity(entity) {
    this.entities.splice(this.entities.findIndex(e => e.layer > entity.layer), 0, entity);
  }
}