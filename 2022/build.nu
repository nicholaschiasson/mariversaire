#/usr/bin/env nu

def main [--release, command = build] {
	cp index.html build/
	cp ☕.html build/
	cp 💅.html build/
	cp 💆.html build/
	cp 🛬.html build/
	cp -r rsrc build/
	cp -r src build/
}
