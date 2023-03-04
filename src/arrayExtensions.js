Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
}

Array.prototype.shuffle = function () {
	return [...this].sort(() => 0.5 - Math.random());
}
