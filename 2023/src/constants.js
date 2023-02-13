export const STATE_GAME = {
	Preparing: 0x001,
	Playing: 0x002,
	Over: 0x004
}

export const STATE_SUCCESS = {
	Pending: 0x008,
	Complete: 0x010,
}

export const STATE_PROGRESSION = {
	Visual: 0x020,
	Integrated: 0x040,
	External: 0x080,
	Super: 0x100
}

export const LS_KEY = {
	StateProgression: "2023.stateProgression"
}

export const GAME_TITLE = {
	[STATE_GAME.Preparing]: "The race is about to start!",
	[STATE_GAME.Playing]: "The race is on! Type the text below:",
	[STATE_GAME.Over]: "The race has ended."
}
