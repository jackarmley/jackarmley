---
title: Creating Snowcone
template: article.jade
date: 2012.01.10
category: work
keycolor: 483C47
summary: We wanted to ensure that our projects wouldn't be swayed by a preset icon style. If we made our own, it could be customized for each new project.
thumb: /images/work/thumb-snowcone.gif
full: /images/work/slide-snowcone_01.gif
---
At Tangent Snowball, our focus on all website builds is on speed and flexibility. With this in mind, we set out to produce an icon set using @fontface, where icons could be scaled or coloured without the need for any additional graphics.

We realised there were existing icon sets out there using a similar technique (Pictos by Drew Wilson and Iconic by P.J. Onori to name a few) but we wanted to ensure that our projects wouldn't be swayed by a preset icon style. If we made our own, it could be customized for each new project.

We lovingly created each icon in Adobe Illustrator, then built them as an icon set using the Glyphs app. We then took the exported Truetype file, and built it as a webfont using the FontSquirrel @font-face generator.

To incorperate them into a website we utilized the CSS :before property. This ensured each icon could be added without any additional HTML markup needed.
