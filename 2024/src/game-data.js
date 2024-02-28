import Score from "./score.js";

export default class GameData {
	#key;
	leaderBoard;
	rewarded;

	/**
	 * @param {string} key 
	 */
	constructor(key) {
		this.#key = key;
		this.leaderBoard = [
			new Score("NIC", 100),
			new Score("JFK", 50),
			new Score("BOB", 20),
			new Score("AAA", 10)
		];
		this.rewarded = false;
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
