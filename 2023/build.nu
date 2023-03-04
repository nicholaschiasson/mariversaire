#/usr/bin/env nu

def main [--release, command = build] {
	^cp -fv *.html build/
	^cp -frv rsrc build/
	^cp -frv src build/
}
