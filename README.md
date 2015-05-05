Salemove developer API
========

### Set Up

 1. Install all dependencies: `bundle install`
 2. Start the test server: `bundle exec middleman server`

OR use the Dockerfile! (must install Docker first)

```shell
docker build -t slate .
docker run -d -p 4567:4567 slate
```

Access: <http://localhost:4567>.

*Note: if you're using the Docker setup on OSX, the docs will be
availalable at the output of `boot2docker ip` instead of `localhost:4567`.*


### Publishing to Github Pages

Compile to HTML, and push the HTML to Github pages: `rake publish`

[Syntax highlighting](http://rouge.jayferd.us/demo)
[Markdown help](https://github.com/tripit/slate/wiki/Markdown-Syntax)