// constants
const LS_DATA_KEY = `${location.pathname}`;
const UPDATE_DELAY = 1000 / 60; // 60 times per second
const CMP_PLAYER = 0;
const CMP_POSITION = 1;
const CMP_TEXTURE = 2;

// register event handlers
addEventListener("load", dispatchInitialize);

// entities
class GameData {
  constructor() {
    this.score = 0;
  }

  static Load(key) {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) {
      Object.setPrototypeOf(data, GameData);
    }
    return data;
  }

  static Save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

class GameState {
  constructor(canvas, context, gameData) {
    this.entities = [];
    this.previousTime = performance.now();
    this.canvas = canvas;
    this.context = context;
    this.gameData = gameData;
  }

  addEntity(entity) {
    this.entities.push(entity);
  }
}

class Entity {
  #update = undefined;
  #draw = undefined;

  constructor() {
    this.component = {};
  }

  addComponent(key, value) {
    this.component[key] = value;
  }

  get update() {
    return this.#update;
  }

  set update(callback) {
    this.#update = callback;
  }

  get draw() {
    return this.#draw;
  }

  set draw(callback) {
    this.#draw = callback;
  }
}

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Texture {
  static FromUrl(url) {
    const img = document.createElement("img");
    img.src = url;
    return img;
  }
}

// game engine
function dispatchInitialize() {
  const gameCanvas = document.getElementById("game-canvas");
  const gameContext = gameCanvas.getContext("2d");
  const gameState = new GameState(gameCanvas, gameContext, GameData.Load(LS_DATA_KEY) ?? new GameData());

  initialize(gameState);
  setTimeout(dispatchUpdate, UPDATE_DELAY, gameState);
  requestAnimationFrame(function() {
    dispatchDraw(gameState);
  });
}

function dispatchUpdate(gameState) {
  const previousTime = gameState.previousTime;
  gameState.previousTime = performance.now();
  const deltaTime = (gameState.previousTime - previousTime) * 0.001;
  update(gameState, deltaTime);
  setTimeout(dispatchUpdate, UPDATE_DELAY, gameState);
}

function dispatchDraw(gameState) {
  draw(gameState);
  requestAnimationFrame(function() {
    dispatchDraw(gameState);
  });
}

// game logic
function initialize(gameState) {
  const player = new Entity();
  player.addComponent(CMP_PLAYER, true);
  player.addComponent(CMP_POSITION, {x: 0, y: 0});
  // player.addComponent(CMP_TEXTURE, Texture.FromUrl("/rsrc/images/birthday-cake.png"));
  player.update = updatePlayer;
  player.draw = drawEntity;
  gameState.addEntity(player);
}

function update(gameState, deltaTime) {
  for (const entity of gameState.entities) {
    entity.update(gameState, deltaTime);
  }
}

function draw(gameState) {
  for (const entity of gameState.entities) {
    entity.draw(gameState);
  }
}

function updatePlayer(gameState, deltaTime) {}

function drawEntity(gameState) {
  const position = this.component[CMP_POSITION];
  const texture = this.component[CMP_TEXTURE];
  if (position && texture) {
    gameState.context.drawImage(texture, position.x, position.y);
  }
}
