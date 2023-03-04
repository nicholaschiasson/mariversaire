export const LS_PREFIX = "2023";

export const LS_DELIM = ".";

export const LS_KEY = {
	StateConnectedKeyboard: "stateConnectedKeyboard",
	StateGame: "stateGame",
	StateIntroPlayed: "stateIntroPlayed",
	StateKeyboard: "stateKeyboard",
	StateProgression: "stateProgression",
	StateWebUsbSupport: "stateWebUsbSupport",
	StateWebUsbSupportToggleButton: "stateWebUsbSupportToggleButton"
};

export const STATE_GAME = {
	Start: -1,
	Preparing: 0,
	Playing: 1,
	Over: 2
};

export const STATE_SUCCESS = {
	Pending: 0,
	Complete: 1,
};

export const STATE_PROGRESSION = {
	Virtual: 0,
	Integrated: 1,
	External: 2
};

export const STATE_KEYBOARD = {
	Virtual: 0,
	Physical: 1
};

export const STATE_WEB_USB_SUPPORT = {
	Supported: 0,
	Unsupported: 1
};

export const STATE_WEB_USB_SUPPORT_TOGGLE_BUTTON = {
	Disabled: 0,
	Enabled: 1
};

export const STATE_CONNECTED_KEYBOARD = {
	None: 0,
	Regular: 1,
	Super: 2
}

export const TICK_INTERVAL = 1000;

export const DURATION = {
	[STATE_GAME.Start]: 38,
	[STATE_GAME.Preparing]: 5,
	[STATE_GAME.Playing]: 60,
	[STATE_GAME.Over]: 0
};

export const GAME_TITLE = {
	[STATE_GAME.Preparing]: "The race is about to start!",
	[STATE_GAME.Playing]: "The race is on! Type the text below:",
	[STATE_GAME.Over]: "The race has ended."
};
