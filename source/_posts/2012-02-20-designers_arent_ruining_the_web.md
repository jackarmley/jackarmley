---
title: Designers aren't ruining the web
template: article.jade
date: 2012.02.20
category: notes
summary: Setting good client expectations depends on good communication between all parties responsible for creating a website; an enviroment that facilitates this and encourages people to ask questions can make this possible
full: /images/blog/artimg-designersweb.jpg
---

John Naughton, a writer at the observer recently wrote an article entitled [Graphic designers are ruining the web.]("http://www.guardian.co.uk/technology/2012/feb/19/john-naughton-webpage-obesity") Hang on John, surely that's a bit unfair. Nothing can be that black and white.

The crux of his article was that, due to the demands a rich graphic design places on the web designer (such as custom fonts, gradients, drop shadows etc...) web pages have mutated from simple, clear sources of information to hefty, kilobyte-heavy broadband bill eaters.

He feels design elements add bloat, and web-pages should remain true to the founding idea of what a website should be - an accessable, clear source of information.

This is true: if a website is supposed to convey textual information than it should be engineered for that purpose. However, websites have moved from being linked documents to becoming music players, televisions, text editors, image editors, mobile hard-drives and even conference call software. The same expectations and ideals may be hard to apply if a website is geared towards this kind of use case.

That's not to say however, that websites bringing rich content or facilitating heavy interaction can't still be light, relative to their size. The tools we use to create websites have improved dramatically over the last few years.

John included this factoid:

> From 2003 to 2011, the average web page grew from 93.7kB to over 679kB

Certainly the sites I've built have gone the way of a yo-yo diet; a few years ago, in order to replicate a simple rounded box a bucketload of unsemantic markup and additional resources needed to be stuffed into the site. That said, the web community is agile and flexible, and CSS - our language for enhancing HTML with visual flair - has evolved to address a multitude of commonly-sought visual flourishes. For example:

##A rounded box, c.2008

To make a rounded box, back before Avatar came out and when the iPhone4 was just a pipe dream, you needed 4 HTML elements on your page. This was to ensure you had a place to hang each rounded corner image that was used to make the box.

	<div class="rounded">
	 <div class="outer">
	  <div class="inner">
	   <div class="content">
	    <p>Hey y'all, check out these curves</p>
	   </div>
	  </div>
	 </div>
	</div>

Then, we had to make four images (in the worst case) and attach one to each of the div elements to give the box its curvy appearance:

	.rounded{background:blue url('topleft.gif') no-repeat top left;}
	.outer{background:transparent url('topright.gif') no-repeat top right;}
	.inner{background:blue url('bottomleft.gif') no-repeat bottom left;}
	.content{background:blue url('bottomright.gif') no-repeat bottom right;}

Then, what if you want to put the box on a textured background? Can't be done. How about different colours? That needs new graphics, hence more bloat.

##A rounded box, c.2012

Fast forward to now (wear your two ties, and your pockets inside out), and the tiny elves that evolve CSS have "towed the cowpaths" so to speak, and have ensured the language has tools for most of these scenarios. Want a rounded box? No problem:

	<div class="rounded">
	 <p>Ah yeah, check these curves out!</p>
	</div>

	.rounded{border-radius:10px;}

Ah, that's better: no additional graphics to sip away at your user's bandwidth, and if you want a new colour, that can be done with one additional line of CSS.

Granted, for some newer properties, you may have to write that line a few times, including vendor prefixes at the beginning. However, as soon as a rule is comfortably adopted, you can safely remove them.

##Ok, but why are some modern sites still heavy?

The only excuse to have an overweight site these days, is if legacy browser support has not been thought through properly.

By this, I mean that our friend Internet Explorer is still the most used browser, and many IE users are still surfing the information superhighway on version 6-8; these versions will not understand most new tools (like rounded corners and text shadow) that we have at our disposal.

Here I think, is where sites can potentiallly start piling on the pounds. When a client is presented with a visually rich design, if their expectation remains that all those elements will be faithfully recreated in any browser - whatever the cost - then the web designer responsible for that build will have to hop in his/her delorean and dig up all the dirty tricks they used a few years ago.

If however, a client understands the impact of replicating a visually complex design on older browsers, then the web designer is free to use these modern tools, and re-think how to ensure the key parts of that site are bought across on legacy browsers.

##How to keep the pounds off

Setting a client's expectation correctly, depends solely on good communication between all parties responsible for creating the website, and an enviroment that facilitates this and encourages people to ask questions can make this possible. If this is in place, than the client can be educated on how their design will work in older browsers, and why stripping back some elements of the design - to concentrate on the bits a user needs - is a good, not a bad thing (when legacy browsers are concerned).

At Tangent Snowball (where I make great web stuff!) we've created a pamflet for our team and clients, outlining our approach to browser support. The gist of it is that if replicating a visual element for an older browser will require lots of additional resources (that the user will have to download) than it shouldn't be done. Instead, you should keep a website's audience - and purpose - in the frame, and concentrate on providing users of an older browser with the most important parts of that site.

##An example: Twitter

A screengrab of Twitter in IE6 Twitter, in IE6

For IE6, Twitter realised it was a waste of money and time to try and replicate the visually-rich, new Twitter style in IE6. Why bother? It would take so much additional bloat, that the IE6 user would likely have a worse experience, suffering an unresponsive, slow-to-load site. Instead, they identified the most important things a Twitter user would need to do - tweet, look through their timeline etc... - and made their decision based on this. What they decided to do therefore, was present IE6 users with their mobile stylesheet.

This is a perfect solution. The IE6 user can still use Twitter, but won't see the fully HD, enhanced version made for more capable, modern browsers.

##So, am I saying sites haven't gotten larger?

In short no, I'd agree with John that they have gotten larger.

This shift however, was inevitable and really can't be blamed on a single discipline. Whilst the [example site]("http://norvig.com/") John gave is light on the k's and does contain some wonderful content, it contains minimal hierarchy, UX or style (and isn't built semantically, so is not very accessable). These things are needed to help the user scan your carefully honed content, otherwise it's like wondering into a junk store, in the hope you'll find an original VHS of [Commando.]("http://www.youtube.com/watch?v=0B5xEBASwgE")

CSS has given us the ability to guide a user round a site and if used properly (along with well-formatted HTML and a well-built backend) a site can still be zippy.

The reality is that, people visiting a site need to be entertained, inspired, surprised and engaged and a bare-bones site, in this age of HD TV and retina displays, simply won't cut it.

##Put that finger away

In conclusion, I'd say the metaphorical "finger of blame" John was pointing needs to be put firmly back in his pocket. A site is a collaborative effort, and a badly built, bloated site is simply the product of poor communication or lack of skill.

Even the slight bloat added to sites a few years ago was a product of simple reality - a client wouldn't have wanted a site with no design at all. They (and their audience) would have had certain expectations that needed to be met, and we must understand that websites today need design - they are no longer a niche thing.

Fortunately, we have tools now that allow us to make awesome sites that don't eat as much bandwidth as they could do; this can only be a good thing, and is getting better every day.
