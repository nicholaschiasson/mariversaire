export default class GameData {
	score;

	constructor() {
		this.score = 0;
	}

	/**
	 * @param {string} key
	 * @returns {GameData}
	 */
	static Load(key) {
		const data = JSON.parse(localStorage.getItem(key));
		if (data) {
			Object.setPrototypeOf(data, GameData);
		}
		return data;
	}

	/**
	 * @param {string} key
	 * @param {GameData} data
	 */
	static Save(key, data) {
		localStorage.setItem(key, JSON.stringify(data));
	}
}
