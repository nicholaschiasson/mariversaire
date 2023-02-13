class PrivateElements {
	static Instance;

	static KeyboardKeys;
	static PassageInput;
}

export class Elements {
	constructor() {
			if (PrivateElements.Instance) {
					return PrivateElements.Instance;
			}
			PrivateElements.Instance = this;
	}

	get keyboardKeys() {
		if (!PrivateElements.KeyboardKeys) {
			PrivateElements.KeyboardKeys = document.getElementsByClassName("keyboard-key");
		}
		return PrivateElements.KeyboardKeys;
	}

	get passageInput() {
		if (!PrivateElements.PassageInput) {
			PrivateElements.PassageInput = document.getElementById("passage-input");
		}
		return PrivateElements.PassageInput;
	}
}

export default new Elements();
