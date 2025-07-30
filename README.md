# ÖTEK Code Generator

![ÖTEK - Teknoloji ve Finansın Geleceğini Şekillendiriyoruz](https://omertek.com/include/attachment/sitecontent/66b5e2f4017011.67907435.jpg)

**ÖTEK Code Generator** is a powerful, lightweight browser extension that allows you to instantly generate secure passwords directly within any input field — with just one click. Developed by **Ömer Kadir** at **Ömer Teknoloji (ÖTEK)**, this tool embodies our mission: *Turning your vision into reality through innovative digital solutions.*

Whether you're signing up for a new service or updating your credentials, ÖTEK Code Generator delivers fast, customizable, and clipboard-copied passwords — all while maintaining maximum security and ease of use.

---

## 🔧 Features

- ✅ **One-click password generation** via right-click context menu
- 💬 **Smart input detection**: Automatically fills the active text field
- 🔐 **Fully customizable**: Choose length, numbers, special characters, and alphabet inclusion
- 💾 **Persistent preferences**: Saves your settings across devices via `storage.sync`
- 🌍 **Multilingual support**: Built with international users in mind (`__MSG_...__`)
- 📋 **Auto-copy to clipboard**: Generated password is copied instantly
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

Follow these simple, logical steps to generate secure passwords anywhere:

### Step 1: Open a Form with a Text Field
- Navigate to any website with a password or text input field (e.g., sign-up, login, or profile page)
- Click inside the field where you want the password

### Step 2: Generate a Password
- Right-click the input field
- Select **"Generate Password"** from the context menu
- ✅ The password is:
  - Automatically generated based on your saved settings
  - Inserted into the current field
  - Copied to your clipboard

> No extra clicks. No switching tabs. Just instant security.

---

## ⚙️ Configure Your Settings

Personalize how your passwords are generated:

### Step 1: Open the Options Page
- Click the **ÖTEK Code Generator** icon in the browser toolbar
- The **Options Popup** will appear

### Step 2: Adjust Password Settings
You can customize:
- 🔢 **Password Length**: Set number of characters (e.g., 8, 12, 16)
- ✅ **Include Numbers**: Check to add `0-9`
- ✅ **Include Special Characters**: Check to add `!@#$-=+`
- ✅ **Include Alphabet**: Check to add `A-Za-z`

### Step 3: Save Preferences
- Click **"Save"**
- Your settings are saved instantly and will be used for all future generations

> Changes apply immediately — no restart needed.

---

## 🛠️ Technical Details

- **Manifest Version**: 2
- **Core Functionality**: Context menu + content script injection
- **Permissions**:
  - `storage`: Save and sync user preferences
  - `contextMenus`: Add "Generate Password" option
  - `scripting`: Inject `content.js` into the page
  - `tabs`: Required for script injection
  - `<all_urls>`: Needed to work on all sites
- **Key Files**:
  - `background.js`: Manages context menu and script injection
  - `content.js`: Runs in the page to fill the input and copy to clipboard
  - `options.html` + `options.js`: Settings UI with localization
  - `manifest.json`: Extension configuration
  - `images/icon*.png`: Extension icons

---

## 🌐 About ÖTEK

> *"Vizyonunuzu Gerçeğe Dönüştürüyoruz"*

At **Ömer Teknoloji (ÖTEK)**, we believe technology has the power to transform businesses and improve lives. Founded in 2020, we’ve become a trusted partner for companies across Turkey and beyond. With over **25 years of combined industry expertise**, we deliver innovative solutions in:

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

Thank you for using **ÖTEK Code Generator** — where innovation meets practicality.

*Built with precision. Designed for success.*  
**— ÖTEK | Shaping the Future of Technology and Finance**