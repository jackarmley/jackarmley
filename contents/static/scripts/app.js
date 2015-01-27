/**
 * HATCHD DIGITAL CLIENT SIDE APP
 *
 * This code has been developed in house at HATCHD DIGITAL.
 *
 * @author Hatchd Digital <hello@hatchd.com.au>
 * @see http://hatchd.com.au/
 * @contributor Jimmy Hillis <jimmy@hatchd.com.au>
 * @contributor Niaal Holder <niaal@hatchd.com.au>
 * @contributor Neil Ferreira <neil@hatchd.com.au>
 *
 * FOR DEVELOPERS:
 *
 * ALL external libraries and should be imported here, using a build
 * script like Grunt. This version of the file should be pretty, well
 * formatted, and only contain code that is unique to your own app.
 * Your site should always use /app-min.js when loading, which contains a
 * minified version of this script prepended with all.
 *
 * STYLE:
 *
 * All code should be within 79 characters wide to meet standard Hatchd
 * protocol. Reformat code cleanly to fit within this tool.
 *
 */

require.config({
    paths: {
        jquery: '../../contents/static/libs/jquery/dist/jquery'
    }
});

require(['jquery'], function ($) {
    'use strict';

    /**
     * Load view-specific requirements for pages
     * @return {void}
     */
    (function () {
        var supported_sections = {
           // 'view-homepage': 'homepage'
        };
        // Loop through each body class name to find view specific classes
        $.each(document.body.className.split(' '), function (index, _class) {
            if (_class in supported_sections) {
                require([supported_sections[_class]]);
            }
        });
    }());

    // Visually weigh posts based on
    // summary length
    function postweight(elem,scale) {
        var $elem = $(elem);
        var scale = scale;
        $elem.has(scale).each(function(){
            var $this = $(this);
            var weight = $this.find(scale).text().length;
            if (weight > 150) {
                $this.attr('data-weight', 'overweight');
            }else if(weight > 100){
                $this.attr('data-weight', 'heavy');
            }
            else if (weight > 70) {
                $this.attr('data-weight', 'medium');
            }
            else{
                $this.attr('data-weight', 'light');
            }
        });
    }

    // Fade site header
    // when user scrolls (no-touch only)
    var $elem = $('.site-header');
    var $window = $(window);
    var $document = $(document);

    var props = {
      'velocity' : 0.4,
      'height' : $elem.height()
    };

    function update(){
        var pos = $window.scrollTop();
        if(pos <= props.height){
            $elem.css({
                'top' : (pos * props.velocity) + 'px',
                'opacity': (1 - pos/props.height)
            });
        }
    };

    if($document.height() > $window.height()){
        //$('body').addClass('state--fixed');
        //$window.on('scroll', update);
    }

    postweight('.post','.post-summary');

});
