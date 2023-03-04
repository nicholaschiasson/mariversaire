set shell := ["nu", "-c"]

default: build

build *ARGS: (children ARGS)
	mkdir build
	nu build.nu {{ARGS}}
	try {(ls */build | where type == dir).name | path dirname | each {|d| ^cp -frv $"($d)/build" $"build/($d)"}}

children *ARGS:
	try {(ls */justfile).name | path dirname | each {|d| just $"($d)/build" {{ARGS}}}}

clean:
	rm -rf build
	try {(ls */justfile).name | path dirname | each {|d| just $"($d)/clean"}}

serve *ARGS: (build ARGS)
	miniserve build --index index.html

new CHILD:
	mkdir {{CHILD}}
	"{{CHILD}}" \
		| path split \
		| reduce -f [] {|it, acc| $acc | append ([($acc | last), $it] | into string | path join)} \
		| each {|d| \
			ln -sf ../justfile $"($d)/justfile"; \
			if not ($"($d)/build.nu" | path exists) { \
				"#/usr/bin/env nu\n\ndef main [--release, command = build] {}" | save -f $"($d)/build.nu" \
			}; \
		}
