export default class GameData {
	#key;
	leaderBoard;

	/**
	 * @param {string} key 
	 */
	constructor(key) {
		this.#key = key;
		this.leaderBoard = [];
	}

	/**
	 * @param {string} key
	 * @returns {GameData}
	 */
	static load(key) {
		let data = JSON.parse(localStorage.getItem(key));
		if (data) {
			data = Object.assign(new GameData(key), data);
		}
		return data;
	}

	save() {
		localStorage.setItem(this.#key, JSON.stringify(this));
	}

	/**
	 * @param {string} key 
	 */
	set key(key) {
		this.#key = key;
	}
}
