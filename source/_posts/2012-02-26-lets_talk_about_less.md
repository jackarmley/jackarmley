---
title: Let's talk about LESS
template: article.jade
date: 2012.02.26
category: notes
summary: Recently, I discovered LESS and went about utilizing it on my site to figure out what all the fuss was about
---


Recently, I discovered LESS and went about utilizing it on my site to figure out what all the fuss was about. I've only dipped my toes in really, but have gained some interesting insights.

I've spent lots of time with CSS, all the way from when a rounded corner box took 40 lines of code to build up till now, when we can attach multiple drop shadows to an element and animate it over time. Naturally then, when something comes along that claims to improve the way an author can work with CSS I immediately want to wrestle it to the floor and put it in a headlock.

LESS claims to be this magic bullet. For those not familliar with it, it introduces progamming logic to CSS allowing the author - amongst other things - &nbsp;to set variables and determine an object's appearance with clever math.&nbsp;

Ok, this all sounds very cool but, why obfsucate CSS beneath a layer of clever? It does perfectly well on it's own. It seperates style from structure on a webpage, it contains a zillion ways to select an element, and great ways to set layered rules through it's cascade.&nbsp;

This is what I felt however, you can't knock anything until you've tried it (except beef jerkey - don't even bother), so I decided to give it a go.

## How I set up

LESS cannot be read by a webpage as it is, it has to be converted back into good ol' CSS first. This can be done either on the fly server-side or client-side, or the file can be compiled on your computer before you send it on it's way. As I didn't want to put any additional dependancies on my site - or overhead on the server - I decided it would be best to compile it locally.

On my mac at work, I use the <a href="http://incident57.com/less/">LESS app</a>&nbsp;and on my (ahem) Windows PC I use <a href="http://wearekiss.com/simpless">SimpleLESS</a>&nbsp;(I've also heard good things about <a href="http://incident57.com/codekit/">CodeKIT</a>).

To use these apps you simply tell them a file or folder to listen out for and then, whenever you save your LESS file it will be automatically compiled back into CSS for you. During this process, the app will error-check your code too.

Once you've got this you're good to go. Simply create a file with the suffix *.less* and start writing CSS. How much LESS you utilize (if any at all) is entirely up to you.

## Let's get together

The first thing I tried is the @import function. In pure CSS, you can make a stylesheet more manageable by spiltting it out into several smaller ones, which are then referenced through a master file. This approach however, has been dropped by any web designer worth his/her salt. Whilst it may make things more maneagable, every new @import is another thing your browser has to download; not good.

However, with LESS this defunct practice is suddenly relevent again. Instead of simply referencing files declared with an @import call, LESS will pull the code in from all those files and assemble them in the master file to make one big CSS file (think <a href="http://www.youtube.com/watch?v=7mQuHh1X4H4">megazord</a>&nbsp;and could I just say, those arm gestures are <em>so </em>unneccesary).

    @import "less/fontface.less";&#10;@import "less/typography.less";&#10;@import "less/links.less";&#10;@import "less/images.less";<

As you can see, the syntax isn't that dissimilar to regular CSS (you can even leave out the .less extension), but it generates way more awesome.

## Variables

As hard as I try to be stringent with my CSS it can be so difficult to keep clear over what vertical rhythm I've set for text blocks, or what colours I've set for disperate elements. Well, variables aim to make that headache a thing of the past (that was my best <a href="http://www.youtube.com/watch?v=G-YXgFv2IN4">infomercial</a> voice).

Instead of setting a text or link colour, and having to rember what you set, you can define it once and then use it over and over. Need to change the colour? You guessed it - you'd only need to change it in the one place.

### For example

    @recessive: #666;&#10;small{color:@recessive;font-size:1em;}&#10;cite{color:@recessive;font-size:0.5em;}

You can of course, set variables for any property you want (think: font-size. line-height etc&hellip;).

## Let's add some math

Variables are great, and can be made even greater by combining them with *operations* (back to school people!). They let you change a variable's value once it's defined using math(s). This was particularly tempting to me, as I wanted to set-up a baseline grid for my text.

    /*Set base font size*/
    @base-fontsize: 1em;
    /*Set base line-height, by multiplying base font-size by 1.5*/
    @base-lineheight: @base-fontsize * 1.5;
    /*--Set vertical spacing units--*/
    /*Divide base by 4*/
    ;@vunit-qtr_space: @base-fontsize / 4;
    /*Divide base by 2*/
    @vunit-half_space: @base-fontsize / 2;
    /*multiply base by 2*/
    @vunit-dbl_space: @base-fontsize * 2;
    /*multiply base by 2.5*/
    @vunit-lg_space: @base-fontsize * 2.5;

With this code, I'm building new variables from an existing one, but these operations can be done in the middle of the stylesheet it you wish (but hey, who wants to do math all the time?).

## Mix-in' it up

The last thing I explorered were mixins. Essentially, they allow you to define a set of properties with one simple function. Let's take a look at an example:

    /*Define a mixin for border-radius and give it a default value of 0.5em*/
    .border-radius (@radius: 0.5em) {
        border-radius: @radius;
        -moz-border-radius: @radius;
        -webkit-border-radius: @radius;
    }
    /*Call the mixin*/
    .roundbox{
        .border-radius;
    }

Ooh, that's better than having to write out all those vendor prefixes each time eh? Also, it means that when it's time to chuck out those prefixes, you can just remove them from the one mixin and BAM! Your stylesheet will thank you.

## Piecing it all together

&nbsp;Having looked in to all these glitzy wonders, I then had to put it all together in a meaningful way.

1. Within my /css/ folder I put the master LESS&nbsp;file, and told my compiler to listen out for when that changed. I called it the same name as my original stylesheet, and added @import calls to a bunch of other LESS&nbsp;files I had made, by splitting my original CSS file up.</li>
2. Amongst my LESS files I created one called p<em>redefined.less</em>. Here, I added all my predefined variables and mixins.</li>
3. I then went though my chunked out styles, replacing regular CSS values with my new shiny variables and mixins. For clarity, at this point I also changed my CSS to multi-line (I'm a single line guy originally but it was getting unmanaegable, what with prefixes, CSS3 gradients and&nbsp;multiple drop shadows).</li>
4. Whilst going through and adding my variables, I realised they could potentially become difficult to remember. To combat this, I made myself a style guide, where I threw references to all my variables and mixins, and what code they spat out.</li>

If you're curious, all the LESS files are on [github.](https://github.com/jackarmley/mysite/tree/master/current/v2/css)

## Note to self

After I had implemented all these styles, I realised it may be pretty easy for me to forget all the variables, mixins and stacked classes I had put in place. To remedy this, I made a <a href="http://www.jackarmley.com/styleguide">style guide</a>. Thus far, I've found this immensly useful for quickly checking what variables and mixins to use.

## To conclude

At this point (having just dipped my toes in), I feel LESS is an extermely useful layer on top of CSS.

Especially so, when working on huge builds where a large, single stylesheet can get unwiedly and difficult for a developer unfamilliar with the CSS to update.

