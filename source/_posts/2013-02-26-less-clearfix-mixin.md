---
title: Removing clearfix from the markup with LESS
template: article.jade
date: 2013.02.26
category: article
summary: It always irked me that there was no easily maintainable way to extract the clearfix class out of markup
---

It always irked me that there was no easily maintainable way to extract the clearfix class out of markup, and set it as a LESS mixin. I just discovered however, that if you use the “&” selector at the end of a selector in LESS, in pulls that selector out in the generated CSS, so you can go from a parent element.

Thought this was quite useful, so thought I’d share the resulting mixin:

    /**
     * Clearfix
     *
     * @src http://css-tricks.com/snippets/css/clear-fix
     * IE6 part not included, as we've dropped IE6 support
     */
        .clearfix(){

            &:after{
                display:block;
                visibility:hidden;
                clear:both;
                content:" ";
                height:0;
                font-size:0;
            }

            /**
            * IE7
            */
            *:first-child+html &{
                zoom:1;
            }

        }
