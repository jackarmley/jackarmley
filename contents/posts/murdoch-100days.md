---
title: Murdoch Universiy 100 Ways to Make a Difference Campaign
template: article.jade
date: 2014.11.19
category: work
hero_image: /assets/images/work/full-murdoch100ways.jpg
summary: The website was a vehicle for the images, and a way to give them context and a seperately branded home away from Murdoch's Instagram account.
---

To help motivate their postgrads through the final summer push, Hatchd worked with Murdoch on an Instagram-driven campaign where students can tag and submit inspirational quotes through Instagram.

The website was a vehicle for the images, and a way to give them context and a seperately branded home away from Murdoch's Instagram account.

The main focus was to display and share the images, so the build had to be as lightweight as possible to conserve page weight.

## Build insight

For tighter size control within the image grid, I used floats over flexbox, implemented through a SASS map. With this technique, I could define how many images per row should be used at specific widths, without having to create dozens of arbritrary sitewite breakpoint variables.

```
// Seperate sizing for the grid per relevent view,
// so it won't affect the site's media queries
$gridsizes:(
    600: 2,
    900: 3,
    1200: 4,
    1400: 5,
    1700: 6
);

// Apply sizes to grid
.mediagrid-item{
    @each $size,$rownum in $gridsizes{
        @media screen and(min-width: #{$size}px){
            @if ($size == 600){
                float: left;
            }
            width: (100% / $rownum);
        }
    }
}
```

## Built with

- HTML5
- SASS
- jQuery
- Plone

