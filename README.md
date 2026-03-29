# ÖTEK Currency Converter

A Firefox browser extension that allows users to quickly convert currencies by selecting text on any webpage and using the right-click context menu. The extension uses a custom Node.js API that scrapes real-time exchange rates from XE.com.

![Extension Demo](https://img.shields.io/badge/Firefox-Extension-orange)
![Extension Demo](https://img.shields.io/badge/Chrome-Extension-green)
![Version](https://img.shields.io/badge/Version-2.0.1-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Context Menu Integration**: Right-click on any currency amount to convert it
- **Beautiful Popup Interface**: Modern glassmorphism design with smooth animations
- **Real-time Exchange Rates**: Powered by XE.com through custom API
- **Multiple Currency Support**: Supports major currencies (USD, EUR, GBP, TRY, etc.)
- **Smart Number Parsing**: Handles various number formats with commas and different separators
- **Customizable Currency List**: Add/remove preferred currencies through options
- **Auto-close Functionality**: Popup automatically closes after 30 seconds
- **Error Handling**: Graceful error handling with retry functionality

## Screenshots

### Context Menu
![Context Menu](https://otek.today/files/Context+Menu+Screenshot.png)

### Conversion Popup
![Popup Interface](https://otek.today/files/Popup+Interface+Screenshot.png)

### Options Page
![Options](https://otek.today/files/Options+Page+Screenshot.png)

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/abgrxenda/currencyextension.git
   cd currencyextension
   ```

2. Open Firefox and navigate to `about:debugging`

3. Click "This Firefox" → "Load Temporary Add-on"

4. Select the `manifest.json` file from the project directory

### From Firefox Add-ons Store

*Coming soon...*

## API Setup

This extension requires the ÖTEK Currency API to be running. You can set up your own instance:

### ÖTEK Currency API
![Visit ÖTEK Currency API](https://github.com/abgrxenda/otek-currencyapi)

## Usage

1. **Select Currency Text**: Highlight any currency amount on a webpage (e.g., "$100", "€50", "£25")

2. **Right-click**: Open the context menu

3. **Choose Currency**: Select "Currency Conversion" → Choose target currency

4. **View Result**: A beautiful popup will display the conversion result

### Supported Text Formats

The extension recognizes various currency formats:
- `$100` → USD 100
- `€1,234.56` → EUR 1234.56
- `£50.00` → GBP 50
- `1000 TL` → TRY 1000
- `₺500` → TRY 500

## File Structure

```
otek-currency-converter/
├── manifest.json          # Extension manifest
├── background.js          # Background script (context menu logic)
├── popup.html            # Popup interface
├── popup.js             # Popup functionality
├── options.html         # Extension options page
├── favicon.png          # Extension icon
└── README.md           # This file
```

## Configuration

### Adding Custom Currencies

1. Click the extension icon in Firefox toolbar
2. Go to Options
3. Add your preferred currencies
4. Save settings

### API Configuration

To use a different API endpoint, modify the URL in `background.js` and `popup.js`:

```javascript
const url = `http://your-api-domain.com/${fromCurrency}/${toCurrency}/${amount}`;
```

## Technical Details

### Extension Architecture

- **Manifest V2**: Compatible with Firefox
- **Background Script**: Handles context menu creation and data storage
- **Popup Window**: Displays conversion results with modern UI
- **Browser Storage**: Stores user preferences and temporary conversion data

### API Integration

The extension communicates with a Node.js API that:
- Scrapes real-time rates from XE.com using Cheerio
- Provides CORS support for browser requests
- Returns clean JSON responses

### Security Features

- **Content Security Policy**: Prevents inline scripts
- **CORS Headers**: Proper cross-origin request handling
- **Input Validation**: Sanitizes user input and API responses

## Browser Support

- **Firefox**: 60+ (Primary target)
- **Chrome**: Compatible with minor modifications
- **Edge**: Compatible with minor modifications

## Development

### Prerequisites

- Firefox Developer Edition (recommended)
- Node.js for API development
- Basic knowledge of WebExtensions API

### Building

1. Make your changes to the source files
2. Test using `about:debugging` in Firefox
3. Validate using Firefox's web-ext tool:
   ```bash
   npx web-ext lint
   ```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Troubleshooting

### Common Issues

**Extension doesn't appear in context menu:**
- Check that the extension is properly loaded
- Verify you're selecting text that contains numbers

**Conversion fails:**
- Ensure the API server is running
- Check browser console for CORS errors
- Verify network connectivity

**Popup shows "N/A":**
- Check API response format
- Verify currency codes are supported
- Check for JavaScript errors in popup console

### Debug Mode

Enable debug logging by opening the browser console:

1. **Background Script**: `about:debugging` → Inspect extension
2. **Popup Console**: Right-click popup → Inspect Element
3. **Main Page**: F12 → Console tab

## Privacy Policy

This extension:
- Does not collect personal data
- Does not track user behavior
- Only stores user currency preferences locally
- Makes requests only to the configured currency API

## License

This project is licensed under the MIT License - see the [LICENSE](license.md) file for details.

## Changelog

### v1.9.2 (Latest)
- Fixed inline script CSP warnings
- Added data collection permissions
- Improved number parsing for comma-separated values
- Enhanced error handling and debugging

### v1.9.1
- Added popup interface for conversion results
- Improved UI with glassmorphism design
- Added auto-close functionality
- Better error handling and retry mechanism

### v1.0.0
- Initial release
- Basic context menu functionality
- XE.com API integration

## Credits

- **Developer**: Ömer Kadir
- **Website**: [omertek.com](https://omertek.com/)
- **Exchange Rates**: Powered by XE.com
- **Icons**: Custom designed

## Support

For support, bug reports, or feature requests:
- Open an issue on GitHub
- Visit [omertek.com](https://omertek.com/)
- Email: [hello@omertek.com]

---

**⭐ If you find this extension useful, please give it a star on GitHub!**