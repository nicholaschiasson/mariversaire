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
- [ ] Implement death animations
- [ ] Implement tile incremental distance increase to a limit
- [ ] Implement tile spawning patterns
- [ ] Make player collision with bottom of screen a "Game Over"
- [ ] Implement items
	- [ ] Spring, high bounce
	- [ ] Spring shoes, three big bounces
	- [ ] Helicopter hat, fly for a few seconds
- [ ] Implement enemies
	- [ ] One touch and game over
	- [ ] Jump on their head to kill them and bounce
	- [ ] Basic one, sitting in place
	- [ ] Floating side to side one
- [ ] Implement scene manager
	- [ ] Start scene
		- [ ] Play button
		- [ ] Options button
	- [ ] Options scene
		- [ ] Toggle sounds button
		- [ ] Toggle music button
	- [ ] Game scene
	- [ ] Game Over scene
		- [ ] Display leaderboard
- [ ] Art assets
- [ ] Sound assets