export default class GameData {
  score;

  constructor() {
    this.score = 0;
  }

  static Load(key) {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) {
      Object.setPrototypeOf(data, GameData);
    }
    return data;
  }

  static Save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
