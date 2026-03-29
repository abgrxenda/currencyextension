let selectedCurrency = "USD";

// ✅ REMOVED: chrome.contextMenus = chrome.menus — this was the crash.
// chrome.menus is Firefox-only and undefined in Chrome,
// so that line was wiping out chrome.contextMenus entirely.

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.parentMenuItemId === "otekCurrency") {
    selectedCurrency = info.menuItemId;

    const selection = info.selectionText.trim();
    let rawAmount = selection.replace(/[^0-9.,]/g, "");
    let currency = selection.replace(rawAmount, "").trim();

    let amount = "";

    if (/,[0-9]{2}$/.test(rawAmount)) {
      amount = rawAmount.replace(/\./g, "").replace(",", ".");
    } else {
      amount = rawAmount.replace(/,/g, "");
    }

    const symbolToCode = {
      "$": "USD",
      "€": "EUR",
      "£": "GBP",
      "TL": "TRY",
      "₺": "TRY",
      "₼": "AZN",
      "Br": "BYN",
      "BZ$": "BZD",
      "P": "BWP",
      "лв": "BGN",
      "฿": "THB",
      "": "USD",
    };

    currency = symbolToCode[currency] || currency;
    const targetCurrency = getPreferredCurrency();

    console.log('⭕⭕⭕ DEBUG: Parsed - amount:', amount, 'from:', currency, 'to:', targetCurrency);

    const conversionData = {
      fromCurrency: currency,
      toCurrency: targetCurrency,
      amount: amount,
      timestamp: Date.now()
    };

    try {
      await chrome.storage.local.set({ conversionData });
      console.log('⭕⭕⭕ DEBUG: Stored conversion data:', conversionData);

      // ✅ chrome.browserAction does not exist in MV3.
      // Opening a new window is the most reliable approach.
      await chrome.windows.create({
        url: chrome.runtime.getURL('popup.html'),
        type: 'popup',
        width: 440,
        height: 410,
        focused: true
      });

    } catch (error) {
      console.error('⭕⭕⭕ Failed to open popup window:', error);
    }
  }
});

function getPreferredCurrency() {
  return selectedCurrency;
}

async function refreshContextMenu() {
  try {
    await chrome.contextMenus.removeAll();
  } catch (error) {
    console.warn("Could not remove existing menus:", error);
  }

  try {
    chrome.contextMenus.create({
      id: "otekCurrency",
      title: "Convert Currency",
      contexts: ["selection"]
    });
  } catch (error) {
    console.error("Failed to create parent menu:", error);
    return;
  }

  let savedCurrencies = [];

  try {
    const result = await chrome.storage.sync.get("preferredCurrencies");
    console.log("🔍 Retrieved from storage:", result);

    if (Array.isArray(result.preferredCurrencies) && result.preferredCurrencies.length > 0) {
      savedCurrencies = result.preferredCurrencies;
    } else {
      console.warn("No valid currencies found in storage, falling back to USD");
      savedCurrencies = ["USD"];
    }
  } catch (error) {
    console.error("💥 Failed to load preferred currencies:", error);
    savedCurrencies = ["USD"];
  }

  for (const currency of savedCurrencies) {
    try {
      chrome.contextMenus.create({
        id: currency,
        title: currency,
        parentId: "otekCurrency",
        contexts: ["selection"]
      });
      console.log(`✅ Created menu: ${currency}`);
    } catch (error) {
      console.error(`❌ Failed to create menu for ${currency}:`, error);
    }
  }
}

// ✅ onMessage: return true to keep the channel open for async sendResponse
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "refreshContextMenu") {
    refreshContextMenu().then(() => sendResponse({ ok: true }));
    return true; // keep channel open

  } else if (message.action === "getConversionData") {
    chrome.storage.local.get(['conversionData']).then(result => {
      sendResponse(result.conversionData || null);
    }).catch(error => {
      console.error('⭕⭕⭕ Failed to get conversion data:', error);
      sendResponse(null);
    });
    return true; // keep channel open

  } else if (message.action === "performConversion") {
    const { fromCurrency, toCurrency, amount } = message.data;
    // ✅ Using https:// — http:// is blocked by Chrome MV3
    fetch(`https://xe.otek.today/${fromCurrency}/${toCurrency}/${amount}`)
      .then(res => res.json())
      .then(data => sendResponse({ success: true, data }))
      .catch(error => {
        console.error('⭕⭕⭕ Conversion API error:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // keep channel open
  }
});

chrome.runtime.onStartup.addListener(refreshContextMenu);
chrome.runtime.onInstalled.addListener(refreshContextMenu);