import { DURATION, LS_KEY, STATE_GAME, STATE_PROGRESSION, TICK_INTERVAL } from "./constants.js";
import elements from "./elements.js";
import PassageManager, { PassagePushResult } from "./passageManager.js";
import Racer from "./racer.js";
import state, { State } from "./state.js";

/**
 * Declarations
 */

let passageManager = new PassageManager();
let racer = new Racer();

/**
 * Initialize & register event handlers
 */

state.set(LS_KEY.StateGame, STATE_GAME.Preparing);

setInterval(State.onTick, TICK_INTERVAL);
setInterval(onTick, TICK_INTERVAL);

// state.addSubscriber(LS_KEY.StateGame, elements.connectKeyboardButton);
state.addSubscriber(LS_KEY.StateGame, elements.gameTimer);
state.addSubscriber(LS_KEY.StateGame, elements.gameTitle);
state.addSubscriber(LS_KEY.StateGame, elements.passageInput);
state.addSubscriber(LS_KEY.StateGame, elements.raceAgainButton);
// state.addSubscriber(LS_KEY.StateGame, elements.usePhysicalKeyboardButton);
// state.addSubscriber(LS_KEY.StateGame, elements.useVirtualKeyboardButton);
state.addSubscriber(LS_KEY.StateProgression, elements.keyboardArea);

window.addEventListener("keydown", windowOnKeyDown);

elements.passageInput.addEventListener("keydown", passageInputOnKeyDown);
elements.raceAgainButton.addEventListener("click", raceAgainOnClick);

for (let keyboardKey of elements.keyboardKeys) {
	keyboardKey.addEventListener("click", visualKeyboardKeyOnClick);
}

updateTimer();

/**
 * Event handlers
 */

function onTick() {
	updateTimer();
	switch (state.get(LS_KEY.StateGame)) {
		case STATE_GAME.Playing: {
			updateRacer();
			break;
		}
		default: {
			break;
		}
	}
}

function windowOnKeyDown(keyboardEvent) {
	if (keyboardEvent.altKey || keyboardEvent.ctrlKey || keyboardEvent.metaKey) {
		return;
	}
	switch (state.get(LS_KEY.StateProgression)) {
		case STATE_PROGRESSION.Integrated:
		case STATE_PROGRESSION.External: {
			if (keyboardEvent.isTrusted && /^([a-z.,'? ]|Backspace)$/i.test(keyboardEvent.key)) {
				// Call the event handler directly instead of dispatching another event
				passageInputOnKeyDown(new KeyboardEvent("keydown", keyboardEvent));
			}
			break;
		}
		case STATE_PROGRESSION.Super: {
			// superpowers
			break;
		}
		default: {
			break;
		}
	}
	keyboardEvent.preventDefault();
}

function visualKeyboardKeyOnClick(mouseEvent) {
	// Call the event handler directly instead of dispatching another event
	passageInputOnKeyDown(new KeyboardEvent("keydown", {
		key: mouseEvent.target.id === "keyboard-key-backspace"
			? "Backspace"
			: mouseEvent.target.textContent
	}));
}

function passageInputOnKeyDown(keyboardEvent) {
	if (!keyboardEvent.isTrusted && state.get(LS_KEY.StateGame) === STATE_GAME.Playing) {
		if (keyboardEvent.key === "Backspace") {
			elements.passageInput.value = elements.passageInput.value.slice(0, -1);
			passageManager.pop();
		} else {
			switch (passageManager.push(keyboardEvent.key)) {
				case PassagePushResult.Ok: {
					elements.passageInput.value += keyboardEvent.key;
					break;
				}
				case PassagePushResult.Word: {
					elements.passageInput.value = "";
					break;
				}
				case PassagePushResult.Done: {
					elements.passageInput.value = "";
					updateRacer();
					state.cycle(LS_KEY.StateGame);
					break;
				}
			}
		}
	} else {
		keyboardEvent.preventDefault();
	}
}

function raceAgainOnClick(mouseEvent) {
	passageManager.cyclePassages();
	state.cycle(LS_KEY.StateGame);
	updateRacer();
	updateTimer();
	elements.passageInput.value = "";
}

/**
 * Functions
 */

function updateTimer() {
	let gameState = state.get(LS_KEY.StateGame);
	let remaining = Math.max(DURATION[gameState] - state.elapsedTime, 0);
	if (gameState !== STATE_GAME.Over) {
		if (!remaining) {
			gameState = state.cycle(LS_KEY.StateGame);
			remaining = DURATION[gameState];
		}
		elements.gameTimer.setAttribute("remaining", remaining);
		elements.gameTimer.textContent = remaining;
	}
}

function updateRacer() {
	elements.racerWpm.textContent = passageManager.getWpm(state.elapsedTime / 60);
	racer.progress = passageManager.progress;
}

/**
 * stuff for later
 */

// const keyboard = await navigator.usb.requestDevice({filters:[]});
