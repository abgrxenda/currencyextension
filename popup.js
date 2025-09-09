let conversionData = null;

// Get conversion data from URL parameters or storage
async function getConversionData() {
    const urlParams = new URLSearchParams(window.location.search);
    const fromCurrency = urlParams.get('from');
    const toCurrency = urlParams.get('to');
    const amount = urlParams.get('amount');

    if (fromCurrency && toCurrency && amount) {
        return { fromCurrency, toCurrency, amount };
    }

    // Fallback: get from browser storage (set by background script)
    try {
        const result = await browser.storage.local.get(['conversionData']);
        console.log('DEBUG: Retrieved from storage:', result.conversionData);
        return result.conversionData;
    } catch (error) {
        console.error('Failed to get conversion data:', error);
        return null;
    }
}

// Perform currency conversion
async function performConversion(data) {
    if (!data) {
        throw new Error('No conversion data available');
    }

    const { fromCurrency, toCurrency, amount } = data;
    const url = `http://xe.otek.today/${fromCurrency}/${toCurrency}/${amount}`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
}

// Helper function to safely parse numbers with commas
function parseNumber(value) {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return NaN;
    
    // Remove thousands separators (commas) and parse
    const cleanValue = value.replace(/,/g, '');
    return parseFloat(cleanValue);
}

// Display conversion result
function displayResult(data, result) {
    const { fromCurrency, toCurrency, amount } = data;
    
    console.log('DEBUG: Displaying result for:', data, 'with API result:', result);
    
    let convertedAmount;
    let exchangeRate;
    
    // Your API returns the converted amount directly as a string/number
    if (typeof result === 'string' || typeof result === 'number') {
        convertedAmount = parseNumber(result);
        const inputAmount = parseNumber(amount);
        exchangeRate = inputAmount > 0 ? (convertedAmount / inputAmount).toFixed(6) : 'N/A';
    } else if (typeof result === 'object' && result !== null) {
        // Fallback for object responses (just in case your API changes)
        convertedAmount = parseNumber(result.convertedAmount || result.result || result.value || result.amount || result.converted || 'N/A');
        exchangeRate = result.rate || result.exchangeRate || result.exchange_rate || result.conversion_rate || 'N/A';
        
        if (result.success !== undefined && !result.success) {
            throw new Error(result.error || result.message || 'Conversion failed');
        }
    } else {
        convertedAmount = 'N/A';
        exchangeRate = 'N/A';
    }
    
    // Format the numbers nicely
    if (!isNaN(convertedAmount)) {
        convertedAmount = convertedAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
        });
    }
    
    if (!isNaN(parseFloat(exchangeRate))) {
        exchangeRate = parseFloat(exchangeRate).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6
        });
    }
    
    document.getElementById('fromAmount').textContent = `${amount} ${fromCurrency}`;
    document.getElementById('toAmount').textContent = `${convertedAmount} ${toCurrency}`;
    document.getElementById('exchangeRate').textContent = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
    
    document.getElementById('loading').style.display = 'none';
    document.getElementById('result').style.display = 'block';
}

// Display error
function displayError(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}

// Initialize popup
async function init() {
    try {
        conversionData = await getConversionData();
        
        if (!conversionData) {
            displayError('No conversion data found. Please try selecting a currency amount again.');
            return;
        }

        const result = await performConversion(conversionData);
        displayResult(conversionData, result);
        
    } catch (error) {
        console.error('Conversion failed:', error);
        displayError(`Conversion failed: ${error.message}`);
    }
}

// Event handlers
function handleCloseClick() {
    window.close();
}

function handleRetryClick() {
    document.getElementById('error').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    init();
}

function handleKeyDown(e) {
    if (e.key === 'Escape') {
        window.close();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    document.getElementById('closeBtn').addEventListener('click', handleCloseClick);
    document.getElementById('retryBtn').addEventListener('click', handleRetryClick);
    document.addEventListener('keydown', handleKeyDown);
    
    // Initialize the popup
    init();
});