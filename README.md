# Portfolio v2

Modern, animated portfolio website built with vanilla HTML, CSS, and JavaScript. Features a clean modular architecture with utility-first CSS approach.

## Project Structure

```
My-Portfolio-v2/
├── index.html              # Main page
├── text.html               # Additional page
├── type.html               # Additional page
├── assets/
│   ├── images/            # Portfolio images (projects, about)
│   ├── icons/             # UI icons and logos
│   └── svg/               # SVG graphics
├── css/
│   ├── base.css           # Variables, reset, typography
│   ├── components.css     # Reusable UI components
│   ├── sections.css       # Page sections styling
│   ├── animations.css     # Keyframes and transitions
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js            # Application entry point
│   ├── config.js          # Configuration constants
│   ├── cursor.js          # Custom mouse cursor
│   ├── loader.js          # Page loader animation
│   ├── marquee.js         # Skills marquee
│   ├── carousel.js        # Project carousel
│   ├── resume.js          # Resume scroll animation
│   └── scroll.js          # Scroll utilities
└── README.md
```

## Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Variables
- **JavaScript ES6+** - Modular vanilla JS
- **GSAP 3.12.5** - Animation library
- **ScrollTrigger** - Scroll animations
- **Bootstrap 5.3.8** - Grid system
- **Swiper** - Touch slider
- **Font Awesome 7.0.1** - Icons

## Features

- Animated page loader
- Custom mouse cursor
- Smooth scroll animations
- Auto-rotating project carousel
- GSAP-powered resume timeline
- Infinite marquee sliders
- Fully responsive design
- Mobile-optimized layouts
- Utility-first CSS system
- Professional spacing utilities
- Typography hierarchy system
- Modular component architecture

## Development

### Running Locally

```bash
# Start a local server
python -m http.server 8000

# Open in browser
http://localhost:8000
```

### File Organization

**CSS Modules:**
- `base.css` - Foundation styles + Utility classes
- `components.css` - Header, buttons, cards, loader
- `sections.css` - Hero, about, portfolio, resume, footer
- `animations.css` - All @keyframes
- `responsive.css` - Mobile/tablet adjustments

**JS Modules:**
- `main.js` - Initializes all features
- Individual modules for each feature
- ES6 import/export syntax

### Utility Classes

The project includes a comprehensive utility class system:

**Spacing**: `.mt-20`, `.mb-50`, `.pt-40`, `.pb-60` (10-100px range)
**Typography**: `.fz-18`, `.fz-24`, `.fz-50` (Font sizes)
**Font Weights**: `.fw-200` to `.fw-700`
**Colors**: `.main-color`, `.p-color`, `.sub-bg`
**Opacity**: `.opacity-3`, `.opacity-5`, `.opacity-7`
**Borders**: `.bord-thin-top`, `.bord-thin-bottom`
**Alignment**: `.text-center`, `.text-left`, `.text-right`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Personal portfolio project
