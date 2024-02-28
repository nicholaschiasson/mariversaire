default: build

outdir := "build"

[unix]
build *ARGS: b (c "2022" "build" ARGS) (c "2023" "build" ARGS) (c "2024" "build" ARGS) && (o "2022") (o "2023") (o "2024")
	rsync -uv *.html {{outdir}}/
	rsync -ruv rsrc {{outdir}}/
	rsync -ruv src {{outdir}}/
	rsync -uv CNAME {{outdir}}/

[unix]
clean: (c "2022" "clean") (c "2023" "clean") (c "2024" "clean")
	rm -fr {{outdir}}

serve *ARGS: b
	miniserve {{outdir}} --index=index.html &
	just watch {{ARGS}}

watch *ARGS:
    watchexec -e html,css,js just build

[private]
[unix]
b:
	mkdir -p build

[private]
c DIR RECIPE *ARGS:
	just {{DIR}}/{{RECIPE}} {{ARGS}}

[private]
[unix]
o DIR:
	rsync -ruv {{DIR}}/{{outdir}}/ {{outdir}}/{{DIR}}

