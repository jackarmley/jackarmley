---
title: 'Webfont icons - simplifying the process'
template: article.jade
date: 2012.12.11
category: article
summary: some recent findings from my explorations working with icon webfonts, in the course of building a custom icon set for Hatchd
hero_image: /assets/images/blog/artimg-creatingsnowcone.jpg
---
Just wanted to quickly jot down some recent findings from my explorations working with icon webfonts (in the course of helping to make a custom icon set for Hatchd called "Eggbox")

My experience with using icon fonts didn't start with downloading and installing a third-party set; I think the best way to understand something is to give it a bash, so while at Tangent Snowball I helped to develop an icon set called Snowcone.

I authored a clutch of icons, which was refined and expanded upon by the Tangent Snowball design team.

It worked great, and since leaving Tangent I've used it on a number of projects at Hatchd (as it was made open source), and if I make new icons for a project, if they're generic enough I'll generally roll them back into the core repo so everyone can benefit from them.

What I love about the set is I can create new icons, so I'm not led by the style of a third-party set, and as I understand how they're made, I can more effectively manage hinting issues and consistency within the set.

What's always been an issue however, is that when using something like Snowcone or Fontawesome, you start with a big set of icons that the browser needs to load, even if you only use one or two.

Also, making additions to a custom set is time-consuming and painstaking, and requires a basic knowledge of how everything works to do. The process is usually:

1. Add the icon to the illustrator template, where it is sized 16x16px.
2. Paste icon into a staging template, sized at 2048x2048px, so it matches the metrics of the font.
3. Open Glyphs and paste the upscaled icon into a blank slot in the uncomplied glyphs icon file.
4. Export the glyphs icon file as a ttf.
5. Generate the other required font files from this , using fontprep or fontsquirrel.
6. Create a new CSS class for the icon within the project.

Phew! Crikey, that's a lot of steps, and the other issue with adding icons into empty slots at the end of a list o existing icons, is that no matter how hard you try, the set becomes disorganized - if you add an alternative twitter icon to a set it may be lumped in with a bunch if unrelated ones.

What I really wanted to do if make a tool like icomoon, where I could generate a font set out of custom glyphs, but have it out of the browser and more tightly intergrated with my workflow.

Fortunately, a couple of awesome Ruby devs ( [@endtwist](http://twitter.com/endtwist) and [@ezYZ](http://twitter.com/exYZ) ) have created an awesome little gem called fontcustom that does exactly this - it takes a folder of svg files and, with a simple terminal command spits out a webfont in all 4 file formats, and a CSS file with all the classes in:

	 fontcustom /src -n "Hatchd-Eggbox" -o /compiled

(Look in "src" for the vector icons, then output it to he folder "compiled" with the name "Hatchd-Eggbox")

Also, it maps each glyph to a PUA character (which is what Snowcone does), which tramples accessibility concerns.

The only issue I found was the generated code doesn't support IE7 as - like all good webfont icon sets - it uses a CSS pseudo-class (:before) to insert the icon.

As a fix was needed, I managed to hack together some additions to the gem which generate a js IE7 fix (the same script used in Snowcone) and a useful demo file which shows a list of all the icons.

To rebuild and install the gem from the forked repo I had modified (instead of from the Ruby gem site), I needed some additional commands:

	cd [path to repo]
	sudo gem build fontcustom.gemspec
	sudo gem install fontcustom

This is still way rough around the edges - the script isn't tested and I haven't got nearly as many icons in as I'd like - but it's a good start, and I can see it being a far easier way to work win webfont icons.

On my wishlist, is to figure out what metrics the gem uses to generate the icons (as it uses fontforge to handle it), so I can create well-hinted glyphs. At the moment, I'm using the standard icomoon svg template, which is 512x512px, with an overlaid 16x16 grid.

I feel a little embarrassed about my Ruby hacking, but if the gem's creators see my additions as worthwhile, it would be great to see them rolled in (cleaned up first of course!).

## Some links

- [Eggbox on Github](https://github.com/hatchddigital/eggbox)
- [Modified version of Fontcustom on Github](https://github.com/hatchddigital/fontcustom)
- [Fontcustom site](http://fontcustom.com/)
