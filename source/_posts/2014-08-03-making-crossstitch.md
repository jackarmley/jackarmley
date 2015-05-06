---
title: Making crossstitch
template: article.jade
date: 2014.08.03
category: article
summary: Crossstitch
status: draft
---

In the quest to reduce image requests (something I'm fanatical about given the range of devices and network speeds out there), one tool I use is box shadows to generate simple icons. I've seen this technique used in the wild to make simple things like hamburger icons (which seems performant and realistic) and for amazing but impractical things, like a full pixel-art Mona Lisa.

As box shadows (like any css-generated shape drawn by the browser) are resolution agnostic, it's a useful technique. I define the size of the icon with a simple `<span>`, then use a pseudo element within (like `:before`) to create the orign point for the shadows.

It can be super tricky figuring out where each shadow should go to make the icon but hey, I figured SASS could make this easier for me! So with the help of [@shadowmint]('http://twitter.com/shadowmint'), I made a SASS script that generates a box shadow icon via a list. As it uses X's and O's to generate the icon, we called it [crossstitch]('http://codepen.io/jackarmley/public').

## What I needed to get to

![A diagram explaining how icons are made using CSS box shadows](/assets/images/blog/making-crossstitch--fig1.gif)

## Step 1: Provide input

To define where each shadow should go I started with a list. Shadows are represented with an "x", and negative space by a "o". The size of the icon can be defined also, by wrapping each row in another list.

```
$icon:(
    (x o x)
    (o x o)
    (x o x)
);
```

- `length($icon)` gives me the height of the icon by returning how many sublists `$icon` contains.
- `length(nth($icon),1)` gives me the width of the icon, by returning the length of the first sublist within `$icon` (this assumes each sublist will be the same length).

## Step 2: Define the icon's size

Using a mixin, we can set the basic styles for the icon with two simple arguments:

- `$size`: the size each box shadow should be
- `$icon`: the icon to draw

```
@mixin stitchicon($icon,$size){
  position:relative;
  display: block;
  // Define the icon's width and height by multipying an
  // individual shadow size by the length of the $icon list
  width:($size * length(nth($matrix,1)));
  height:($size * length($matrix));
  // Define the size of the box shadows to be
  // generated, with a pseudo element
  &:before{
    content:' ';
    position:absolute;
    top:(-$size);
    left:(-$size);
    display: block;
    width:$size;
    height:$size;
  }
}
```

## Step 2: Generate the shadows

Mixins can't generate the values within a css `property: value;` rule; only functions can do that. So, we need to make a function to grab the noughts and crosses from the lists, and generate a rule from them. Best way? Iterate over the lists with a `@for` loop.

```
$icon:(
    (x o x)
    (o x o)
    (x o x)
);

@function makestitch($icon){
    $l: length($icon);
    $i: $l;
    // Iterates over each sub list within $icon
    @for $i from 1 through $l{
    }
}
```

Ok, so here I've got a simple function that loops over the lists within `$icon`. It knows when to stop, because I've told it to find out how many lists `$icon` contains. Now we need run through each one of those sub-lists:

```
@function makestitch($icon,$size,$color){
    $l: length($icon);
    $i: $l;
    // Iterates over each sub list within $icon
    @for $i from 1 through $l{
        // Iterates over each item within the sub list
        $row: nth($icon,$i);
        @for $j from 1 through length($row){
          $item: nth($row,$j);
        }
    }
}
```
