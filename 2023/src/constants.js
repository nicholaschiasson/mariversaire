export const LS_PREFIX = "2023";

export const LS_DELIM = ".";

export const LS_KEY = {
	StateGame: "stateGame",
	StateProgression: "stateProgression"
}

export const STATE_GAME = {
	Preparing: 0,
	Playing: 1,
	Over: 2
}

export const STATE_SUCCESS = {
	Pending: 0,
	Complete: 1,
}

export const STATE_PROGRESSION = {
	Visual: 0,
	Integrated: 1,
	External: 2,
	Super: 3
}

export const TICK_INTERVAL = 1000;

export const DURATION = {
	[STATE_GAME.Preparing]: 10,
	[STATE_GAME.Playing]: 60,
	[STATE_GAME.Over]: 0
}

export const GAME_TITLE = {
	[STATE_GAME.Preparing]: "The race is about to start!",
	[STATE_GAME.Playing]: "The race is on! Type the text below:",
	[STATE_GAME.Over]: "The race has ended."
}
