import { LS_DELIM, LS_KEY, LS_PREFIX, STATE_CONNECTED_KEYBOARD, STATE_GAME, STATE_KEYBOARD, STATE_PROGRESSION, STATE_WEB_USB_SUPPORT, STATE_WEB_USB_SUPPORT_TOGGLE_BUTTON } from "./constants.js";

class PrivateState {
	static Instance;
	static StateMap;
	static UsbDevice;
}

export class State {
	constructor() {
		if (PrivateState.Instance) {
			return PrivateState.Instance;
		}
		PrivateState.Instance = this;
		PrivateState.StateMap = new Map();
		PrivateState.UsbDevice = undefined;
		this.elapsedTime = 0;
		this.subscribers = new Map();
	}

	get connectedRegularKeyboard() {
		return this.get(LS_KEY.StateConnectedKeyboard) === STATE_CONNECTED_KEYBOARD.Regular;
	}

	get connectedSuperKeyboard() {
		return this.get(LS_KEY.StateConnectedKeyboard) === STATE_CONNECTED_KEYBOARD.Super;
	}

	get usbDevice() {
		return PrivateState.UsbDevice;
	}

	set usbDevice(value) {
		if (value) {
			if (value.vendorId === 1452 && value.productId === 591) {
				this.set(LS_KEY.StateConnectedKeyboard, STATE_CONNECTED_KEYBOARD.Super);
			} else {
				this.set(LS_KEY.StateConnectedKeyboard, STATE_CONNECTED_KEYBOARD.Regular);
			}
		} else {
			this.set(LS_KEY.StateConnectedKeyboard, STATE_CONNECTED_KEYBOARD.None);
		}
		PrivateState.UsbDevice = value;
	}

	cycle(state, cache = false) {
		let states = {};
		switch (state) {
			case LS_KEY.StateConnectedKeyboard: {
				states = STATE_CONNECTED_KEYBOARD;
				break;
			}
			case LS_KEY.StateGame: {
				states = STATE_GAME;
				break;
			}
			case LS_KEY.StateKeyboard: {
				states = STATE_KEYBOARD;
				break;
			}
			case LS_KEY.StateProgression: {
				states = STATE_PROGRESSION;
				break;
			}
			case LS_KEY.StateWebUsbSupport: {
				states = STATE_WEB_USB_SUPPORT;
				break;
			}
			default: {
				throw new TypeError(`Attempt to cycle invalid state '${state}.`);
			}
		}
		let nextState = (this.get(state) + 1) % Object.keys(states).length
		this.set(state, nextState, cache);
		return nextState;
	}

	get(state) {
		switch (state) {
			case LS_KEY.StateConnectedKeyboard:
			case LS_KEY.StateGame:
			case LS_KEY.StateKeyboard:
			case LS_KEY.StateProgression:
			case LS_KEY.StateWebUsbSupport:
			case LS_KEY.StateWebUsbSupportToggleButton: {
				break;
			}
			default: {
				throw new TypeError(`Attempt to get value of invalid state '${state}.`);
			}
		}
		return Number.parseInt(localStorage.getItem(`${LS_PREFIX}${LS_DELIM}${state}`)) || PrivateState.StateMap.get(state) || 0;
	}

	set(state, value, cache = false) {
		switch (state) {
			case LS_KEY.StateConnectedKeyboard: {
				if (!Object.values(STATE_CONNECTED_KEYBOARD).includes(value)) {
					throw new TypeError(`Invalid attempt to set state '${state}' to '${value}'.`);
				}
				break;
			}
			case LS_KEY.StateGame: {
				if (!Object.values(STATE_GAME).includes(value)) {
					throw new TypeError(`Invalid attempt to set state '${state}' to '${value}'.`);
				}
				// We reset the elapsed time if the game state changes
				this.elapsedTime = 0;
				break;
			}
			case LS_KEY.StateKeyboard: {
				if (!Object.values(STATE_KEYBOARD).includes(value)) {
					throw new TypeError(`Invalid attempt to set state '${state}' to '${value}'.`);
				}
				break;
			}
			case LS_KEY.StateProgression: {
				if (!Object.values(STATE_PROGRESSION).includes(value)) {
					throw new TypeError(`Invalid attempt to set state '${state}' to '${value}'.`);
				}
				break;
			}
			case LS_KEY.StateWebUsbSupport: {
				if (!Object.values(STATE_WEB_USB_SUPPORT).includes(value)) {
					throw new TypeError(`Invalid attempt to set state '${state}' to '${value}'.`);
				}
				break;
			}
			case LS_KEY.StateWebUsbSupportToggleButton: {
				if (!Object.values(STATE_WEB_USB_SUPPORT_TOGGLE_BUTTON).includes(value)) {
					throw new TypeError(`Invalid attempt to set state '${state}' to '${value}'.`);
				}
				break;
			}
			default: {
				throw new TypeError(`Attempt to get value of invalid state '${state}.`);
			}
		}
		this.notifySubscribers(state, value);
		PrivateState.StateMap.set(state, value);
		if (cache) {
			localStorage.setItem(`${LS_PREFIX}${LS_DELIM}${state}`, value);
		}
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
