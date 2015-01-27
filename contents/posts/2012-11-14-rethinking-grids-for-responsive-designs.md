---
title: Rethinking grids for responsive designs
template: article.jade
date: 2012.11.14
category: article
summary: In some cases, a class-based grid may still be useful, but it's definitely a good exercise to try and build a site without one.
hero_image: /assets/images/blog/artimg-responsivegrids.jpg
---
Grids are great; they help a site achieve some level of consistency from the get-go, by ensuring all block-level elements align to a preset structure (horizontally and sometimes, vertically as well).

Historically, a grid system was laid onto a site using classes, applied to the HTML element(s) you wanted to "gridify" (for want of a better term); the stack would look something like this:

	<div class="gridunit gridunit-6">

This would snap the above div to span 6 colums of (for example) say, 12 column grid.

This is a great system, and one that's served me well on countless builds. It's strength, is that it's super-quick to implement, and you don't need to style each new element separately.

##Why change?

We're no longer building for a fixed size, therefore if a page is split into 6 columns, those 6 columns (even if fluid) can start to get really uncomfortable at smaller widths. These widths can be overridden using media queries, but as soon as a 6-column class now spans 3 columns, the classes on the page no longer make sense.

##LESS to the rescue

The obvious solution is to pull the grid class names from the HTML, and keep everything in the CSS. You lose the convenience of an easily inplementable system, but gain the ability to change widths at different screen sizes.

Off the bat, this sounds crazy, but with a CSS precompiler like LESS or SASS, a grid system can be defined using a mixin, which can then be pulled in for any CSS declaration; being a mixin, all rules are kept in one place and can be easily adjusted.

I recently helped create this mixin for a project at Hatchd, and it's proved much more flexible than a class-based system.

My 2 aims for this particular system were:

1. To ensure it used percentages for gutters rather than fixed gutters (to ensure box-sizing could be omitted to play nice with IE7, and to ensure a gutter was created outside the element, not with padding as part of it's box).
2. To ensure the percentage-based grid widths and gutters would stay consistent when nested within outer grid units (so a 2 column unit inside a 6 column unit wouldn't be a percentage of that parent 6 column unit, but a percentage of the total unit size of the grid; 12 columns for example).

To achieve this, we used math in the mixin that would calculate the grid unit based on values it was given. For example, this call:

	.grid(3,6);

Would build a 3 column grid, in a 6 column container, like so:

> 100% , divided by the target size (3), multiplied by the context (6); If no context is given, assume it is the full grid width (12).

This works really well, and given calculation is done on the fly, gutters can be added or omitted.

You can see the mixin [on Github]("https://github.com/hatchddigital/Empty-coop/blob/master/css/less/_values/grid.less").

It's no magic bullet; no grid system is - they should be made for purpose. In some cases, a class-based grid may still be useful, but it's definitely a good exercise to try and build a site without one.
