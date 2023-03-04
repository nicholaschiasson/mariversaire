import { LS_KEY, STATE_CONNECTED_KEYBOARD, STATE_GAME, STATE_PROGRESSION } from "./constants.js";
import state from "./state.js";

class MultiAudio {
	constructor(...paths) {
		this.audio = paths.map(p => new Audio(p));
		this.background = false;
		this.cursor = 0;
	}

	withBackground(background = true) {
		this.background = background;
		return this;
	}
}

export default class AudioManager {
	constructor() {
		this.current = undefined;
		this.state = {
			[STATE_GAME.Start]: {
				[STATE_PROGRESSION.Virtual]: new MultiAudio("rsrc/audio/voice001.mp3").withBackground()
			},
			[STATE_GAME.Over]: {
				[STATE_PROGRESSION.Virtual]: {
					win: new MultiAudio(),
					lose: new MultiAudio(
						"rsrc/audio/voice002.mp3",
						"rsrc/audio/voice003.mp3",
						"rsrc/audio/voice004.mp3",
						"rsrc/audio/voice005.mp3",
						"rsrc/audio/voice006.mp3"
					)
				},
				[STATE_PROGRESSION.Integrated]: {
					win: new MultiAudio("rsrc/audio/voice007.mp3").withBackground(),
					lose: new MultiAudio(
						"rsrc/audio/voice008.mp3",
						"rsrc/audio/voice009.mp3",
						"rsrc/audio/voice010.mp3"
					)
				},
				[STATE_PROGRESSION.External]: {
					win: {
						[STATE_CONNECTED_KEYBOARD.None]: new MultiAudio("rsrc/audio/voice011.mp3").withBackground(),
						[STATE_CONNECTED_KEYBOARD.Regular]: new MultiAudio("rsrc/audio/voice015.mp3").withBackground()
					},
					lose: new MultiAudio(
						"rsrc/audio/voice012.mp3",
						"rsrc/audio/voice013.mp3",
						"rsrc/audio/voice014.mp3"
					)
				}
			}
		}
	}

	play(filter) {
		// A cheeky way to allow the user to optionally pass a filter callback
		const trackGroup = this.state[state.get(LS_KEY.StateGame)];
		const track = (filter ? filter : t => t)(trackGroup && trackGroup[state.get(LS_KEY.StateProgression)]);
		const audio = track?.audio[track.cursor];
		if (audio) {
			this.current?.pause();
			this.current?.load();
			if (!track.background) {
				this.current = audio;
			}
			audio.load();
			audio.play();
			++track.cursor;
			return true;
		}
		return false;
	}

	pause() {
		this.current?.pause();
	}

	stop() {
		this.current?.stop();
	}

	toggleMuted() {
		if (this.current) {
			this.current.muted = !this.current.muted;
		}
	}
}
