---
title: Maneagable colour cycle animations with SASS lists
template: article.jade
date: 2014.01.22
category: notes
summary: For my new site I built a nav menu whose background subtly changed over time, fading in measured increments through the site's colour palette.
---

For my new site I built a nav menu whose background subtly changed over time, fading in measured increments through the site's colour palette. Writing this as a regular CSS3 animation was quickly abandoned in favour of making it super easy to maintain, using a SASS list and a `@for` loop.

Below is what I wanted to get to:

    // Set keyframes
    @keyframes bgcycle{
        0%{
            background:$calico;
        }
        33.3%{
            background:$candy;
        }
        66.6%{
            background:$navy;
        }
    }

    //Call the animation
    nav{
        animation:bgcycle 30s linear infinite;
    }

This works fine, but isn't the easiest to maintain. Adding another colour would involve recalculating the step values, so the animation time is distributed evenly amongst each colour.

## SASS for the maintanance #winning

With SASS, each percentage step can be determined by a list of colours. If a colour is added, the steps will be re-calculated automatically.

### 1. Put the colours in a SASS list

SASS lists are written just like a variable, but with each value comma-seperated. So, to store my colours as a list, I can write:

    $bgcolours:
        $calico,
        $candy,
        $navy,
        $azure;

Powerful functions allow values to be pulled from a list in a number of useful ways. Specifically, I used:

- `length(list)` return how many items are in a list
- `nth(list,[nth])` pull a specific item from a list

### 2. Write my @keyframes declaration as a @for loop, that iterates over this list

    $bgcolours:
        $calico,
        $candy,
        $navy,
        $azure;

    $bgcolours-length:length($bgcolours);

    @keyframes bgcycle{
         @for $i from 1 through $bgcolours-length{
            #{100%/$bgcolours-length*$i}{
                background:nth($bgcolours,$i);
            }
        }
    }

### To break it down:

1. Store the length of the list (returned by the `length(list)` function) in the `$bgcolours-length` variable, to keep things DRY.
2. Open a `@for` loop, that will loop from 1 until the end of the list.

For each colour in the list, the loop will output will a percentage step of the `@keyframes` animation, calculated as: "100% divided by the list length, multiplied by the `$i` operator."

The output looks like this (with SASS colour vars swapped back in for clarity):

    @keyframes bgcycle {
      25% {
        background: $calico;
      }
      50% {
        background: $candy;
      }
      75% {
        background: $navy;
      }
      100% {
        background: $azure;
      }
    }

## Grabbing a colour for the start of the animation

As lists have no "0" item, the animation returned by my `@for` loop doesn't start at 0%. To remedy this, I can grab a colour roughly halfway through the list and have it be the 0% colour:

    0%{
        background:
            nth(
                $cyclecolours,
                floor(
                    (
                        $cyclecolours-length/
                        ($cyclecolours-length/2)
                    )
                )
            );
    }

1. Using `nth(list)` return a colour about halfway through the list. To calculate this dynamically, divide the list by itself, divided by 2.
2. Using `floor(value)` round the result down to the nearest whole number, to ensure a nonexistent item (eg - 1.5) won't be returned.

## Setting the length of the animation

The `@keyframes` are all set, so to ensure the called animation stays dynamic the `length(list)` function can be used again, to multiply the time each colour should be on for, by the list length:

    nav{
        animation:bgcycle #{10s * $cyclecolours-length} linear infinite;
    }

## Let's see that...in an instant replay

All together, the completed SASS is:

    // Set colours in a list, called $bgcolours
    $bgcolours:
        $calico,
        $candy,
        $navy,
        $azure;

    // Store length of $bgcolours list
    $bgcolours-length:length($bgcolours);

    // Set keyframes
    @keyframes bgcycle{
        0%{
            background:nth($cyclecolours,floor(($cyclecolours-length/($cyclecolours-length/2))));
        }
        @for $i from 1 through $bgcolours-length{
            #{100%/$bgcolours-length*$i}{
                background:nth($bgcolours,$i);
            }
        }
    }

    // Call the 'bgcycle' animation
    nav{
        animation:bgcycle #{10s * $cyclecolours-length} linear infinite;
    }



## Demo

I've thrown this up on [codepen](http://codepen.io/jackarmley/pen/gFxBf) so the code can be dug through. I'm a SASS newbie so there may be a cleaner way to handle the 0% step. Get into it, fork the pen and send me a comment if this is the case!



