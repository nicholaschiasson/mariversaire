# mariversaire

This is a static website to celebrate Marianne's birthday year after year.

Starting 2024 we're taking things to the next level with webassembly. The
previous years will remain as they are, but the ability to build and serve
wasm apps will be added thanks to the addition of a somewhat complex and
probably rather poorly designed build system.

Where before the entire repo was treated as the deployable static site package,
moving forward, it will be necessary to build and package things together,
since the repository will consist of some rust code. With that said, to serve
the site, a simple `miniserve .` will no longer work perfectly.

## Prerequisites

Let's go over what you'll need...

- [rust]
- [just]
- [nu]
- [trunk]
- A static file server. [miniserve] still works fine.

## Local Development

The workflow has changed a bit now. We still need to establish a better way to
watch files for updates, but as it stands this is the flow.

Build:

```
just build
```

Clean:

```
just clean
```

Build and serve:

```
just serve
```

Note you can pass `--release` to the build or serve jobs and they will build
all of the rust projects with the flag.

Also note that you can clean and build while the server is running, just fine.

[rust]: https://www.rust-lang.org
[just]: https://just.systems
[nu]: https://nushell.sh
[trunk]: https://trunkrs.dev
[miniserve]: https://github.com/svenstaro/miniserve
