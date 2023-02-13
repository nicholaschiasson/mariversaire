import { LS_KEY, STATE_PROGRESSION } from "./constants.js";

class PrivateState {
	static Instance;
}

export class State {
	constructor() {
			if (PrivateState.Instance) {
					return PrivateState.Instance;
			}
			PrivateState.Instance = this;
	}

	get progression() {
		return localStorage.getItem(LS_KEY.StateProgression) || STATE_PROGRESSION.Visual;
	}

	set progression(value) {
		if (!Object.values(STATE_PROGRESSION).includes(value)) {
			throw new TypeError(`Invalid attempt to set progression to '${value}'.`);
		}
		localStorage.setItem(LS_KEY.StateProgression, value);
	}
}

export default new State();
