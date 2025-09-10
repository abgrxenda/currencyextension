let selectedCurrency = "USD"; // Default to USD

// Use browser namespace (works in Firefox and Chrome)
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.parentMenuItemId === "otekCurrency") {
    selectedCurrency = info.menuItemId; // Update the selected currency

    const selection = info.selectionText.trim();
    let rawAmount = selection.replace(/[^0-9.,]/g, ""); // Extract numeric part
    let currency = selection.replace(rawAmount, "").trim(); // Extract currency symbol/code

    let amount = "";

    // Handle decimal comma format (e.g., 1.000,50 → 1000.50)
    if (/,[0-9]{2}$/.test(rawAmount)) {
      amount = rawAmount.replace(/\./g, "").replace(",", ".");
    } else {
      amount = rawAmount.replace(/,/g, ""); // Assume comma is thousands separator
    }

    // Map symbols and common codes to ISO codes
    const symbolToCode = {
      "$": "USD",
      "USD": "USD",
      "€": "EUR",
      "EUR": "EUR",
      "£": "GBP",
      "GBP": "GBP",
      "TL": "TRY",
      "TRY": "TRY",
      "₺": "TRY",
      "₼": "AZN",
      "Br": "BYN",
      "BZ$": "BZD",
      "P": "BWP",
      "лв": "BGN",
      "": "USD", // fallback
    };

    currency = symbolToCode[currency] || currency;
    const targetCurrency = await getPreferredCurrency();
    
    console.log('⭕⭕⭕ DEBUG: Parsed - amount:', amount, 'from:', currency, 'to:', targetCurrency);

    // Store conversion data in browser storage for popup
    const conversionData = {
      fromCurrency: currency,
      toCurrency: targetCurrency,
      amount: amount,
      timestamp: Date.now()
    };

    try {
      await browser.storage.local.set({ conversionData });
      console.log('⭕⭕⭕ DEBUG: Stored conversion data:', conversionData);
      
      // Create popup window
      const popupWindow = await browser.windows.create({
        url: browser.runtime.getURL('popup.html'),
        type: 'popup',
        width: 400,
        height: 330,
        focused: true
      });

      // Optional: Close popup automatically after 30 seconds
      setTimeout(async () => {
        try {
          await browser.windows.remove(popupWindow.id);
        } catch (error) {
          // Window might already be closed
          console.log('⭕⭕⭕ Popup window already closed or removed');
        }
      }, 30000);

    } catch (error) {
      console.error('⭕⭕⭕ Failed to create popup:', error);
      
      // Fallback: open in new tab with parameters
      const url = `popup.html?from=${currency}&to=${targetCurrency}&amount=${amount}`;
      browser.tabs.create({ 
        url: browser.runtime.getURL(url)
      });
    }
  }
});

// Define the getPreferredCurrency function to fetch user's preferred currency from storage.
function getPreferredCurrency() {
  return selectedCurrency;
}

// Refresh context menu
async function refreshContextMenu() {
  await browser.contextMenus.removeAll();

  browser.contextMenus.create({
    id: "otekCurrency",
    title: "Currency Conversion",
    contexts: ["selection"],
  });

  try {
    const result = await browser.storage.sync.get(["preferredCurrencies"]);
    const savedCurrencies = result.preferredCurrencies || ["USD"];

    savedCurrencies.forEach((currency) => {
      browser.contextMenus.create({
        id: currency,
        title: currency,
        parentId: "otekCurrency",
        contexts: ["selection"],
      });
    });
  } catch (error) {
    console.error("⭕⭕⭕ Failed to load saved currencies:", error);
    // Fallback: create USD
    browser.contextMenus.create({
      id: "USD",
      title: "USD",
      parentId: "otekCurrency",
      contexts: ["selection"],
    });
  }
}

// Handle messages from popup or options
browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "refreshContextMenu") {
    refreshContextMenu();
  } else if (message.action === "getConversionData") {
    // Send conversion data to popup if requested
    try {
      const result = await browser.storage.local.get(['conversionData']);
      return Promise.resolve(result.conversionData || null);
    } catch (error) {
      console.error('⭕⭕⭕ Failed to get conversion data:', error);
      return Promise.resolve(null);
    }
  } else if (message.action === "performConversion") {
    // Perform conversion and return result
    const { fromCurrency, toCurrency, amount } = message.data;
    try {
      const response = await fetch(`http://xe.otek.today/${fromCurrency}/${toCurrency}/${amount}`);
      const result = await response.json();
      return Promise.resolve({ success: true, data: result });
    } catch (error) {
      console.error('⭕⭕⭕ Conversion API error:', error);
      return Promise.resolve({ success: false, error: error.message });
    }
  }
});

// Rebuild context menu on startup and install
browser.runtime.onStartup.addListener(refreshContextMenu);
browser.runtime.onInstalled.addListener(refreshContextMenu);