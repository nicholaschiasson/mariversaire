# mariversaire

This is a static website to celebrate Marianne's birthday year after year.

Last year, I updated this readme and claimed that starting in 2024 this site
would use Rust and WebAssembly. In the end, I backpedaled on that, choosing
vanilla JavaScript yet again.

With that said, I simplified the build procedure a little bit, but in the
future, adding wasm-based apps should still be possible.

Everything is operated still using justfile. You no longer need that
actually installed on your system though.

Thanks to nix package manager, I managed to remove all dependencies.

## Prerequisites

Let's go over what you'll need...

- [nix]
- [nix flakes]

That's really it.

## Local Development

Before doing anything, you need to build the development shell:

```
nix develop
```

That will expose all the tooling you need. From there, you can use justfile
to operate the repo.

Build:

```
just build
```

Watch for changes:

```
just watch
```

Clean:

```
just clean
```

Build and serve, watching for changes and hot reloading:

```
just serve
```

[nix]: https://nixos.org/download.html
[nix flakes]: https://nixos.wiki/wiki/Flakes#Enable_flakes
