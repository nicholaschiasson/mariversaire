import { LS_DELIM, LS_KEY, LS_PREFIX, STATE_GAME, STATE_PROGRESSION } from "./constants.js";

class PrivateState {
	static Instance;
}

export class State {
	constructor() {
			if (PrivateState.Instance) {
				return PrivateState.Instance;
			}
			PrivateState.Instance = this;
			this.elapsedTime = 0;
			this.subscribers = new Map();
	}

	cycle(state) {
		let states = {};
		switch (state) {
			case LS_KEY.StateGame:
				states = STATE_GAME;
				break;
				case LS_KEY.StateProgression: {
				states = STATE_PROGRESSION;
				break;
			}
			default: {
				throw new TypeError(`Attempt to cycle invalid state '${state}.`);
			}
		}
		let nextState = (this.get(state) + 1) % Object.keys(states).length
		this.set(state, nextState);
		return nextState;
	}

	// TODO: Don't use localstorage by default

	get(state) {
		switch (state) {
			case LS_KEY.StateGame:
			case LS_KEY.StateProgression: {
				break;
			}
			default: {
				throw new TypeError(`Attempt to get value of invalid state '${state}.`);
			}
		}
		return Number.parseInt(localStorage.getItem(`${LS_PREFIX}${LS_DELIM}${state}`)) || 0;
	}

	set(state, value) {
		switch (state) {
			case LS_KEY.StateGame: {
				if (!Object.values(STATE_GAME).includes(value)) {
					throw new TypeError(`Invalid attempt to set state '${state}' to '${value}'.`);
				}
				// We reset the elapsed time if the game state changes
				this.elapsedTime = 0;
				break;
			}
			case LS_KEY.StateProgression: {
				if (!Object.values(STATE_PROGRESSION).includes(value)) {
					throw new TypeError(`Invalid attempt to set state '${state}' to '${value}'.`);
				}
				break;
			}
			default: {
				throw new TypeError(`Attempt to get value of invalid state '${state}.`);
			}
		}
		localStorage.setItem(`${LS_PREFIX}${LS_DELIM}${state}`, value);
		this.notifySubscribers(state, value);
	}

	addSubscriber(topic, subscriber) {
		this.notifySubscriber(subscriber, topic, this.get(topic));
		this.subscribers.get(topic)?.add(subscriber) ?? this.subscribers.set(topic, new Set([subscriber]));
	}

	notifySubscribers(topic, value) {
		for (const subscriber of this.subscribers.get(topic) ?? []) {
			this.notifySubscriber(subscriber, topic, value);
		}
	}

	notifySubscriber(subscriber, topic, value) {
		subscriber.setAttribute(topic, value);
	}

	static onTick() {
		let state = new State();
		++state.elapsedTime;
	}
}

export default new State();
