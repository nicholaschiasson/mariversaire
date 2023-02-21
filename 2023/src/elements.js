class PrivateElements {
	static Instance;

	static ConnectKeyboardButton;
	static GameTimer;
	static GameTitle;
	static KeyboardArea;
	static KeyboardKeys;
	static PassageInput;
	static RacerWpm;
	static RaceAgainButton;
	static ToggleWebUsbSupportButton;
	static UsePhysicalKeyboardButton;
	static UseVirtualKeyboardButton;
}

export class Elements {
	constructor() {
		if (PrivateElements.Instance) {
			return PrivateElements.Instance;
		}
		PrivateElements.Instance = this;
	}

	get connectKeyboardButton() {
		if (!PrivateElements.ConnectKeyboardButton) {
			PrivateElements.ConnectKeyboardButton = document.getElementById("connect-keyboard");
		}
		return PrivateElements.ConnectKeyboardButton;
	}

	get gameTitle() {
		if (!PrivateElements.GameTitle) {
			PrivateElements.GameTitle = document.getElementById("game-title");
		}
		return PrivateElements.GameTitle;
	}

	get gameTimer() {
		if (!PrivateElements.GameTimer) {
			PrivateElements.GameTimer = document.getElementById("game-timer");
		}
		return PrivateElements.GameTimer;
	}

	get keyboardArea() {
		if (!PrivateElements.KeyboardArea) {
			PrivateElements.KeyboardArea = document.getElementById("keyboard-area");
		}
		return PrivateElements.KeyboardArea;
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

	get racerWpm() {
		if (!PrivateElements.RacerWpm) {
			PrivateElements.RacerWpm = document.getElementById("racer-wpm");
		}
		return PrivateElements.RacerWpm;
	}

	get raceAgainButton() {
		if (!PrivateElements.RaceAgainButton) {
			PrivateElements.RaceAgainButton = document.getElementById("race-again");
		}
		return PrivateElements.RaceAgainButton;
	}

	get toggleWebUsbSupportButton() {
		if (!PrivateElements.ToggleWebUsbSupportButton) {
			PrivateElements.ToggleWebUsbSupportButton = document.getElementById("toggle-web-usb-support");
		}
		return PrivateElements.ToggleWebUsbSupportButton;
	}

	get usePhysicalKeyboardButton() {
		if (!PrivateElements.UsePhysicalKeyboardButton) {
			PrivateElements.UsePhysicalKeyboardButton = document.getElementById("use-physical-keyboard");
		}
		return PrivateElements.UsePhysicalKeyboardButton;
	}

	get useVirtualKeyboardButton() {
		if (!PrivateElements.UseVirtualKeyboardButton) {
			PrivateElements.UseVirtualKeyboardButton = document.getElementById("use-virtual-keyboard");
		}
		return PrivateElements.UseVirtualKeyboardButton;
	}
}

export default new Elements();
