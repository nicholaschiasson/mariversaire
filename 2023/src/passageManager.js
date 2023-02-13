import { STATE_PROGRESSION } from "./constants.js";
import passages from "./passages.js";
import PassageText from "./passageText.js";
import State from "./state.js";

export const PassagePushResult = {
	None: "None",
	Ok: "Push",
	Word: "Word",
	Done: "Done",
}

export default class PassageManager {
	constructor() {
		this.passages = passages.shuffle();
		this.passageCorrect = new PassageText("passage-correct");
		this.passageCurrent = new PassageText("passage-current");
		this.passageRemainder = new PassageText("passage-remainder");
		this.passageRemainder.pushRemainder(this.passages[0]);
		this.passageCurrent.pushRemainder(this.passageRemainder.popWordRemainder());
		this.cursorLeft = document.getElementsByClassName("cursor-left")[0];
		this.cursorRight = document.getElementsByClassName("cursor-right")[0];
	}

	get wordsPerMinute() {

	}

	checkInput(value) {
		return State.progression === STATE_PROGRESSION.Visual
			? value.toLowerCase() === this.passageCurrent.peekRemainder().toLowerCase()
			: value === this.passageCurrent.peekRemainder();
	}

	cyclePassages() {
		this.passages = [...this.passages.slice(1), this.passages[0]];
		return this.passages[0];
	}

	placeCursorEndOfWord() {
		if (this.cursorLeft.textContent.length === 0 && this.cursorRight.textContent.length === 0) {
			this.cursorLeft.setAttribute("word-end", true);
		} else {
			this.cursorLeft.removeAttribute("word-end");
		}
	}

	shiftWord() {
		this.passageCorrect.pushCorrect(this.passageCurrent.spanCorrect.textContent + " ");
		this.passageCurrent.spanCorrect.textContent = "";
		this.passageCurrent.pushRemainder(this.passageRemainder.popWordRemainder());
	}

	push(value) {
		let success = false;
		if (this.passageCurrent.peekIncorrect()) {
			if (this.passageCurrent.peekRemainder()) {
				success = this.passageCurrent.pushIncorrect(this.passageCurrent.popRemainder());
			} else {
				success = this.passageRemainder.pushIncorrect(this.passageRemainder.popRemainder());
			}
		} else if (this.passageCurrent.peekRemainder()) {
			if (this.checkInput(value)) {
				success = this.passageCurrent.pushCorrect(this.passageCurrent.popRemainder());
				if (!this.passageCurrent.peekRemainder() && !this.passageRemainder.peekRemainder()) {
					this.shiftWord();
					this.placeCursorEndOfWord();
					return PassagePushResult.Done;
				}
			} else {
				success = this.passageCurrent.pushIncorrect(this.passageCurrent.popRemainder());
			}
		} else {
			if (this.passageRemainder.peekIncorrect()) {
				success = this.passageRemainder.pushIncorrect(this.passageRemainder.popRemainder());
			} else {
				if (value === " ") {
					this.shiftWord();
					this.placeCursorEndOfWord()
					return PassagePushResult.Word;
				} else {
					success = this.passageRemainder.pushIncorrect(this.passageRemainder.popRemainder());
				}
			}
		}
		this.placeCursorEndOfWord();
		return success ? PassagePushResult.Ok : PassagePushResult.None;
	}

	pop() {
		if (this.passageRemainder.peekIncorrect()) {
			this.passageRemainder.pushRemainder(this.passageRemainder.popIncorrect());
		} else {
			this.passageCurrent.pushRemainder(this.passageCurrent.popIncorrect() || this.passageCurrent.popCorrect());
		}
		this.placeCursorEndOfWord()
	}
}
