# DecryptedText Usage Guide

## Overview

The DecryptedText implementation provides a flexible vanilla JavaScript text decryption animation system, similar to the React component you referenced. It creates engaging text reveal effects with customizable scrambling animations.

## Basic Usage

### 1. Simple Hover Effect (Default)

```javascript
// Basic hover to decrypt
DecryptedText.hover(".my-text");
```

### 2. Animate on View (Scroll Trigger)

```javascript
// Animate when element comes into view
DecryptedText.view(".my-text", {
  revealDirection: "center",
  speed: 80,
  maxIterations: 15,
});
```

### 3. Customized Settings

```javascript
// Custom configuration similar to your React example
DecryptedText.custom(".my-text", {
  speed: 100,
  maxIterations: 20,
  characters: "ABCD1234!?",
  className: "revealed",
  parentClassName: "all-letters",
  encryptedClassName: "encrypted",
  animateOn: "hover",
});
```

### 4. Manual Trigger

```javascript
// Manual control
const instance = DecryptedText.create(".my-text", {
  animateOn: "manual",
  revealDirection: "center",
});

// Trigger animation
instance.animate();

// Reset animation
instance.reset();
```

## Configuration Options

| Option               | Type     | Default             | Description                                    |
| -------------------- | -------- | ------------------- | ---------------------------------------------- |
| `text`               | string   | element.textContent | Text to animate                                |
| `speed`              | number   | 50                  | ms between character changes                   |
| `maxIterations`      | number   | 6                   | Scramble iterations per character              |
| `characters`         | string   | full charset        | Characters used for scrambling                 |
| `className`          | string   | "revealed"          | Class added when complete                      |
| `parentClassName`    | string   | "all-letters"       | Class added to parent during animation         |
| `encryptedClassName` | string   | "encrypted"         | Class added during encryption                  |
| `animateOn`          | string   | "hover"             | Trigger: "hover", "view", "load", "manual"     |
| `revealDirection`    | string   | "left"              | Direction: "left", "right", "center", "random" |
| `revealDelay`        | number   | 70                  | ms between revealing each character            |
| `threshold`          | number   | 0.1                 | Intersection Observer threshold                |
| `rootMargin`         | string   | "0px"               | Intersection Observer root margin              |
| `delay`              | number   | 0                   | Delay before starting animation                |
| `onComplete`         | function | null                | Callback when animation completes              |
| `onStart`            | function | null                | Callback when animation starts                 |

## Usage Examples Matching Your React Patterns

### Example 1: Defaults (hover to decrypt)

```javascript
// HTML: <p class="hover-text">Hover me!</p>
DecryptedText.hover(".hover-text");
```

### Example 2: Customized speed and characters

```javascript
// HTML: <p class="custom-text">Customize me</p>
DecryptedText.custom(".custom-text", {
  speed: 100,
  maxIterations: 20,
  characters: "ABCD1234!?",
  className: "revealed",
  parentClassName: "all-letters",
  encryptedClassName: "encrypted",
});
```

### Example 3: Animate on view (runs once)

```javascript
// HTML: <p class="view-text">This text animates when in view</p>
DecryptedText.view(".view-text", {
  revealDirection: "center",
});
```

## API Methods

### Global API

- `DecryptedText.create(selector, options)` - Create instance(s)
- `DecryptedText.hover(selector, options)` - Hover-triggered animation
- `DecryptedText.view(selector, options)` - View-triggered animation
- `DecryptedText.custom(selector, options)` - Custom configuration
- `DecryptedText.init(element, options)` - Direct initialization

### Instance Methods

- `instance.animate(delay)` - Trigger animation
- `instance.reset()` - Reset to original state
- `instance.isAnimating()` - Check if currently animating
- `instance.hasAnimated()` - Check if animation has run
- `instance.element` - Access to DOM element
- `instance.config` - Access to configuration

## CSS Classes

The system uses several CSS classes that you can style:

### `.encrypted`

Applied during the scrambling animation:

```css
.encrypted {
  font-family: monospace;
  text-shadow: 0 0 10px hsl(var(--primary) / 0.3);
}
```

### `.revealed`

Applied when animation completes:

```css
.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

### `.all-letters`

Applied to parent element during animation:

```css
.all-letters::before {
  content: "";
  /* Glowing background effect */
}
```

## Advanced Usage

### Multiple Elements

```javascript
// Apply to multiple elements
const instances = DecryptedText.create(".decrypt-text", {
  animateOn: "view",
  revealDirection: "random",
});

// instances is an array of DecryptedText instances
```

### Chaining Animations

```javascript
const title = DecryptedText.create(".title", { animateOn: "manual" });
const subtitle = DecryptedText.create(".subtitle", { animateOn: "manual" });

title.animate().then(() => {
  return subtitle.animate(500); // 500ms delay
});
```

### Custom Callbacks

```javascript
DecryptedText.create(".my-text", {
  onStart: (element) => {
    console.log("Animation started for:", element);
  },
  onComplete: (element) => {
    console.log("Animation completed for:", element);
    // Trigger other animations or effects
  },
});
```

## Integration with Your Portfolio

Your hero title and description are already configured:

```javascript
// Hero title - animates on view with left-to-right reveal
const heroTitle = DecryptedText.create(".hero-title .text-gradient", {
  animateOn: "view",
  revealDirection: "left",
  delay: 300,
});

// Hero description - animates on view with longer delay
const heroDescription = DecryptedText.create(".hero-description", {
  animateOn: "view",
  revealDirection: "left",
  delay: 1500,
});
```

## Browser Support

- Modern browsers with ES6+ support
- Intersection Observer API support
- CSS custom properties support

## Performance Notes

- Uses RequestAnimationFrame for smooth animations
- Debounced scroll events
- Respects `prefers-reduced-motion` setting
- Automatic cleanup of intervals and observers

## Troubleshooting

### Animation not triggering

- Check if element exists when script runs
- Verify CSS classes are properly styled
- Check browser console for errors

### Performance issues

- Reduce `maxIterations` for faster animation
- Increase `speed` value for slower character changes
- Use `revealDelay` to control reveal timing

### Styling issues

- Ensure CSS variables are defined
- Check that encrypted/revealed classes have proper styles
- Verify font loading for monospace fonts
