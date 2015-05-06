Salemove developer API
========

NB! If you need to modify anything, work on **master** branch. To apply updates, run `rake publish`. It will compile and push the changes to the gh-pages branch, which is displayed to the world!

# Add new page

 1. create new file to "source/includes/" folder with underscore "_" in front e.g. "_new_file.md"
 2. add the file name to the top of the "source/index.md" file after `includes:` e.g. "- new_file"

 OR

 1. add one hashtag "#" to the beginning of the line, making it H1 type heading, making it to appear in the menu. 

 To make changes to existing pages, modify according .md files in previously mentioned locations!

### Test in local machine
 1. Clone the master branch
 2. Install all dependencies: `bundle install`
 3. Start the test server: `bundle exec middleman server`

OR use the Dockerfile! (must install Docker first)

```shell
docker build -t slate .
docker run -d -p 4567:4567 slate
```

Access: <http://localhost:4567>.

*Note: if you're using the Docker setup on OSX, the docs will be
availalable at the output of `boot2docker ip` instead of `localhost:4567`.*


### Publishing to Github Pages

To compile .md to HTML and push the HTML to Github pages, run: `rake publish`

This will compile and upload the site updates to the branch **gh-pages**.

### Might come in handy

*[Syntax highlighting](http://rouge.jayferd.us/demo)
*[Markdown help](https://github.com/tripit/slate/wiki/Markdown-Syntax)