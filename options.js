document.getElementById('currencyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedCurrencies = [];
    document.querySelectorAll('input[name="currency"]:checked').forEach(checkbox => {
        selectedCurrencies.push(checkbox.value);
    });

    chrome.storage.sync.set({preferredCurrencies: selectedCurrencies}, function() {
        alert('Preferences saved.');
    });
});

// Load previously saved preferences
window.onload = function() {
    chrome.storage.sync.get(['preferredCurrencies'], function(result) {
        const savedCurrencies = result.preferredCurrencies || [];
        savedCurrencies.forEach(currencyCode => {
            document.querySelector(`input[value="${currencyCode}"]`).checked = true;
        });
    });
};
