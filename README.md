# ÖTEK Currency Converter

![ÖTEK - Shaping the Future of Technology and Finance](https://omertek.com/include/attachment/sitecontent/66b5e2f4017011.67907435.jpg)

**ÖTEK Currency Converter** is a lightweight browser extension that allows you to instantly convert selected currency values using the [xe.otek.today](https://xe.otek.today) API. Built with simplicity and efficiency in mind, this extension empowers users to perform fast, accurate currency conversions directly from any webpage.

Developed by **Ömer Kadir** at **Ömer Teknoloji (ÖTEK)**, this tool reflects our mission: *Turning your vision into reality through innovative digital solutions.*

---

## 🔧 Features

- ✅ **One-click currency conversion** via right-click context menu
- 💬 **Smart text detection**: Automatically extracts amount and currency from selected text
- 🌍 **Customizable target currencies**: Set your preferred currencies in settings
- 💾 **Persistent preferences**: Saves your settings across sessions
- 🔗 **Seamless integration**: Opens conversion result in a new tab
- 🌐 **Cross-browser compatible**: Works on Firefox and Chrome-based browsers

---

## 📦 Installation

### For Firefox
1. Download the extension package (`.xpi` file) or source code.
2. Open Firefox and go to `about:debugging`.
3. Click **"This Firefox"** → **"Load Temporary Add-on"**.
4. Select the `manifest.json` file from the extension folder.
5. The extension will be loaded and ready to use.

> To install permanently, package the extension as a `.xpi` and submit it to [addons.mozilla.org](https://addons.mozilla.org) or install via file drag-and-drop.

### For Chrome / Chromium Browsers
1. Go to `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **"Load unpacked"**
4. Select the extension folder
5. Extension is now active

---

## 🚀 How to Use

Follow these simple steps to convert any currency value on a webpage:

### Step 1: Select Currency Text
- Highlight any text containing a currency value (e.g., `$123`, `€45.99`, `₺1,200`, `£75`)
- Supported formats:
  - `$1,000.50` → USD
  - `€1.000,50` → EUR (comma as decimal)
  - `₺500` → TRY
  - `AZN 25` → AZN

### Step 2: Right-Click and Convert
- Right-click the selected text
- Choose **"Currency Conversion"**
- Select your desired target currency from the list (e.g., USD, EUR, GBP)

> The extension will automatically detect the source currency and amount.

### Step 3: View Conversion
- A new tab opens at `https://xe.otek.today/SOURCE/TARGET/AMOUNT`
- See the real-time converted value
- Example: `https://xe.otek.today/EUR/USD/100`

---

## ⚙️ Configure Preferences

You can customize which currencies appear in the context menu:

1. Click the **ÖTEK Currency Converter** icon in the browser toolbar
2. Click **"Options"** (or right-click the icon → "Options")
3. Check or uncheck currencies you want to use
4. Click **"Save Preferences"**
5. Your choices are saved instantly and synced across devices (if supported)

> Changes take effect immediately in the context menu.

---

## 🛠️ Technical Details

- **Manifest Version**: 2
- **API Used**: [https://xe.otek.today](https://xe.otek.today)
- **Permissions**:
  - `storage`: Save user preferences
  - `contextMenus`: Add menu item on right-click
  - `tabs`: Open conversion result in new tab
- **Core Files**:
  - `background.js`: Handles context menu logic and conversion
  - `options.html` + `options.js`: Settings UI
  - `manifest.json`: Extension configuration
  - `favicon.png`: Extension icon

---

## 🌐 About ÖTEK

> *"We believe technology has the power to transform businesses and improve lives."*

Founded in 2020, **Ömer Teknoloji (ÖTEK)** has become a trusted partner for businesses across Turkey and beyond. With over 25 years of combined industry expertise, we deliver innovative solutions in:

- 🖥️ Web & Mobile Application Development
- 🎨 UI/UX & Graphic Design
- 📊 Financial Reporting & Analysis
- 💡 Digital Transformation Consulting

We blend creativity with technical excellence to deliver exceptional results.

👉 Learn more: [https://omertek.com](https://omertek.com)

---

## 📞 Get in Touch

Ready to take the next step? Whether you have questions, need guidance, or want to start a new project — we're here to help.

✅ [Schedule a consultation with our experts](https://omertek.com)  
Let’s explore how ÖTEK can provide **custom solutions** and **innovative strategies** to support your business growth.

---

## 📜 License

This extension is developed by Ömer Kadir for ÖTEK. All rights reserved.  
For licensing or collaboration inquiries, please contact us via [https://omertek.com](https://omertek.com).

---

## 🙌 Thank You

Thank you for using **ÖTEK Currency Converter** — where innovation meets practicality.

*Built with precision. Designed for success.*  
**— ÖTEK | Shaping the Future of Technology and Finance**