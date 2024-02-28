# To Do

- [x] Just use classes for entities
- [x] Modularize - put code into different files
- [x] Make Player draw on top
- [x] Make non-player entities keep a reference to player
- [x] Make non-player entities perform collision detection with player
- [x] Abstract "jump" or "bounce" from player update method
	- [x] Perhaps have a collide method on player that takes the other entity and matches on its type
- [x] Display score
- [x] Implement moving platform
	- [x] Simply side to side across entire screen
- [x] Implement disappearing platform, disappears after landing once on it
- [x] Implement fallthrough platform, which will just break and allow the player to fall through it upon landing on it
- [x] Implement content manager
- [x] Implement tile incremental distance increase to a limit
- [x] Make player collision with bottom of screen a "Game Over"
- [x] Art assets
	- [x] Platforms
		- [x] Static
		- [x] Moving
		- [x] Vanishing
		- [x] Breaking
	- [x] Player
- [x] Fix collision detection when crossing screen boundary
- [x] Canvas boarder art
- [x] Implement scene manager
	- [x] Start scene
		- [x] Play button
		- [x] Options button
	- [x] Options scene
		- [x] Toggle sounds button
		- [x] Toggle music button
	- [x] Game scene
	- [x] Game Over scene
		- [x] Display leaderboard
		- [x] Try Again button
		- [x] Options button
- [x] Sound assets
	- [x] Player mews death
	- [x] Static and moving platform bounce
	- [x] Vanishing platform whoosh
	- [x] Breaking platform crack
	- [x] Music
		- [x] Mitski - My Love Mine All Mine
		- [x] Bilmuri - Vascular Demi-Goth
		- [x] Eels - I Need Some Sleep
		- [x] The Cranberries - Dreams
		- [x] Bilmuri - Keepinitbeefy
		- [x] The Weeknd - Popular
		- [x] Justin Hurwitz - Mia & Sebastian's Theme
		- [x] Newjeans - ETA
- [x] Implement epic win condition
- [x] Preload some high scores
- [x] Manage score
	- [x] Reset between games
	- [x] Save leaderboards
	- [x] Load leaderboards
- [x] Title
	- [x] Grimpe aux griffes!
	- [x] Beta Bounce!
	- [x] Klimb Kitty!
	- [x] Campus Cat!
	- [x] Miauliversaire!
- [ ] Implement items
	- [ ] Spring, high bounce
	- [ ] Spring shoes, three big bounces
	- [ ] Helicopter hat, fly for a few seconds
- [ ] Implement tile spawning patterns
- [ ] Implement death animations
- [ ] Fix movement speed, should be relative to delta time
- [ ] Make scaling and speeds relative based on canvas size
- [ ] Implement enemies
	- [ ] One touch and game over
	- [ ] Jump on their head to kill them and bounce
	- [ ] Basic one, sitting in place
	- [ ] Floating side to side one
- [ ] Add gun to shoot enemies
- [ ] Make canvas border width (and outset) relative to viewport size
- [ ] Optimize asset sizes
- [ ] Support mobile
- [ ] Wait for things to load