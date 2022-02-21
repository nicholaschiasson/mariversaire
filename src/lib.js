Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
}

const LSKEY_SPINNING = "spinning";
const LSKEY_SPINS = "spins";

const PRIZES = [1, 9, 25, 36];
const SLOT_VALUES = ["☕", "🌱", "💅", "🍸", "🛬"];

const MOTIVATION = [4, 8, 12, 16, 20, 24, 27, 29, 30, 31, 32, 33, 34, 35, 36];
const MOTIVATIONAL_PHRASES = [
	"Maybe quit while you're ahead...",
	"Money won is twice as sweet as money earned, or so they say.",
	"Who needs a retirement fund anyway?",
	"Are we absolutely sure you don't have a gambling addiction?",
	"I'm sure the jackpot is just a FEW more spins away...",
	"You're lucky this is free, honey.",
	"Alright, you can stop spinning now.",
	"Seriously, there were only 3 prizes.",
	"Honestly, it's coded to only let you win 3 times.",
	"Do you think I would add an easter egg or something like that?",
	"Don't you know how lazy I am? Why would I make a fourth prize?",
	"This is beginning to get excessive, don't you think?",
	"Alright, fine. Due to your persistence, I shall grant you a fourth prize...",
	"Psyche! Haha totally fooled you didn't I?",
	"Okay, now I feel bad. Here, you can have your prize.",
]

const BINGBONG_SOUND = new Audio("/rsrc/audio/bingbong.mp3");
const LEVER_SOUND = new Audio("/rsrc/audio/lever.mp3");
const SPINNING_SOUND = new Audio("/rsrc/audio/spinning.mp3");
SPINNING_SOUND.loop = true;
const WINNER_SOUND = new Audio("/rsrc/audio/winner.mp3");
WINNER_SOUND.addEventListener("ended", () => {
	localStorage.removeItem(LSKEY_SPINNING);
	light.classList.remove("slot-machine-light-alarm");
	handle.classList.remove("slot-machine-lever-handle-pull");
	ball.classList.add("slot-machine-lever-handle-ball-idle");
});

localStorage.removeItem(LSKEY_SPINNING);

function animateSpin(slot, i, t) {
	if (slot.classList.contains("spinning")) {
		slot.innerText = SLOT_VALUES[i % SLOT_VALUES.length];
		setTimeout(animateSpin, t, slot, i + 1, t);
	}
}

function endSpin(slot, last) {
	slot.classList.remove("spinning");

	const spins = Number.parseInt(localStorage.getItem(LSKEY_SPINS)) - 2;
	slot.innerText = PRIZES.includes(spins)
		? SLOT_VALUES[Math.sqrt(spins) - 1]
		: ((last && slot1.innerText === slot2.innerText)
			? SLOT_VALUES.filter(v => v !== slot1.innerText)
			: SLOT_VALUES).random();

	if (last) {
		SPINNING_SOUND.pause();
		machine.classList.remove("slot-machine-spinning");
		if (won()) {
			WINNER_SOUND.play();
			light.classList.add("slot-machine-light-alarm");
		} else {
			handle.classList.remove("slot-machine-lever-handle-pull");
			ball.classList.add("slot-machine-lever-handle-ball-idle");
			BINGBONG_SOUND.play();
			localStorage.removeItem(LSKEY_SPINNING);
		}
	}
}

function won() {
	return slot1.innerText === slot2.innerText && slot1.innerText === slot3.innerText;
}

function spin() {
	if (localStorage.getItem(LSKEY_SPINNING)) {
		console.warn("Wait for current spin to finish.");
		return;
	}
	localStorage.setItem(LSKEY_SPINNING, true);
	const spins = Number.parseInt(localStorage.getItem(LSKEY_SPINS) || 0) + 1;
	LEVER_SOUND.play();
	SPINNING_SOUND.play();
	localStorage.setItem(LSKEY_SPINS, spins);
	machine.classList.add("slot-machine-spinning");
	slot1.classList.add("spinning");
	slot2.classList.add("spinning");
	slot3.classList.add("spinning");
	handle.classList.add("slot-machine-lever-handle-pull");
	ball.classList.remove("slot-machine-lever-handle-ball-idle");
	if ((spins - 2) > 35 && !SLOT_VALUES.includes("💆")) {
		SLOT_VALUES.push("💆");
	}
	setTimeout(animateSpin, 130, slot1, 0, 130);
	setTimeout(animateSpin, 115, slot2, 1, 115);
	setTimeout(animateSpin, 100, slot3, 2, 100);
	setTimeout(endSpin, 1666, slot1);
	setTimeout(endSpin, 3333, slot2);
	setTimeout(endSpin, 5000, slot3, true);
	const phrase = MOTIVATION.indexOf(spins - 2);
	if (phrase > -1) {
		motivation.innerText = MOTIVATIONAL_PHRASES[phrase];
		motivation.style.animation = "none";
		setTimeout(() => { motivation.style.animation = ""; }, 100);
	} else if (spins - 2 > MOTIVATION[MOTIVATION.length - 1]) {
		motivation.innerText = "Sorry, you've already won all of the prizes. Come back next year.";
		motivation.style.animation = "none";
		setTimeout(() => { motivation.style.animation = ""; }, 100);
	}
}

function resetSpins() {
	localStorage.setItem(LSKEY_SPINS, 0);
}
