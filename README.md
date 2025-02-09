# FlipbookBanner Component

A responsive React banner component with smooth page-turning animations and autoplay functionality. Built with pure React and CSS transforms, this component provides an engaging way to showcase content with a book-like interface.

## [Live Demo](https://hgromov.github.io/flipbook-banner)

## Features

- 🎯 Smooth page-turning animations
- 🎬 Autoplay with configurable timing
- 🎵 Page turn sound effects
- ⌨️ Keyboard navigation support (Arrow keys + Space)
- 📱 Responsive design with touch support
- 🖱️ Interactive controls with visual feedback
- ♿ Full accessibility support (ARIA)
- 🔄 Visual progress indicators
- 🎨 Customizable styling

## Usage

```jsx
import FlipbookBanner from "./FlipbookBanner";

const pages = [
  {
    image: "/assets/image1.jpg",
    title: "Page Title 1",
  },
  {
    image: "/assets/image2.jpg",
    title: "Page Title 2",
  },
];

function App() {
  return <FlipbookBanner pages={pages} />;
}
```

## Configuration

The component accepts the following props:

| Prop                | Type     | Default                           | Description                        |
| ------------------- | -------- | --------------------------------- | ---------------------------------- |
| `pages`             | `Array`  | Required                          | Array of page objects              |
| `autoplayInterval`  | `number` | `2000`                            | Time between page turns (ms)       |
| `animationDuration` | `number` | `800`                             | Page flip animation duration (ms)  |
| `animationEasing`   | `string` | `cubic-bezier(0.3, 0.06, 0.2, 1)` | CSS easing function for animations |

### Page Object Structure

```js
{
  image: string,  // URL to page image
  title: string   // Page title text
}
```

### Example with Custom Animation

```jsx
<FlipbookBanner
  pages={pages}
  animationDuration={100}
  animationEasing="ease-in-out"
/>
```

## Features in Detail

### Keyboard Controls

- **Left Arrow**: Previous page
- **Right Arrow**: Next page
- **Space**: Toggle autoplay

### Accessibility

- Full keyboard navigation
- ARIA labels and roles
- Screen reader support
- Focus management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

```bash
# Clone the repository
git clone https://github.com/hgromov/flipbook-banner.git

# Navigate to project directory
cd flipbook-banner

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## License

MIT © Herman Ostapenko
