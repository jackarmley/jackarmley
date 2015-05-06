---
title: Love your JS
template: article.jade
date: 2011.07.19
category: article
summary: Crystal Hirschorn from the BBC, did a great talk about unit testing for JavaScript
---
After braving driving rain with the help of my stylish PVC man-mac, I attended a great London Web Standards talk called "Javascript Nuts 'n' Bolts" ([best twitter tag ever:]("http://twitter.com/#!/JeffVanCampen/statuses/93092234035077120") #lwsnuts)

As the name suggests, it focused on really understanding what makes Javascript tick, and in doing so how to build it better (as always, the great lws folks kept a live blog going throughout).

## My highlight: Addi Osmani on jQuery performance

Addi Osmani (@addyosmani) is part of the core jQuery team, and works at AOL, so his advice is pretty sound. He gave a very slick talk (Monopoly themed, naturally) that went through 10 ways to build your jQuery smarter, so it will run faster. For each example, he provided a URL to jsperf.com so attendees can see if his examples can walk the walk. He highlighted jsperf as a great way of seeing how the jQuery rules we write actually perform; they get a percentage score, a little like YSlow.

### Mind those fancy classes

Don't take the fact that jQuery can use all kinds of fancy pseudo and attribute selectors for granted. Even something as simple as targeting an element by it's class has an overhead as, given there isn't a fully supported native JavaScript selector for class (like getElementById for example) jQuery needs to make a more far-reaching call to understand what you need to do. In this vein, he recommend if you can, to use native JavaScript methods within your jQuery as jQuery doesn't need to do all sorts of work to understand it.

### Get your chains out

He promoted chaining as a better way of attaching a load of stuff to an element, as calling that element anew for each action just means more overhead. For example:

    $('http://v2.jackarmley.comp'http://v2.jackarmley.com)
    .dothis()
    .andthis()
    .andthis();

Is much better then:

    $('http://v2.jackarmley.comp'http://v2.jackarmley.com).dothis();
    $('http://v2.jackarmley.comp'http://v2.jackarmley.com).andthis();
    $('http://v2.jackarmley.comp'http://v2.jackarmley.com).andthis();

### Be nice to the DOM

Another great tip was that the DOM isn't a database to just load stuff onto willy-nilly. In other words, use methods like `append()` and `wrapInner()` sparingly. Injecting stuff into the DOM in this way has a significant performance overhead.

### Write D.R.Y style

He also recommended writing D.R.Y (Don't Repeat Yourself) style code, trying to rewrite a bit of code you've made in a smarter way, that makes less calls.

It was a great talk and he's released his slides. Also, I've no doubt there's more wisdom on his blog.

## Crystal Hirschorn on debugging your Javascript with QUnit

Also speaking was Crystal Hirschorn (@pand0ra83 ) from the BBC. She did a great talk about unit testing for JavaScript, focused on a tool called Qunit which was developed by the folks a jQuery (they'http://v2.jackarmley.comve been using it at the BBC for the last 2 years). Although known for being a great jQuery tool; it can be used to test any JavaScript code. I imagine in a large ecosystem like the BBC, consistency and a good, rapid  way to debug is an absolute must.

One of the most interesting things she mentioned was how teams of developers at the BBC write code our on whiteboards, and sketch things out to solve a complex problem. It just proves the paperless offlice is still a pipe dream!

She's linked to her slides, here.

## Tim Ruffles on backbone.js

Tim Ruffles (@timruffles) who works for Picklive (they make the fantasy football app) spoke about backbone.js; a Javascript framework. It was a really well-structured and informative talk but was a little too high-level for my front-end brain.
