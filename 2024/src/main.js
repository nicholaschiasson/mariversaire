import GameData from "./game-data.js";
import GameState from "./game-state.js";
import Texture from "./texture.js";
import Vector from "./vector.js";

// constants
const LS_DATA_KEY = `${location.pathname}`;
const UPDATE_DELAY = 1000 / 60; // 60 times per second
const CMP_PLAYER = 0;
const CMP_POSITION = 1;
const CMP_TEXTURE = 2;
const CMP_VELOCITY = 3;
const CMP_DIMENSIONS = 4;
const CMP_PLATFORM = 5;

const GRAVITY = 28;
const JUMP_FORCE = 18;

// register event handlers
addEventListener("load", dispatchInitialize);

// entities
class Entity {
  #update;
  #draw;

  component;

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

// helpers and utils
function resizeGameCanvas(canvas) {
  const canvasComputedStyle = getComputedStyle(canvas);
  canvas.setAttribute("height", canvasComputedStyle.height);
  canvas.setAttribute("width", canvasComputedStyle.width);
}

// game engine
function dispatchInitialize() {
  const gameCanvas = document.getElementById("game-canvas");
  const gameContext = gameCanvas.getContext("2d");
  const gameState = new GameState(gameCanvas, gameContext, GameData.Load(LS_DATA_KEY) ?? new GameData());

  try {
    screen.orientation.lock("natural")
      .catch(e => {
        console.warn(e)
      });
  } catch (e) {
    console.warn(e)
  }
  resizeGameCanvas(gameCanvas);
  // NOTE: Interesting, by not registering the resize handler, we have an effect where resizing the
  // whole window/canvas scales the contents of the canvas proportionally. The CSS keeps the canvas
  // aspect ratio in tact, so we don't actually need to recall the resize callback.
  // addEventListener("resize", function() { resizeGameCanvas(gameCanvas); });
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
  for (const entity of gameState.entities) {
    if (entity.component[CMP_POSITION]) {
      entity.component[CMP_POSITION].x += gameState.world.x;
      entity.component[CMP_POSITION].y += gameState.world.y;
    }
  }
  gameState.world.x = 0;
  gameState.world.y = 0;
  gameState.input.update(gameState, deltaTime);
  setTimeout(dispatchUpdate, UPDATE_DELAY, gameState);
}

function dispatchDraw(gameState) {
  gameState.context.clearRect(0, 0, gameState.canvas.width, gameState.canvas.height);
  draw(gameState);
  requestAnimationFrame(function() {
    dispatchDraw(gameState);
  });
}

// game logic
function initialize(gameState) {
  gameState.addEntity(newPlayer(gameState));
  const platformVerticalBuffer = gameState.canvas.width / 18;
  for (let i = gameState.canvas.height - platformVerticalBuffer; i > 0; i -= platformVerticalBuffer) {
    gameState.addEntity(newPlatform(gameState, i));
  }
}

function update(gameState, deltaTime) {
  for (const entity of gameState.entities) {
    if (entity.update) {
      entity.update(gameState, deltaTime);
    }
  }
}

function draw(gameState) {
  for (const entity of gameState.entities) {
    if (entity.draw) {
      entity.draw(gameState);
    }
  }
}

// systems
function newPlayer(gameState) {
  const player = new Entity();
  const playerWidth = gameState.canvas.width / 6;
  player.addComponent(CMP_PLAYER, true);
  player.addComponent(CMP_POSITION, new Vector(gameState.canvas.width / 2 - playerWidth / 2, gameState.canvas.height / 2 - playerWidth / 2));
  player.addComponent(CMP_VELOCITY, new Vector(0, 0));
  player.addComponent(CMP_TEXTURE, Texture.FromUrl("/rsrc/images/birthday-cake.png"));
  player.addComponent(CMP_DIMENSIONS, new Vector(playerWidth, playerWidth));
  player.update = updatePlayer;
  player.draw = drawEntity;
  return player;
}

function updatePlayer(gameState, deltaTime) {
  // calculate velocity
  const mouseMovement = gameState.input.mouse.movement;
  if (document.pointerLockElement) {
    this.component[CMP_VELOCITY].x = mouseMovement.x / 2;
  }
  // if (document.pointerLockElement && mouseMovement.x !== 0) {
  //   this.component[CMP_VELOCITY].x = mouseMovement.x / 2;
  // } else {
  //   this.component[CMP_VELOCITY].x -= this.component[CMP_VELOCITY].x * deltaTime * 10;
  // }

  this.component[CMP_VELOCITY].y += GRAVITY * deltaTime;

  this.component[CMP_POSITION].x += this.component[CMP_VELOCITY].x;
  this.component[CMP_POSITION].y += this.component[CMP_VELOCITY].y;

  // calculate collisions
  const bottom = this.component[CMP_POSITION].y + this.component[CMP_DIMENSIONS].y;
  const screenIntersection = bottom - gameState.canvas.height;
  if (screenIntersection > 0) {
    this.component[CMP_POSITION].y -= screenIntersection * 2;
    this.component[CMP_VELOCITY].y = -JUMP_FORCE;
  }

  this.component[CMP_POSITION].x = (this.component[CMP_POSITION].x + gameState.canvas.width) % gameState.canvas.width;

  const moveUpBoundary = gameState.canvas.height / 2 - this.component[CMP_POSITION].y - this.component[CMP_DIMENSIONS].y / 2;
  if (moveUpBoundary > 0) {
    gameState.world.y += moveUpBoundary;
    gameState.gameData.score += moveUpBoundary;
  }
}

function newPlatform(gameState, positionY) {
  const platform = new Entity();
  const platformWidth = gameState.canvas.width / 4;
  const platformHeight = platformWidth / 5;
  const platformX = Math.random() * (gameState.canvas.width - platformWidth);
  platform.addComponent(CMP_PLATFORM, true);
  platform.addComponent(CMP_POSITION, new Vector(platformX, positionY ?? 0));
  platform.addComponent(CMP_TEXTURE, Texture.FromUrl("/rsrc/images/birthday-cake.png"));
  platform.addComponent(CMP_DIMENSIONS, new Vector(platformWidth, platformHeight));
  platform.update = updatePlatform;
  platform.draw = drawEntity;
  return platform;
}

function updatePlatform(gameState, deltaTime) {
  if (this.component[CMP_POSITION].y > gameState.canvas.height) {
    gameState.entities.splice(gameState.entities.indexOf(this));
  }
}

function drawEntity(gameState) {
  const position = this.component[CMP_POSITION];
  const texture = this.component[CMP_TEXTURE];
  const dimensions = this.component[CMP_DIMENSIONS];
  if (position && texture && dimensions) {
    gameState.context.drawImage(texture, position.x, position.y, dimensions.x, dimensions.y);
    const screenIntersection = position.x + dimensions.x - gameState.canvas.width;
    if (screenIntersection > 0) {
      gameState.context.drawImage(texture, screenIntersection - dimensions.x, position.y, dimensions.x, dimensions.y);
    }
  }
}
