/**
 * Created by ppaidi on 2/1/2016.
 */

$.fn.typer = function(text, options){
    options = $.extend({}, {
        char: ' ',
        delay: 1000,
        duration: 600,
        endless: true
    }, options || text);

    text = $.isPlainObject(text) ? options.text : text;

    var elem = $(this),
        isTag = false,
        c = 0;

    (function typetext(i) {
        var e = ({string:1, number:1}[typeof text] ? text : text[i]) + options.char,
            char = e.substr(c++, 1);

        if( char === '<' ){ isTag = true; }
        if( char === '>' ){ isTag = false; }
        elem.html(e.substr(0, c));
        if(c <= e.length){
            if( isTag ){
                typetext(i);
            } else {
                setTimeout(typetext, options.duration/10, i);
            }
        } else {
            c = 0;
            i++;

            if (i === text.length && !options.endless) {
                return;
            } else if (i === text.length) {
                i = 0;
            }
            setTimeout(typetext, options.delay, i);
        }
    })(0);
};

$('#type').typer(['<b>Find</b> & <b>Book</b> Your Tickets', 'Search Events by <b>Category</b>', 'Search Events by <b>Popularity</b>' ]);

