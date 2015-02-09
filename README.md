# Salemove developer api

## Running locally

Bundle the gems and then run

```
bundle exec jekyll serve
```

## Making changes
The HTML files are all generated automatically. Make all changes to the markdown files.

The root folder contains the main markdown files, which takes pieces from the ```_include``` folder and puts them together.

The _include folder contains the actual content of the pages. For example, if you want to change operator api description, you should change ```_includes/operator_api.md```.

After you have made the changes, you should compile the markdown files into html, using jekyll

```
bundle exec jekyll serve
```

## Changing the root page or overview page
The root page is a special case and currently requires an extra step to change it. Currently, the root page and overview page are identical.

Once you have changed and compiled the overview page, then you should copy the ```_site/overview.html``` code and also put the changes to the ```./index.html``` and ```_site/index```.html to make sure that the root page is changed.
