/*
ocuFontResizer is a module written in Vanilla JS that creates controls for changing the font size of blocks.
License: GPLv2
Source: ...
Author: EmgrtE
*/


function ocuFontResizer() {
    var that = this;

    // resize method
    that.resize = function(block, size, debug) {
        // debug message
        if (debug) {
            console.log('set font-size to block', block, size);
        }

        // main logic of the method
        if (size == 'default') {
            block.style.fontSize = '';
        } else {
            block.style.fontSize = size;
        }
    };



    // event method
    that.event = function(event, button, selector, block, sizes, individ, debug) {
        // debug message
        if (debug) {
            console.log('start button event', event, button, block, sizes);
        }

        // ending to method if not available elements
        if (!block.length) {
            console.log("don't find block elements.");

            return;
        }

        var blockElements = document.querySelectorAll(block),
            buttonTagName = button.tagName.toLowerCase(),
            buttonCount = button.getAttribute('data-font-count'),
            fontSizes = sizes;

        if (!buttonCount) {
            buttonCount = 0;
        } else {
            if (buttonTagName == 'select') {
                buttonCount = button.selectedIndex;
            } else {
                if (parseInt(buttonCount) < sizes.length - 1) {
                    buttonCount++;
                } else {
                    buttonCount = 0;
                }
            }
        }

        var fontSize = sizes[buttonCount];

        if (buttonTagName == 'select') {
            fontSize = button.options[button.selectedIndex].value;
        }

        // main logic of the method
        if (individ) {
            button.setAttribute('data-font-count', buttonCount);
            button.setAttribute('data-font-size', fontSize);
        } else {
            var buttonElements = document.querySelectorAll(selector);

            for (var i = 0; i < buttonElements.length; i++) {
                buttonElements[i].setAttribute('data-font-count', buttonCount);
                buttonElements[i].setAttribute('data-font-size', fontSize);

                if (buttonElements[i].tagName.toLowerCase() == 'select') {
                    buttonElements[i].selectedIndex = buttonCount;
                }
            }
        }

        // call method of resize font size of blocks
        for (var i = 0; i < blockElements.length; i++) {
            that.resize(blockElements[i], fontSize, debug);
        }
    };



    // init method
    that.init = function(options) {
        options.button = options.button || '';
        options.block = options.block || 'body';
        options.sizes = options.sizes || ['default'];

        options.preSet = options.preSet || true;
        options.debug = options.debug || false;

        if (options.individ === undefined || options.individ === null) {
            options.individ = true;
        }

        // debug message
        if (options.debug) {
            console.log('start init ocuFontResizer', options);
        }

        // ending to method if not available elements
        if (!options.button.length) {
            console.log("don't find button elements.");

            return;
        }

        // main logic of the method
        var buttonElements = document.querySelectorAll(options.button);

        for (var i = 0; i < buttonElements.length; i++) {
            var buttonTagName = buttonElements[i].tagName.toLowerCase(),
                eventType = 'click';

            if (buttonTagName == 'select') {
                eventType = 'change';
            }

            // pre set elements data
            if (options.preSet) {
                buttonElements[i].setAttribute('data-font-count', '-1');

                that.event('preSet event', buttonElements[i], options.button, options.block, options.sizes, options.individ, options.debug);
            }

            // set events to button elements
            buttonElements[i].addEventListener(eventType, function(event) { // not attachEvent - ie8 not needed
                that.event(event, this, options.button, options.block, options.sizes, options.individ, options.debug);
            });
        }
    };
}

/*
 ___________________________
 | q w e r t y u i o p [ ] |
 |  a s d f g h j k l ; '  |
 |   z x c v b n m , . /   |
 |=========================|
*/