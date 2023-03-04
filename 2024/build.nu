#/usr/bin/env nu

def main [--release, command = build] {
	trunk -v $command (if $release {[--release]} else {[]}) -d build --public-url "/2024/"
}
