---
title: 'Snippet: pure CSS corner ribbon'
template: article.jade
date: 2013.04.02
category: article
summary: In the quest to create components that are resolution-agnostic, I've attempted an image-less corner ribbon, that purely uses CSS.
---
Little ribbons that wrap round panels and images are a feature I see cropping up on many sites. In the quest to create components that are resolution-agnostic, I've attempted an image-less corner ribbon, that purely uses CSS.

It relies primarily on css3 transform, and generated content, and on css3 gradients for embellishments, so browsers not supporting one or all of these could be served either a graphic or a simplified version of the ribbon.

I've played about a fair bit in the demo gist, but no worries - I've used comments to clarify which CSS declarations are purely decorative, and those that do the heavy lifting.

Have a gander and if improvements can be made, I'd love to hear some suggestions!

**FYI: This demo only works in chrome, as I was too lazy to add all the prefixes**

## Demo
[See the code, and a demo on dabblet](http://dabblet.com/gist/5268784)
