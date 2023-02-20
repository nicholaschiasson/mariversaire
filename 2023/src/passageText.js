export default class PassageText {
	constructor(id) {
		this.element = document.getElementById(id);
		if (!this.element) {
			throw new Error(`Failed to get element with ID '${id}'.`);
		}
		this.spanCorrect = this.element.getElementsByClassName("correct")[0];
		this.spanIncorrect = this.element.getElementsByClassName("incorrect")[0];
		this.spanRemainder = this.element.getElementsByClassName("remainder")[0];
	}

	get words() {
		return this.textContent.split(" ");
	}

	get length() {
		return this.textContent.length;
	}

	get textContent() {
		return (this.spanCorrect?.textContent ?? "") + (this.spanIncorrect?.textContent ?? "") + (this.spanRemainder?.textContent ?? "");
	}

	clear() {
		this.clearCorrect();
		this.clearIncorrect();
		this.clearRemainder();
	}

	pushCorrect(value) {
		if (value && this.spanCorrect) {
			this.spanCorrect.textContent += value;
			return true;
		}
		return false;
	}

	popCorrect() {
		const tail = this.spanCorrect?.textContent.slice(-1);
		if (this.spanCorrect) {
			this.spanCorrect.textContent = this.spanCorrect.textContent.slice(0, -1);
		}
		return tail;
	}

	peekCorrect() {
		return this.spanCorrect?.textContent.slice(-1);
	}

	clearCorrect() {
		if (this.spanCorrect) {
			this.spanCorrect.textContent = "";
		}
	}

	pushIncorrect(value) {
		if (value && this.spanIncorrect) {
			this.spanIncorrect.textContent += value;
			return true;
		}
		return false;
	}

	popIncorrect() {
		const tail = this.spanIncorrect?.textContent.slice(-1);
		if (this.spanIncorrect) {
			this.spanIncorrect.textContent = this.spanIncorrect.textContent.slice(0, -1);
		}
		return tail;
	}

	peekIncorrect() {
		return this.spanIncorrect?.textContent.slice(-1);
	}

	clearIncorrect() {
		if (this.spanIncorrect) {
			this.spanIncorrect.textContent = "";
		}
	}

	pushRemainder(value) {
		if (value && this.spanRemainder) {
			this.spanRemainder.textContent = value + this.spanRemainder.textContent;
			return true;
		}
		return false;
	}

	popRemainder() {
		const head = this.spanRemainder?.textContent.slice(0, 1);
		if (this.spanRemainder) {
			this.spanRemainder.textContent = this.spanRemainder.textContent.slice(1);
		}
		return head;
	}

	peekRemainder() {
		return this.spanRemainder?.textContent.slice(0, 1);
	}

	clearRemainder() {
		if (this.spanRemainder) {
			this.spanRemainder.textContent = "";
		}
	}

	popWordRemainder() {
		let [word, ...remainder] = this.spanRemainder?.textContent.trim().split(/\s/) ?? [];
		if (this.spanRemainder) {
			this.spanRemainder.textContent = (remainder.length ? " " : "") + remainder.join(" ");
		}
		return word;
	}
}
