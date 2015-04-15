---
title: Murdoch Universiy 100 Days Campaign
template: article.jade
date: 2014.11.19
category: work
---

To help motivate their postgrads through the final summer push, Hatchd worked with Murdoch on an Instagram-driven campaign where students can tag and submit inspirational quotes through Instagram.

The website was a vehicle for the images, and a way to give them context and a seperately branded home away from Murdoch's Instagram account.

The main focus was to display and share the images, so the build had to be as lightweight as possible to conserve page weight.

## Build insight

The image grid was the main focus for the site. To get fine control over the image sizes, I used the old float/width technique over flexbox. However, given I needed quite a few bespoke media queries, I used a SASS map and an each loop to easily define how many images per row should be used at each breakpoint.

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
