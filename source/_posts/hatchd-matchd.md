---
title: Hatchd Matchd Game
template: article.jade
date: 2015.05.01
category: work
keycolor: 79c9f9
thumb: /images/work/thumb-hatchdmatchd.jpg
full: /images/work/full-hatchdmatchd.jpg
summary: A memory game to shamelessly show off some front-end skills
---

The Hatchd team were chomping at the bit to play with some front-end tech that was a little too 'out there' to use on production builds.

We settled on a simple 8-bit style memory game, with the team as the stars (complete with HTML5 audio sound effects). For the graphics, SVG was used to full effect, along with some CSS3 animation to lift it a little.

SASS was intrumental in making the graphics, as we could produce everything 1:1 scale and enlarge it with a simple function, avoiding any confusion for the design team.

```
$scaleamount: 2;
@function scale($input,$amount:$scaleamount){
    $output: ($input * 2) + 'px';
    @return unquote($output);
}

.graphic{
  width: scale(2);
}
```

Have a play [here](http://matchd.hatchd.com.au)
