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

    // Construct URL (note: no space in URL)
    const url = `https://xe.otek.today/${currency}/${targetCurrency}/${amount}`;
    
    // Open conversion page
    browser.tabs.create({ url });
  }
});

// Get user's preferred currency from storage
async function getPreferredCurrency() {
  try {
    const result = await browser.storage.sync.get(["preferredCurrencies"]);
    const savedCurrencies = result.preferredCurrencies || [];
    return savedCurrencies[0] || "USD"; // Return first saved currency or default
  } catch (error) {
    console.error("Failed to get preferred currency:", error);
    return "USD";
  }
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
    console.error("Failed to load saved currencies:", error);
    // Fallback: create USD
    browser.contextMenus.create({
      id: "USD",
      title: "USD",
      parentId: "otekCurrency",
      contexts: ["selection"],
    });
  }
}

// Rebuild context menu on startup and install
browser.runtime.onStartup.addListener(refreshContextMenu);
browser.runtime.onInstalled.addListener(refreshContextMenu);