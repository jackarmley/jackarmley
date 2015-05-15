---
title: Fancy abbr tags
template: article.jade
date: 2012.02.01
category: notes
summary: when it came to the abbr tag, I wanted to make it a more helpful addition to an article.
---

I've never been happy with the way the `abbr` tag works, so I decided to write a small script for my site, that would make it more helpful for the user.

I always feel a little uneasy about modifying elements like `title=""` tags and other browser-ui specific elements, as I'm aware that such things are so familiar, that modifying them may negatively alter that user's experience of the site.

I've always styled tags with a dotted border underneath (as that's what I assume a user expects). However, I've always felt that adding such tags to the markup of an article was a pragmatic web-designer-y thing to do, and they would go unused by the reader.

For my new site, I aimed to re-assess all my assumptions and when it came to the `abbr` tag, I wanted to make it a more helpful addition to an article. To do this, I wanted to show the title="" attribute of the tag in a little tooltip, in replacement of the standard yellow one.

As this couldn't be done purely with CSS, I needed a small bit of jQuery to extract the title and append it to a tag, that was injected (via the jQuery) into the abbreviation. Once that little operation was performed, I could then prettify the injected markup with a little CSS.

## The jQuery

    function fancyabbr(){

    $("abbr").each(function(){

      //Grab the title, from each <abbr> tag on the page
      var abbrcontent = $(this).attr("title");

      //Append the title to each <abbr> tag
      $(this).append("Short for: ""+abbrcontent+""");

      //If this has been successful, remove the title attribute from each <abbr> tagt
      if (abbrcontent!=""){
       $(this).attr("title","");
      }

      //Call the appended  tag in, on :hover
       $(this).hover(
        function(){
         $("span",this).fadeIn(400);
        },
        function(){
         $("span",this).fadeOut(200);
        });

     });

    }

## The CSS

    abbr{
        position:relative;
    }
    .fancyabbr{
        font:italic normal 14px/30px georgia,times,serif;
        color:#666;
        text-transform:none;
        position:absolute;
        top:-40px;
        left:0;
        display:block;
        float:left;
        white-space:pre;
        z-index:2;
        background:#fff;
        padding:0 0.5em;
        border-radius:0.25em;
        box-shadow:0 0 4px rgba(1,1,1,.5);
        border:1px solid #999;
        display:none;
    }
    .fancyabbr:after{
        content:" ";
        width:10px;
        height:10px;
        display:block;
        background:#fff;
        position:absolute;
        bottom:-6px;
        left:10px;
        transform:rotate(45deg);
        border:1px solid #999;
        border-top:none;
        border-left:none;
        box-shadow:2px 2px 2px rgba(1,1,1,.3);
    }

## That's it

I'll fling this on github soon but I've no doubt - being such a small script - it's easily copied and pasted from this page. Enjoy, and do let me know of any improvements!
