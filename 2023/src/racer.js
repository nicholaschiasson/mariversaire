export default class Racer {
	constructor() {
		this.wrapper = document.getElementById("racer-wrapper");
		if (!this.wrapper) {
			throw new Error(`Failed to get element with ID 'racer-wrapper'.`);
		}
		this.racer = document.getElementById("racer");
		if (!this.racer) {
			throw new Error(`Failed to get element with ID 'racer'.`);
		}
	}

	set progress(value) {
		let percentage = Math.min(Math.max(value * 100, 0), 100);
		this.wrapper.style.translate = percentage + "% 0 0";
		this.racer.style.translate = "-" + percentage + "% 0 0";
	}
}
