// options.js

console.log("💥💥💥 OptionsResolver: Script loaded");

document.getElementById('currencyForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  console.log("💥💥💥 OptionsResolver: Form submitted");

  const selectedCurrencies = [];
  document.querySelectorAll('input[name="currency"]:checked').forEach(checkbox => {
    selectedCurrencies.push(checkbox.value);
  });

  console.log("💥💥💥 OptionsResolver: Selected currencies:", selectedCurrencies);

  try {
    await browser.storage.sync.set({ preferredCurrencies: selectedCurrencies });
    console.log("💥💥💥 OptionsResolver: Saved successfully");
    alert('Preferences saved.');
  } catch (error) {
    console.error("💥💥💥 OptionsResolver: Save failed:", error);
    alert('Save failed: ' + error.message);
  }
});

window.addEventListener('load', async () => {
  console.log("💥💥💥 OptionsResolver: Page loaded, loading saved data...");

  try {
    const result = await browser.storage.sync.get(['preferredCurrencies']);
    console.log("💥💥💥 OptionsResolver: Retrieved from storage:", result);

    const savedCurrencies = result.preferredCurrencies || [];
    savedCurrencies.forEach(currencyCode => {
      const checkbox = document.querySelector(`input[value="${currencyCode}"]`);
      if (checkbox) {
        checkbox.checked = true;
        console.log("💥💥💥 OptionsResolver: Checked:", currencyCode);
      } else {
        console.warn("💥💥💥 OptionsResolver: No checkbox found for:", currencyCode);
      }
    });
  } catch (error) {
    console.error("💥💥💥 OptionsResolver: Load failed:", error);
  }
});