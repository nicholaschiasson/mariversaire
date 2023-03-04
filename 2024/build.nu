#/usr/bin/env nu

def main [--release, command = build] {
	trunk $command (if $release {[--release]} else {[]}) -d build --public-url "/2024/"
}
