import { STATE_PROGRESSION } from "./constants.js";
import Elements from "./elements.js";
import PassageManager, { PassagePushResult } from "./passageManager.js";
import State from "./state.js";

/**
 * Declarations
 */

let passageManager = new PassageManager();

/**
 * Register event handlers
 */

window.addEventListener("keydown", windowOnKeyDown);
Elements.passageInput.addEventListener("keydown", passageInputOnKeyDown);
for (let keyboardKey of Elements.keyboardKeys) {
	keyboardKey.addEventListener("click", visualKeyboardKeyOnClick);
}

/**
 * Event handlers
 */

function windowOnKeyDown(keyboardEvent) {
	switch (State.progression) {
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
	}
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
	if (!keyboardEvent.isTrusted) {
		if (keyboardEvent.key === "Backspace") {
			Elements.passageInput.value = Elements.passageInput.value.slice(0, -1);
			passageManager.pop();
		} else {
			switch (passageManager.push(keyboardEvent.key)) {
				case PassagePushResult.Ok: {
					Elements.passageInput.value += keyboardEvent.key;
					break;
				}
				case PassagePushResult.Word:
				case PassagePushResult.Done: {
					Elements.passageInput.value = "";
					break;
				}
			}
		}
	} else {
		keyboardEvent.preventDefault();
	}
}

/**
 * stuff for later
 */

// const keyboard = await navigator.usb.requestDevice({filters:[]});
