document.addEventListener('DOMContentLoaded', function () {
    const langToggle = document.getElementById('langToggle');

    langToggle.addEventListener('change', function () {
        if (langToggle.checked) {
            chrome.storage.sync.set({ lang: 'fr' });
        } else {
            chrome.storage.sync.set({ lang: 'en' });
        }
    });

    chrome.storage.sync.get(['lang'], function (result) {
        if (result.lang === 'fr') {
            langToggle.checked = true;
        } else {
            langToggle.checked = false;
        }
    });
});