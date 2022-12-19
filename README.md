# mariversaire

This is a simple static website (for now) to celebrate Marianne's birthday year
after year.

For local development, all you need is a basic static file server which
supports serving the `index.html` file when requesting a directory (because I
don't like seeing `index.html` in the URL bar, sue me).

I use [miniserve](https://github.com/svenstaro/miniserve) for this.

Running it for this project is as simple as

```
miniserve . --index index.html
```
