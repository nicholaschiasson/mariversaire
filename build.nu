#/usr/bin/env nu

def main [--release, command = build] {
	cp -fv *.html build/
	cp -rfv rsrc build/
	cp -rfv src build/
	cp -fv CNAME build/
}
