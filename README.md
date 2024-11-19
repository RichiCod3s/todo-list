# Webpack Starter Template

This template provides a basic Webpack setup for modern JavaScript development, including bundling JavaScript, managing CSS, and handling assets like HTML and images.

## Features
- **JavaScript Bundling**: Combines modules into a single output file.
- **CSS Handling**: Integrates styles using `style-loader` and `css-loader`.
- **HTML Template Management**: Automatically injects scripts into HTML using `HtmlWebpackPlugin`.
  - *Note: You do not need to add a `<script>` tag manually! `HtmlWebpackPlugin` will automatically include the output bundle as a `<script>` tag in `dist/index.html`.*
- **Asset Management**: Supports local images in JavaScript, HTML, and CSS.

## Working with Images
If you want to use images with Webpack, you need to import them first:

```javascript
// Import the image
import odinImage from "./odin.png";

// Example usage
const image = document.createElement("img");
image.src = odinImage;

document.body.appendChild(image);
