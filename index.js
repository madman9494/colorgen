const textSummer = require('text-summarizerly');
const colorPale = require('color-pale-generatorly');
const textMoji = require('textmoji');
const randPass = require('randomly-password-generator');


function generateRandomColor(options = {}) {
    const {
      format = 'hex', // Output format ('hex', 'rgb', 'hsl')
      alpha = 1, // Opacity (0-1, defaults to fully opaque)
      hueRange = [0, 360], // Hue range (degrees)
      saturationRange = [0, 100], // Saturation range (percentage)
      lightnessRange = [0, 100], // Lightness range (percentage)
    } = options;
  
    // Validate input ranges
    if (
      hueRange[0] < 0 ||
      hueRange[0] > 360 ||
      hueRange[1] < 0 ||
      hueRange[1] > 360 ||
      hueRange[0] > hueRange[1] ||
      saturationRange[0] < 0 ||
      saturationRange[0] > 100 ||
      saturationRange[1] < 0 ||
      saturationRange[1] > 100 ||
      saturationRange[0] > saturationRange[1] ||
      lightnessRange[0] < 0 ||
      lightnessRange[0] > 100 ||
      lightnessRange[1] < 0 ||
      lightnessRange[1] > 100 ||
      lightnessRange[0] > lightnessRange[1]
    ) {
      throw new Error('Invalid range values. Please check hue, saturation, and lightness ranges.');
    }
  
    // Generate random numbers within ranges
    const hue = Math.floor(Math.random() * (hueRange[1] - hueRange[0] + 1)) + hueRange[0];
    const saturation = Math.floor(Math.random() * (saturationRange[1] - saturationRange[0] + 1)) + saturationRange[0];
    const lightness = Math.floor(Math.random() * (lightnessRange[1] - lightnessRange[0] + 1)) + lightnessRange[0];
  
    // Convert to HSL for manipulation
    const hsl = { h: hue, s: saturation / 100, l: lightness / 100 };
  
    // Convert HSL to RGB for compatibility with common formats
    const rgb = hslToRgb(hsl);
  
    // Convert RGB to hexadecimal format (optional)
    let color = format === 'hex' ? rgbToHex(rgb) : rgbToString(rgb, alpha);
  
    // Add leading # for hex format
    if (format === 'hex') {
      color = `#${color}`;
    }
  
    return color;
  }
  
  function hslToRgb(hsl) {
    const { h, s, l } = hsl;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;
  
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
      } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
      } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
      } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
      } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
      } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
      } else {
        r = 0;
        g = 0;
        b = 0;
      }
    
      // Add the calculated values to the RGB object and apply the lightness adjustment
      return { r: Math.round(r + m * 255), g: Math.round(g + m * 255), b: Math.round(b + m * 255) };
    }
    
    /**
     * Converts RGB color space to hexadecimal string format.
     *
     * @param {object} rgb - Object containing the RGB components.
     * @returns {string} The hexadecimal color string (#RRGGBB format).
     */
    function rgbToHex(rgb) {
      const { r, g, b } = rgb;
      const hex = [r.toString(16).padStart(2, '0'), g.toString(16).padStart(2, '0'), b.toString(16).padStart(2, '0')].join('');
      return hex.toUpperCase(); // Ensure uppercase hex representation
    }
    
    /**
     * Converts RGB color space to a string representation with alpha channel (optional).
     *
     * @param {object} rgb - Object containing the RGB components.
     * @param {number} alpha (optional) - Opacity value (0-1). Defaults to 1 (fully opaque).
     * @returns {string} The RGB string representation (e.g., "rgba(255, 0, 0, 1)").
     */
    function rgbToString(rgb, alpha = 1) {
      const { r, g, b } = rgb;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    // Export the main function for easy use
    module.exports = generateRandomColor;