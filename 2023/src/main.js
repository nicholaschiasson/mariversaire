import AudioManager from "./audioManager.js";
import { DURATION, LS_KEY, STATE_CONNECTED_KEYBOARD, STATE_GAME, STATE_KEYBOARD, STATE_PROGRESSION, STATE_WEB_USB_SUPPORT, STATE_WEB_USB_SUPPORT_TOGGLE_BUTTON, TICK_INTERVAL } from "./constants.js";
import elements from "./elements.js";
import KeyboardLayout from "./keyboardLayout.js";
import PassageManager, { PassagePushResult } from "./passageManager.js";
import Racer from "./racer.js";
import state, { State } from "./state.js";

/**
 * Declarations
 */

const audioManager = new AudioManager();
const passageManager = new PassageManager();
const racer = new Racer();

/**
 * Initialize & register event handlers
 */

state.set(LS_KEY.StateGame, STATE_GAME.Start);

setInterval(State.onTick, TICK_INTERVAL);
setInterval(onTick, TICK_INTERVAL);

state.addCallback(LS_KEY.StateGame, stateGameOnChange);
state.addSubscriber(LS_KEY.StateGame, elements.connectKeyboardButton);
state.addSubscriber(LS_KEY.StateGame, elements.gameTimer);
state.addSubscriber(LS_KEY.StateGame, elements.gameTitle);
state.addSubscriber(LS_KEY.StateGame, elements.keyboardArea);
state.addSubscriber(LS_KEY.StateGame, elements.passageArea);
state.addSubscriber(LS_KEY.StateGame, elements.passageInput);
state.addSubscriber(LS_KEY.StateGame, elements.playQuitButton);
state.addSubscriber(LS_KEY.StateGame, elements.toggleWebUsbSupportButton);
state.addSubscriber(LS_KEY.StateGame, elements.usePhysicalKeyboardButton);
state.addSubscriber(LS_KEY.StateGame, elements.useVirtualKeyboardButton);
state.addSubscriber(LS_KEY.StateIntroPlayed, elements.playQuitButton);
state.addSubscriber(LS_KEY.StateKeyboard, elements.keyboardArea);
state.addSubscriber(LS_KEY.StateKeyboard, elements.usePhysicalKeyboardButton);
state.addSubscriber(LS_KEY.StateKeyboard, elements.useVirtualKeyboardButton);
state.addSubscriber(LS_KEY.StateProgression, elements.connectKeyboardButton);
state.addSubscriber(LS_KEY.StateProgression, elements.usePhysicalKeyboardButton);
state.addSubscriber(LS_KEY.StateProgression, elements.useVirtualKeyboardButton);
state.addSubscriber(LS_KEY.StateWebUsbSupport, elements.connectKeyboardButton);
state.addSubscriber(LS_KEY.StateWebUsbSupport, elements.toggleWebUsbSupportButton);
state.addSubscriber(LS_KEY.StateConnectedKeyboard, elements.toggleWebUsbSupportButton);
state.addSubscriber(LS_KEY.StateWebUsbSupportToggleButton, elements.toggleWebUsbSupportButton);

window.addEventListener("keydown", windowOnKeyDown);

navigator.usb?.addEventListener("connect", navigatorUsbOnConnect);
navigator.usb?.addEventListener("disconnect", navigatorUsbOnDisconnect);

elements.connectKeyboardButton.addEventListener("click", connectKeyboardOnClick);
elements.passageInput.addEventListener("keydown", passageInputOnKeyDown);
elements.playQuitButton.addEventListener("click", playQuitOnClick);
elements.toggleWebUsbSupportButton.addEventListener("click", toggleWebUsbSupportOnClick);
elements.usePhysicalKeyboardButton.addEventListener("click", usePhysicalKeyboardOnClick);
elements.useVirtualKeyboardButton.addEventListener("click", useVirtualKeyboardOnClick);

for (const keyboardKey of elements.keyboardKeys) {
	keyboardKey.addEventListener("click", visualKeyboardKeyOnClick);
}

updateTimer();

/**
 * Event handlers
 */

// Decided to introduce this callback way too late in development...
// Opportunity for a LOT of refactoring.
function stateGameOnChange(state, value, previous) {
	switch (value) {
		case STATE_GAME.Playing: {
			elements.passageInput.placeholder = "Type like the wind!";
			break;
		}
		default: {
			elements.passageInput.placeholder = "Type the above text here when the race begins";
			break;
		}
	}
}

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
	switch (state.get(LS_KEY.StateKeyboard, true)) {
		case STATE_KEYBOARD.Physical: {
			if (keyboardEvent.isTrusted && /^([a-z.,'? ]|Backspace)$/i.test(keyboardEvent.key)) {
				processPhysicalKeyStroke(keyboardEvent);
			}
			break;
		}
		default: {
			break;
		}
	}
	keyboardEvent.preventDefault();
}

function navigatorUsbOnConnect(usbConnectionEvent) {
	state.usbDevice = usbConnectionEvent.device;
	state.set(LS_KEY.StateWebUsbSupport, STATE_WEB_USB_SUPPORT.Supported);
}

function navigatorUsbOnDisconnect(usbConnectionEvent) {
	state.usbDevice = undefined;
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
					const keyboard = state.get(LS_KEY.StateKeyboard);
					const progress = state.get(LS_KEY.StateProgression);
					state.cycle(LS_KEY.StateGame);
					if (keyboard === progress && progress !== STATE_PROGRESSION.External) {
						state.cycle(LS_KEY.StateProgression, true);
						unlockButton();
						audioManager.play(t => t?.win[0] ?? t?.win);
					} else if (
						state.get(LS_KEY.StateConnectedKeyboard) === STATE_CONNECTED_KEYBOARD.Regular
						|| (
							state.get(LS_KEY.StateWebUsbSupport) == STATE_WEB_USB_SUPPORT.Unsupported
							&& keyboard === STATE_KEYBOARD.Physical
						)
					) {
						audioManager.play(t => t?.win[1]);
					}
					break;
				}
			}
		}
	} else {
		keyboardEvent.preventDefault();
	}
}

function usePhysicalKeyboardOnClick(mouseEvent) {
	elements.usePhysicalKeyboardButton.removeAttribute("new");
	state.set(LS_KEY.StateKeyboard, STATE_KEYBOARD.Physical);
	if (!window.matchMedia("(hover: hover)").matches) {
		elements.passageInput.removeAttribute("disabled");
	}
}

function useVirtualKeyboardOnClick(mouseEvent) {
	elements.useVirtualKeyboardButton.removeAttribute("new");
	state.set(LS_KEY.StateKeyboard, STATE_KEYBOARD.Virtual);
	elements.passageInput.setAttribute("disabled", true);
}

function playQuitOnClick(mouseEvent) {
	switch (state.get(LS_KEY.StateGame)) {
		case STATE_GAME.Start: {
			if (audioManager.play()) {
				state.set(LS_KEY.StateIntroPlayed, true);
				state.elapsedTime = 0;
				break;
			}
		}
		case STATE_GAME.Over: {
			elements.useVirtualKeyboardButton.removeAttribute("new");
			elements.usePhysicalKeyboardButton.removeAttribute("new");
			elements.connectKeyboardButton.removeAttribute("new");
			elements.toggleWebUsbSupportButton.removeAttribute("new");
			elements.playQuitButton.removeAttribute("new");
			passageManager.cyclePassages();
			state.cycle(LS_KEY.StateGame);
			updateRacer();
			updateTimer();
			elements.passageInput.value = "";
			break;
		}
		default: {
			state.set(LS_KEY.StateGame, STATE_GAME.Over);
			break;
		}
	}
}

async function connectKeyboardOnClick(mouseEvent) {
	if (state.get(LS_KEY.StateWebUsbSupport, STATE_WEB_USB_SUPPORT.Unsupported)) {
		return;
	}
	elements.connectKeyboardButton.removeAttribute("new");
	state.set(LS_KEY.StateKeyboard, STATE_KEYBOARD.Physical);
	if (!window.matchMedia("(hover: hover)").matches) {
		elements.passageInput.removeAttribute("disabled");
	}
	if (!navigator.usb || !navigator.usb.requestDevice) {
		console.warn("WebUSB API not supported by current browser.");
		alert([
			"Uh oh! Looks like your browser doesn't support detecting USB devices.",
			"Not to worry. We can just pretend it does and fix your keyboard for you.",
			"Tada! As if by magic, your keyboard should work like normal now! Carry on!"
		].join("\n\n"));
		state.set(LS_KEY.StateWebUsbSupport, STATE_WEB_USB_SUPPORT.Unsupported);
		return;
	}
	try {
		state.usbDevice = await navigator.usb.requestDevice({ filters: [] });
		elements.toggleWebUsbSupportButton.removeAttribute("new");
	} catch (e) {
		console.warn(e);
		state.usbDevice = undefined;
		if (state.get(LS_KEY.StateWebUsbSupportToggleButton) === STATE_WEB_USB_SUPPORT_TOGGLE_BUTTON.Disabled) {
			alert([
				"It looks like you didn't select a keyboard!",
				"Whether that's because you don't have one or you simply don't want to, don't worry about it.",
				"I've given you a special toggle button to allow you to fix your messed up keyboard.",
				"Use it if you want!"
			].join("\n\n"));
			state.set(LS_KEY.StateWebUsbSupportToggleButton, STATE_WEB_USB_SUPPORT_TOGGLE_BUTTON.Enabled);
			elements.toggleWebUsbSupportButton.setAttribute("new", true);
		}
	}
}

function toggleWebUsbSupportOnClick(mouseEvent) {
	if (state.get(LS_KEY.StateConnectedKeyboard) !== STATE_CONNECTED_KEYBOARD.None) {
		return;
	}
	elements.toggleWebUsbSupportButton.removeAttribute("new");
	state.cycle(LS_KEY.StateWebUsbSupport);
}

/**
 * Functions
 */

function updateTimer() {
	let gameState = state.get(LS_KEY.StateGame);
	switch (gameState) {
		case STATE_GAME.Start: {
			const remaining = Math.max(DURATION[gameState] - state.elapsedTime, 0);
			elements.playQuitButton.setAttribute("remaining", remaining);
			if (state.get(LS_KEY.StateIntroPlayed) && remaining) {
				elements.playQuitButton.removeAttribute("new");
			} else {
				elements.playQuitButton.setAttribute("new", "");
			}
			break;
		}
		case STATE_GAME.Playing:
		case STATE_GAME.Preparing: {
			let remaining = Math.max(DURATION[gameState] - state.elapsedTime, 0);
			if (!remaining) {
				gameState = state.cycle(LS_KEY.StateGame);
				remaining = DURATION[gameState];
				audioManager.play(t => t?.lose);
			}
			elements.gameTimer.setAttribute("remaining", remaining);
			elements.gameTimer.textContent = remaining;
			break;
		}
		default: {
			break;
		}
	}
}

function updateRacer() {
	elements.racerWpm.textContent = passageManager.getWpm(state.elapsedTime / 60);
	racer.progress = passageManager.progress;
}

function processPhysicalKeyStroke(keyboardEvent) {
	// Call the event handler from here directly instead of dispatching another event
	if (state.connectedSuperKeyboard) {
		for (const c of passageManager.passageCurrent.textContent) {
			passageInputOnKeyDown(new KeyboardEvent("keydown", { key: c }));
		}
		if (passageManager.passageRemainder.peekRemainder()) {
			passageInputOnKeyDown(new KeyboardEvent("keydown", { key: " " }));
		}
		return;
	}
	if (state.get(LS_KEY.StateWebUsbSupport) === STATE_WEB_USB_SUPPORT.Unsupported || state.connectedRegularKeyboard) {
		passageInputOnKeyDown(new KeyboardEvent("keydown", keyboardEvent));
		return;
	}
	passageInputOnKeyDown(new KeyboardEvent("keydown", { key: KeyboardLayout.getAdjacent(keyboardEvent.key) }));
}

function unlockButton() {
	elements.usePhysicalKeyboardButton.removeAttribute("new");
	elements.connectKeyboardButton.removeAttribute("new");
	switch (state.get(LS_KEY.StateProgression)) {
		case STATE_PROGRESSION.Integrated: {
			elements.usePhysicalKeyboardButton.setAttribute("new", true);
			break;
		}
		case STATE_PROGRESSION.External: {
			elements.connectKeyboardButton.setAttribute("new", true);
			break;
		}
		default: {
			break;
		}
	}
}

/**
 * TODO:
 * - Add keyboard connected indicator
 * - Make win screen
 * - Make things flashy during super
 * - Mute button
 * - Add reset localStorage button
 * Post:
 * - Add random delay for
 * - Add secret button/mechanism to allow anyone to use the super keyboard without actually having it
 * - Light refactoring
 *   - Cleanup unused stuff like font inclusions
 * - Lighthouse
 * - Store best wpm and add ghost to race against
 */
