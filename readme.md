# About

**ocuFontResizer** is a module written in Vanilla JS that creates controls for changing the font size of blocks.

## Options

`button` - selector of button that controls the font size.

`block` - selector of block that accepts font size changes.

`sizes` - array of font sizes.

## Example to use

```
var changeBody = new ocuFontResizer();

changeBody.init({button: '.button', sizes: ['default', '18px', '20px']});
```

Or:

```
var changeBlock = new ocuFontResizer();

changeBlock.init({button: '.button', block: '.block', sizes: ['default', '18px', '20px', '24px']});

```

## License

GNU GPL v2.0