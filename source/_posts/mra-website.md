---
title: MRA website
template: article.jade
date: 2014.11.05
category: work
keycolor: c5353f
thumb: /images/work/thumb-mra.jpg
full: /images/work/full-mra.jpg
summary: Bringing renewed vibrancy to MRA's online home
---

MRA (the Metropolitan Redevelopment Authority) needed a punchy online prescence, both informative and vibrant in equal measure and able to work perfectly on all devices and screen sizes.

They are a government organization, steering all the major place-making projects for a growing Perth. Being a government site accessibility was vitally important, beyond just checking off a WCAG 2.0 ticklist.

They are behind all the major building projects in Perth, all of which had seperate microsites. 

A major goal was to bring all these disperate microsites into the new MRA site, and to make it clear MRA was behind them all.

## Build insight

Theming was all handled with SASS maps (released in version 3). Using maps, the logos and colours for each theme could be handled centrally, and called with a simple function.

```
// Theme map
$themes:(
    theme1:(
        logo : '../images/logo.jpg',
        keycolor: 'white',
        bgcolor: 'orange'
    ),
    theme2:(
        logo : '../images/logo2.jpg',
        keycolor: 'grey',
        bgcolor: 'green'
    )
);

// Simple function to grab a property
@function themeprop($prop,$theme,$map:$themes){
    $theme: map-get($themes,$theme);
    @return unquote(map-get($theme,$prop));
}

// Demo of usage
.theme1-logo{
    background-image: url('#{themeprop(logo,theme1)}');
    color: themeprop(keycolor,theme1);
}

```

## Built with

- HTML5
- SASS
- jQuery
- Plone
