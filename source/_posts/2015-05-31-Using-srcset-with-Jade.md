title: "Simpler <srcset> with Jade"
date: 2015-05-31 17:42:08
category: notes
summary: A helping hand with srcset with a Jade mixin
---

Responsive images, they're so hot right now. Two specs are being shouted from every available rooftop: srcset and picture.

Rather than being an either/or thing, each has a distinct function: picture is for art-directed images (ie: providing different styles of image for different sizes) and srcset is for providing the correct version of the same image for different sized devices.

I won't go into detail about srcset, [Eric Portis has done a fine job](https://ericportis.com/posts/2014/srcset-sizes/), but will share this useful jade mixin that makes it simpler to implement:

<script src="https://gist.github.com/jackarmley/d5a8f76ea85ff7381111.js"></script>

The mixin takes two arguments: an image source and its alt text. The sizes needed to construct the srcset parameters are passed in using a seperate JSON file. You'll see it called in the mixin as `site.data.images`.

<script src="https://gist.github.com/jackarmley/4db26c1bb43220596b84.js"></script>

Given as I use hexo (a flat file cms) to generate my site, it has JSON support built in. If you're not using hexo, the jade API can deal with JSON files. It's super easy with a build system like grunt (see the [data](https://github.com/gruntjs/grunt-contrib-jade#data) option on the grunt-contrib-jade plugin).

To make the sizes for each image, Andi Smith's [Grunt Responsive Images](https://github.com/andismith/grunt-responsive-images) is a winner.

It's called like so:

```
+image('myimage.png','A sample image, with not much going on')
```

As srcset is still patchy on the support front, I'd like to find a way to fallback to something like the BBC's [imager.js](https://github.com/BBC-News/Imager.js/), but for now it's working well. If you use it and come up against any issues, feel free to ping me your fixes!
