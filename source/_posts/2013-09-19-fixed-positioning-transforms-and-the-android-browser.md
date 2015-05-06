---
title: Fixed positioning, transforms and the Android browser
template: article.jade
date: 2013.09.19
category: article
summary: It appears Android's native browser doesn't apply CSS transforms (2D or 3D)
---
It appears Android's native browser doesn't apply CSS transforms (2D or 3D) if the element being transformed (or it's parent) has fixed positioning applied. Additionally, if you add backface-visibility: hidden to the element being transformed, this will also cause those transforms to be ignored. This isn't just on older Gingerbread phones, but goes all the way up to Jellybean.

Until cheap phones run a newer Android OS, or until Google retire their native Android browser in favor of Chrome, this issue will linger.

There's no real elegant fix for this, seeing as this is a fault with the browser, not a case of it not supporting one CSS property or another. I may try [this](https://github.com/barisaydinoglu/Detectizr) though
