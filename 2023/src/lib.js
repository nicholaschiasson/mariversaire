/**
 * Define constants
 */
const STATE_GAME = {
	Preparing: 0x001,
	Playing: 0x002,
	Over: 0x004
}

const STATE_SUCCESS = {
	Pending: 0x008,
	Complete: 0x010,
}

const STATE_PROGRESSION = {
	Visual: 0x020,
	Integrated: 0x040,
	External: 0x080,
	Super: 0x100
}

const LS_KEY = {
	StateProgression: "stateProgression"
}

const GAME_TITLE = {
	[STATE_GAME.Preparing]: "The race is about to start!",
	[STATE_GAME.Playing]: "The race is on! Type the text below:",
	[STATE_GAME.Over]: "The race has ended."
}

/**
 * Initialize state
 */
localStorage.getItem(LS_KEY.StateProgression) || localStorage.setItem(LS_KEY.StateProgression, STATE_PROGRESSION.Visual);

// todo: define singleton for state to hold all html element references

function windowOnKeyDown(keyboardEvent) {
	if (keyboardEvent.isTrusted && /^([a-z.,'? ]|Backspace)$/i.test(keyboardEvent.key)) {
		// Call the event handler directly instead of dispatching another event
		passageInputOnKeyDown(new KeyboardEvent("keydown", keyboardEvent));
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
			passageInput.value = passageInput.value.slice(0, -1);
		} else {
			passageInput.value += keyboardEvent.key;
		}
	} else {
		keyboardEvent.preventDefault();
	}
}
