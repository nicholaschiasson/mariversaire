#/usr/bin/env nu

def main [--release, command = build] {
	cp *.html build/
	cp -r rsrc build/
	cp -r src build/
	cp CNAME build/
}
