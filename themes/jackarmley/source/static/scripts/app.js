/**
 * Scripts
 */

require.config({
    paths: {
        jquery: '../libs/jquery/jquery'
    }
});

require(['jquery'], function ($) {
    'use strict';

    $('.site-navtoggle').click(function(){
        $('.site-header').toggleClass('state--navactive');
    });

    var browsermessage = function(){
        var
          messageheading = 'Oops! You have no flexbox',
          messagetext = 'Hi there! I do cross-browser checking all the time for work, but as this is my personal site, I wanted to take the opportunity to use techniques that don\'t have 100% browser support yet, like flexbox, svgs and rems. Whilst browsing, you may have noticed some visual anomolies. Sorry about that, but I wanted to be free to try the latest front-end techniques on my own site!',
          message =
            '<div class="browsermessage">' +
                '<div class="browsermessage-inner">' +
                '<h2>' + messageheading + '</h2>' +
                '<p>' + messagetext + '</p>' +
                '</div>' +
            '</div>';
        $('body').append(message);
    }

    if(!Modernizr.flexbox){
        browsermessage();
    }

});
