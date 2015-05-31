title: "Simpler <srcset> with Jade"
date: 2015-05-31 17:42:08
layout: false
category: notes
summary: A helping hand with srcset with a Jade mixin
---

Responsive images, they're so hot right now. Two specs are being shouted from every available rooftop: srcset and picture.

Rather than being an either/or thing, each has a distinct function: picture is for art-directed images (ie: providing different styles of image for different sizes) and srcset is for providing the correct version of the same image for different sized devices.

I won't go into detail about srcset, [Eric Portis has done a fine job](https://ericportis.com/posts/2014/srcset-sizes/), but will talk about a useful jade mixin that can help make things simpler!

```
mixin image(src,alt)

    //- 1:
    //- Set initial vars

    //- Set counters
    -var i = 0;
    -var len = 0;

    //- Set empty vars for
    //- image src, sizes and srcset
    -var src = '';
    -var srcset = '';
    -var sizes = '';

    //- Grab values from mixin args
    -var alt = alt || false;
    -var imgname = src.split('.')[0]
    -var ext = '.' + src.split('.')[1]

    //- Get the length of the images object
    each val, index in site.data.images
        -len++;

    //- 2:
    //- Loop through images
    //- and get attributes
    each val, index in site.data.images
        //- Create srcset and sizes strings
        -srcset = srcset + imgname + '-' + index + ext + ' ' + val.width + 'w';
        -sizes = sizes + val.sizes;
        //- Use the first provided size
        //- as the default image
        if i === 0
            -src = imgname + '-' + index + ext;
        //- Comma sep srcset and sizes strings
        if i < (len - 1)
            -srcset = srcset + ',';
            -sizes = sizes + ',';
        //- Add a default size to the end
        //- of the sizes string
        if i === (len - 1)
            -sizes = sizes + ', 100vw'
        //- Add to the i counter
        -i++;

    //- 3.
    //- Set markup
    img(src=src srcset=srcset sizes=sizes alt=alt)
```

The mixin uses a json file to grab the image sizes:

```
{
    "small": {
        "width": "400",
        "sizes": "(min-width: 6.25em) 90vw"
    },
    "medium": {
        "width": "800",
        "sizes": "(min-width: 43em) 80vw"
    },
    "large": {
        "width": "1440",
        "sizes": "(min-width: 62.5em) 33.3vw"
    }
}
```

and is called like so:

```
+image('heywhat.png','A hey what')
```

To make the sizes for each image, Andi Smith's [Grunt Responsive Images](https://github.com/andismith/grunt-responsive-images) is a winner.

I've used this on my site, which is built on Hexo with jade templating.
