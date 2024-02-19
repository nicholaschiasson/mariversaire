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
class GameData {
  score;

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

class Input {
  mouse;

  constructor() {
    this.mouse = new MouseInput();
  }

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

class Vector {
  x;
  y;
  
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
  gameState.addEntity(newPlatform(gameState, new Vector(0, 0)));
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
  }
}

function newPlatform(gameState, position) {
  const platform = new Entity();
  const platformWidth = gameState.canvas.width / 4;
  platform.addComponent(CMP_PLATFORM, true);
  platform.addComponent(CMP_POSITION, position);
  platform.addComponent(CMP_TEXTURE, Texture.FromUrl("/rsrc/images/birthday-cake.png"));
  platform.addComponent(CMP_DIMENSIONS, new Vector(platformWidth, platformWidth / 5));
  platform.draw = drawEntity;
  return platform;
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
