Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
}

const LSKEY_SPINNING = "spinning";
const LSKEY_SPINS = "spins";

const PRIZES = [1, 9, 25, 36];
const SLOT_VALUES = ["💅", "🌱", "🧋", "🍸", "🛬"];

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
	"Do you think I would add some easter egg or something like that?",
	"Don't you know how lazy I am? Why would I make a fourth prize?",
	"This is beginning to get exessive, don't you think?",
	"Alright, fine. Due to your persistance, I will grant you a fourth prize...",
	"Psyche! Haha totally fooled you didn't I?",
	"Okay, now I feel bad, here, you can have your prize.",
]

const SPINNING_SOUND = new Audio("rsrc/audio/spinning.mp3");
SPINNING_SOUND.loop = true;
const BINGBONG_SOUND = new Audio("rsrc/audio/bingbong.mp3");
const WINNER_SOUND = new Audio("rsrc/audio/winner.mp3");
WINNER_SOUND.addEventListener("ended", () => {
	localStorage.removeItem(LSKEY_SPINNING);
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
	const s1 = slot1 || document.getElementById("slot-1");
	const s2 = slot2 || document.getElementById("slot-2");
	const s3 = slot3 || document.getElementById("slot-3");

	const spins = Number.parseInt(localStorage.getItem(LSKEY_SPINS)) - 2;
	slot.innerText = PRIZES.includes(spins)
		? SLOT_VALUES[Math.sqrt(spins) - 1]
		: ((last && s1.innerText === s2.innerText)
			? SLOT_VALUES.filter(v => v !== s1.innerText)
			: SLOT_VALUES).random();

	if (last) {
		SPINNING_SOUND.pause();
		if (won()) {
			WINNER_SOUND.play();
		} else {
			BINGBONG_SOUND.play();
			localStorage.removeItem(LSKEY_SPINNING);
		}
	}
}

function won() {
	const s1 = slot1 || document.getElementById("slot-1");
	const s2 = slot2 || document.getElementById("slot-2");
	const s3 = slot3 || document.getElementById("slot-3");

	return s1.innerText === s2.innerText && s1.innerText === s3.innerText;
}

function spin() {
	if (localStorage.getItem(LSKEY_SPINNING)) {
		console.warn("Wait for current spin to finish.");
		return;
	}
	const s1 = slot1 || document.getElementById("slot-1");
	const s2 = slot2 || document.getElementById("slot-2");
	const s3 = slot3 || document.getElementById("slot-3");
	const m = motivation || document.getElementById("motivation");
	const spins = Number.parseInt(localStorage.getItem(LSKEY_SPINS) || 0) + 1;
	SPINNING_SOUND.play();
	localStorage.setItem(LSKEY_SPINS, spins);
	localStorage.setItem(LSKEY_SPINNING, true);
	s1.classList.add("spinning");
	s2.classList.add("spinning");
	s3.classList.add("spinning");
	if (spins > 35 && !SLOT_VALUES.includes("💆")) {
		SLOT_VALUES.push("💆");
	}
	setTimeout(animateSpin, 130, s1, 0, 130);
	setTimeout(animateSpin, 115, s2, 1, 115);
	setTimeout(animateSpin, 100, s3, 2, 100);
	setTimeout(endSpin, 1000, s1);
	setTimeout(endSpin, 2000, s2);
	setTimeout(endSpin, 3000, s3, true);
	const phrase = MOTIVATION.indexOf(spins - 2);
	if (phrase > -1) {
		m.innerText = MOTIVATIONAL_PHRASES[phrase];
		m.style.animation = 'none';
		setTimeout(() => { m.style.animation = ''; }, 10);
	}
}
