---
title: 'Bulletproof webfonts: part 1'
template: article.jade
date: 2011.05.10
category: article
summary: Before a webfont reaches the browser, it needs to be transformed from a set of mathematical instructions to a bitmap, which is then laid out across the pixels of the monitor
---

![A 3d letter being threatened by a missile](/assets/images/blog/blogimg-bulletproof_webfont.png)

Know your enemy (or, stop worrying and learn to love the rasterizer).

After using techniques like Cufon,  sIFR or even image replacement to bring custom fonts into websites, we expect (when switching to webfonts) for our font to look smooth and consistent across all browsers. When using webfonts, we need to adjust our expectations, as given a font needs to be rendered by the user's computer, the quirks of each system come into play and this consistency just isn't possible. Instead, we need to understand how fonts are rendered on each system (by which I mean MacOS, iOS and Windows), so we know what users expect to see. With this knowledge, we can safely hunt for a "bulletproof" webfont (by which I mean one that is clear and readable at small sizes, and (ideally) smooth at large sizes, with each letter spaced equally and aligning to the baseline).

In a future post (which I guess will be part 2), I'd like to share how I test for a bulletproof webfont but first, It's important to understand the landscape we're operating in here so, introducing the "rasterizer":

## Ok, so what's a rasterizer?

Before your webfont even makes it to the browser, it needs to be transformed from it's raw form (a set of mathematical instructions consisting of points and curves) to a bitmap, which is then laid out across the pixels of your monitor. This is what the rasterizer does.

For a webfont to come out of this process unscathed is a small miricle. All the fine details of each character have to be represented by pixels, which have a finite size. So, if the upstroke of a "d" for example, falls between two pixels it may not be rendered at all. Through the relatively short time screen fonts have been available, a number of technologies have been created to try and circumvent this issue:

### Hinting

"Hinting" is a set of instructions embedded into each character of a font set that tell the rasteriser where the pixels of each character should fall, when they're laid out on the pixel grid of your monitor. This often means that the space of a character in a hinted font can change at different sizes, as it's outline has been manually adjusted to ensure it falls perfectly onto the pixel grid.  These instructions remove the guesswork from the rasteriser; the font creator can control exactly how each character will look on screen. Hinting instructions are often applied anew at specific sizes (delta hinting) but auto hinting can also be used (which is not as precise). I could go on forever, but for more detail typotheque have a [great article on hinting.][2]

### Anti-aliasing

Anti-aliasing gives the rasterizer a little more choice, when it has to convert a character's outline to pixels. With no anti-aliasing, a rasterizer has the choice between turning a pixel on, or off (think black or white) so, if it makes an incorrect decision about where the outline should fall that outline will either not be represtned at all, or will be bloated with additional pixels being filled in. With anti-aliasing switched on, a rasterizer can choose to vary a pixel's intensity through shades of grey, as well as just black and white. As a result, when confronted with an outline that may not fall perfectly in line with the pixel grid, it can choose to render those pixels in a shade of grey. This most basic type of anti-aliasing is called "Greyscale" .

### Sub-pixel anti-aliasing / positioning

Greyscale anti-aliasing is definately an improvement on no anti-aliasing at all, but it still means that without the correct instructions (hinting), a rasterizer has the potential to turn part of a character's outline grey, when it should be black (this can result in parts of some chacacters looking like they've been partially erased). Sub-pixel antialiasing attempts to lessen this effect, by exploiting the pixel composition of LCD monitors.

Whereas a CRT monitor's pixels are created by physically splitting up the light projected from the rear of the monitor into fragments (using a metal screen punched with tiny holes, or hundreds of tiny wires spaced vertically behind the glass screen of the monitor), the pixels of an LCD screen are far more precise. Each pixel is a perfect square, split vertically into 3 tiny strips (most commonly ordered: red, green and blue) that can be individually varied in intensity, to control the colour of the pixel. With sub-pixel anti-aliasing, when the outline of a character falls across a pixel, not only can the pixel by  varied in intensity through black, grey and then white, but each of its 3 "sub-pixels" can too. This means rendering can be far more precise, and some rasterizers can even shift each character's position by the sub-pixel to more faithfully repicate the letter-spacing intended by the type designer. The only shortfall of this method, is that given a pixel is split horizontally into thirds, the same precision cannot be achieved vertically. So, rasterizers often sub-pixel render horizontally, and fall-back to greyscale rendering in the vertical direction (known as *y-direction anti-aliasing*).

How many of these methods are used all depends on the operating system, and the different ways each operating system render text means a font may look completely different on a Mac or windows PC, or even on two different windows installs.

## So, how does Mac do it?

Mac OS (since 10.4) uses "Quartz" to rasterize text. Quartz is a powerful rasterizer, able to handle sub-pixel anti-aliasing, sub-pixel positioning and y-direction anti-aliasing. As such, Quartz chooses to ignore a font's inbuilt hinting instructions (which makes it a "smart rasterizer"), and instead tries it's best to stay true to the original shape of each character, and the spacing of each letter from one another. This results in letters looking smooth and consistent (Windows fans say "blurry" and with some fonts, I tend to agree).

With iOS, sub-pixel anti-aliasing is not used, because iOS devices are made to be turned round (from portrait to landscape orientation, and vice-versa) and as a result, the vertical strips a pixel is split into become horizontal. Fortunately, particularly with a Retina display this really isn't noticable. Fonts actually look sharper, given the pixels on those displays are half the size of their desktop cousins.

## What about Windows?

GDI+ (Graphics Device Interface +) is a core Windows component responsible for outputting all graphics (including text) to all output devices, including the monitor; It has shipped with Windows since XP (which is as far back as I'm going). Unlike Apple, Microsoft don't place all the emphasis on staying faithful to a font's original form, when rasterizing each character. Of higher importance, is that each font is readable and sharp, with a consistent grey value across a block of text. In accordance with this philosophy, GDI+ will attempt to snap the outlines of each character to the nearest pixel, when  laying it out over the monitor's grid. As such, it relies almost entirely on a font's inbuilt instructions (making it a "dumb" rasterizer). If these hints aren't present, the rasterizer will have to guess and with it's abilities stretching only as far as greyscale anti-aliasing, this guesswork often results in poorly rendered fonts. Of course, well-hinted screen fonts (like Georgia, Verdana and Arial) look beautiful, crisp and black in GDI+, as each outline is perfectly placed over the pixel grid.

With the advent of the LCD screen (and sub-pixels) however, Microsoft saw a chance to improve font rendering, possibly even on poorly-hinted fonts...

### Bring on cleartype

Cleartype is a powerful program whose only function is to provide sub-pixel rendering abilities to the rasterizer. It can do everything on a sub-pixel level, that Quartz can (repeat after me: sub-pixel anti-aliasing and sub-pixel positioning) however, how many of these abilities can be exploited all depends on the rasterizer using Cleartype.

GDI+ can only use Cleartype's sub-pixel rendering function and, when this is turned on GDI+ can no longer do greyscale anti-aliasing. This means that, with the combination of GDI+ and Cleartype, no y-direction anti-aliasing is being done, which becomes really noticable when a font is set at a large size (you'll see it's curved parts can look a little jaggy).

To smooth out these final niggle, Windows brought out Directwrite...

### So step in Directwrite

Directwrite (shipped with Windows 7) has much more advanced text-rendering capabilities than GDI+ and (although GDI+ is still responsible for outputting all graphics) If an application chooses, it can tell GDI+ to hand over responsibility of rendering text (within that application only) to Directwrite. When Directwrite asks Cleartype to handle it's sub-pixel rendering, it can access its full feature set. As a result (and because Directwrite doesn't snap to pixel so much) the rasterization produced by Directwrite and Cleartype is much closer to Quartz on MacOS.

As an aside, Microsoft also came out with WPF (Windows Presentation Foundation), a rasterizer which has much the same abilities as Directwrite. However, it was eclipsed by Directwrite, and the only place I ever see it in in the plugins list for Firefox 4 (it uses WPF to improve text rendering within the browser).

## How does this all come together in my browser?

### Mac OS/iOS

As Quartz is a core component of the Operatng System, all browsers will use it for text rendering as as such, text will render the same in every browser on a Mac.

### Windows XP

GDI+ with Cleartype switched off is the default mode in Windws XP. As GDI+ is a core component of the Operating System, all browsers will honour this setting (except Firefox 4, which  uses the Windows Presentation Foundation plugin). However, if IE7 is installed, Cleartype will be switched on for IE7 only. If IE8 is installed, Cleartype will be switched on system-wide, meaning all browsers will honour this setting.

### Windows Vista / Windows 7

GDI+ with Cleartype is switched on is the default within Vista/7 (so, all browsers will use this setting). However, Firefox 4 will use WPF to render it's text and, if IE9 is installed it will use Directwrite.

## To conclude

If you're still awake down here, you'll hopefully be somewhat enlightened on the complex dance between the OS, browser, font and rasterizer. Do join me in part 2, where I'll go through how to put a webnfont throughall these different environments, to see if it comes out unscathed.

 [1]: http://www.jackarmley.com/images/uploads/images/artimg-bulletproof_webfont.png
 [2]: http://www.typotheque.com/articles/hinting "Read this article on hinting by Peter Biľak; it's a gas I assure you!"
