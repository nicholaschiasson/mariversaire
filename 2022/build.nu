#/usr/bin/env nu

def main [--release, command = build] {
	cp index.html build/
	cp ☕.html build/☕.html
	cp 💅.html build/💅.html
	cp 💆.html build/💆.html
	cp 🛬.html build/🛬.html
	cp -r rsrc build/
	cp -r src build/
}
