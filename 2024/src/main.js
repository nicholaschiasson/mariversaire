const STATE_KEY = `${location.pathname}`;
const UPDATE_DELAY = 1000 / 60; // 60 times per second
const gameCanvas = document.getElementById("game-canvas");
const gameContext = gameCanvas.getContext("2d");
const state = newState(loadData(STATE_KEY) ?? newData());

addEventListener("load", initialize);

function newState(data) {
  return {
    previousTime: performance.now(),
    data
  };
}

function newData() {
  return {
    score: 0
  };
}

function loadData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function dispatchUpdate() {
  const previousTime = state.previousTime;
  state.previousTime = performance.now();
  update((state.previousTime - previousTime) * 0.001);
  setTimeout(dispatchUpdate, UPDATE_DELAY);
}

function dispatchDraw() {
  draw();
  requestAnimationFrame(dispatchDraw);
}

function initialize() {
  setTimeout(dispatchUpdate, UPDATE_DELAY);
  requestAnimationFrame(dispatchDraw);
}

function update(deltaTime) {
  // TODO: add update logic
}

function draw() {
  // TODO: render game
}
