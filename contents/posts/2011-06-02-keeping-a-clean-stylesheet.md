---
title: Keeping a clean (style) sheet
template: article.jade
date: 2011.06.02
category: article
summary: A stylesheet may seem small, but the kilobytes can add up. Sticking to a few simple rules can help keep the weight off
---

A stylesheet may seem small, but the kilobytes can add up. Sticking to a few simple rules can help keep the weight off.

##Don't create empty rules, or comment out un-needed ones

It's very tempting when creating styles to open empty rules for HTML elements you've created, like the below, which can be filled in later:

	.video_container{}

I find that, often these empty rules get forgotton about ad end up lingering in the stylesheet. Although they contain no actual rules, they still need to be processed by the browser so I'd always recommend:

only creating new rules if you're going to use them,

In the same way, commented-out rules like:

	/*video_container{padding:10px;}*/

can be forgotton about. If these types of rules may be needed later, I'd recommend putting them in a fresh text document as a backup, so you'll have them if needed.

##Avoid unneccesary selectors

When the rules stack up, it can be difficult to navigate the stylesheet, and one way to keep tabs on what rules refers to where on the site, is to prefix the rule with the name of the element, or use descendant selectors to indicate where a rule belongs; like so:

	body div#content-wrapper div#content-main div.panel h2{
		font-size:16px;
		line-height:18px;
	}

This rule will work fine, but the browser has a lot of work to do to process it. Also, due to the amount of selectors used the rule has a really high specicifity (a value of 215 to be precise), which means that, if it needs to be overridden elsewhere in the stylesheet even more selectors will have to be used, in turn adding more weight and complexity to the stylesheet.

To avoid this, I use the minimal amout of selectors neccesary to give the element I'm targeting a unique set of styles, which using the above example would be:

	.panel h2{
		font-size:16px;
		line-height:18px;
	}

If you've quite a few rules and you want to keep track of what beongs to what, rather than using lots of elements and descendent selection, I find it better to indent them:

###Before

	body{
		height:100%;
		background-color:#fff;
	}

	body #content-wrapper{
		width:960px;
		margin:0 auto;
	}

	body #content-wrapper #content-main{
		width:600px;
		float:left;
	}

	body #content-wrapper #content-main .panel{
		padding:20px;
		background-color:#ccc;
	}

	body #content-wrapper #content-main .panel h2{
		font-size:1.2em;
		margin:0 0 .5em 0;
		color:#000;
	}

	body #content-wrapper #content-main .panel p{
		font-size:1em;
		margin:0 1em 0;
		color:#333;
	}

###After

	body{
		height:100%;
		background-color:#fff;
	}

	#content-wrapper{
		width:960px;
		margin:0 auto;
	}

	#content-main{
		width:600px;
		float:left;
	}

	.panel{
		padding:20px;
		background-color:#ccc;
	}

	.panel h2{
		font-size:1.2em;
		margin:0 0 .5em 0;
		color:#000;
	}

	.panel p{
		font-size:1em;
		margin:0 1em 0;
		color:#333;
	}

You'll notice that all the CSS rules I've written are on one line; this helps to keep the stylesheet smaller and makes it easier to scan throught. Of course this is purely preference; I find it easier to work with but of course, others may prefer to put each rule on a new line.

##Group shared properties together

Another thing I tend to do, is to group together rules I know will be needed time and again throughout the stylesheet; what's the point of re-declaring something over and over again? To group multiple selecters behind one rule again, makes the stylesheet lighter and easier to manage.

So for example this...

	h1{
		font-family:Arial,helvetica,sans-serif;
		font-weight:bold;
		color:#333;
		font-size:2em;
	}

	h2{
		font-family:Arial,helvetica,sans-serif;
		font-weight:bold;
		color:#333;
		font-size:2em;
	}

	h3{
		font-family:Arial,helvetica,sans-serif;
		font-weight:bold;
		color:#333;
		font-size:2em;
	}

Becomes this:

	h1,h2,h3{
		font-family:Arial,helvetica,sans-serif;
		font-weight:bold;
		color:#333;
		font-size:2em;
	}

Additionally, if I want to declare a new size for each font, I could re-declare this new rule underneath, along with other unique properties, like so:

	h1,h2,h3{
		font-family:Arial,helvetica,sans-serif;
		font-weight:bold;
		color:#333;
	}

	h1{
		font-size:2em;
		margin:0 0 0.25em 0;
	}

	h2{
		font-size:1.5em;
		margin:1em 0 0.5em 0;
	}

	h3{
		font-size:1.2em;
		margin:0.75em 0 0.5em 0;
	}

##Extending this thinking

Of course, here I've started to foray a little into Modular (or object-oriented) CSS; the idea of using reusable chunks of pre throughout a site in a really planned and systematic way. I've writtenbriefly about this on the site, but I'd recommend going to [Nicole Suillivan's github repo]("github.com/stubbornella/oocss/wiki") for more info (she's a champion of modular CSS; she even managed to cut Facebook's mass of stylesheets down to size). I think, with an appropriate balance of modular and github.com/stubbornella/oocss/wikidecendant-selection style CSS a site's styles can become much more lightweight and easy to manage. I've only scratched the surface here so, like on any good topical news programme, I'd love to hear your thoughts (and how many people hate CSS indenting; I hear quite a few).
