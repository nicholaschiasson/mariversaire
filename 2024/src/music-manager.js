export default class MusicManager {
	#current;
	#enabled;

	/**
	 * @param {boolean} [enabled=false]
	 */
	constructor(enabled = false) {
		this.#enabled = enabled;
	}

	get current() {
		return this.#current;
	}

	get enabled() {
		return this.#enabled;
	}

	/**
	 * @param {boolean} enabled
	 */
	set enabled(enabled) {
		this.#enabled = enabled;
		if (this.#current && !enabled) {
			this.#current.pause();
			this.#current.fastSeek(0);
		}
	}

	get playing() {
		return !(this.#current?.paused ?? true);
	}

	/**
	 * @param {HTMLAudioElement} music 
	 */
	play(music) {
		if (this.#enabled) {
			try {
				this.#current?.pause();
				if (music.src !== this.#current?.src) {
					music.fastSeek(0);
				}
				this.#current = music;
				this.#current.play();
			} catch (e) {
				console.warn(e);
			}
		}
	}
}
