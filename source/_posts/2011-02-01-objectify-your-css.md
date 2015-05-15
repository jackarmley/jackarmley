---
title: Objectify your CSS
template: article.jade
date: 2011.02.01
category: notes
summary: When working on large builds,  unlocking your styles from a specific location and making them modular is really important.
---

When working on large builds, and especially when rolling a site out based on a CMS like Expression Engine, I think unlocking your styles from a specific location and making them modular, is really important.

We (as web designers) all know how to construct a descendent selector, right? It's a way of targeting an element, based on its poition within the DOM tree. So, this is a good example:

	section#main_content article h1{
		color:red;
	}

Here, you'd apply a red color to an h1 located within a article, which in turn sat inside a section called "content". This is all very well, but what if that article were to be dropped elsewhere? Like in a section called #secondary_content? In this case, you'd have to re-declare your rule, which bloats your stylesheet and means you've got to keep tabs on two rules.

With the object-oriented approach championed by Nicole Sullivan (at [oocss.org]("http://oocss.org")), you'd create that style once for the article, then you could move it wherever you please. So, to make the article location-independant you'd have to give it a unique identifier (in the form of a class). With this rule done, your CSS would look like this:

	article.listing h1{
		color:red;
	}

Now, you can drop it wherever you please, and your CSS is smaller and thus quicker to download. Neat eh? You can take this much further, by constructing extensble classes that stack on top of one another to change the appearance of your modular element, but that's for a later post I guess.

