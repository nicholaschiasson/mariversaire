#/usr/bin/env nu

def main [--release, command = build] {
	cp -v *.html build/
	cp -rv rsrc build/
	cp -rv src build/
}
