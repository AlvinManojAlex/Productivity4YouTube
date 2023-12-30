// background.js
// Listen for messages and interact with YouTube depending on user's actions

let isWorkCompleted = false;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === 'workCompleted') {
        isWorkCompleted = true;
        // Close the popup
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'closePopup' });
        });
      } else if (request.action === 'showPopup') {
        // Open the reminder popup
        chrome.tabs.create({ url: chrome.extension.getURL('popup.html'), active: true });
      }
    }
  );
  