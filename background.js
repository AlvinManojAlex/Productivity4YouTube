// background.js
// Listen for messages and interact with YouTube depending on user's actions

let isWorkCompleted = false;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'workCompleted') {
      // Mark work as completed (you can add additional logic here)
      isWorkCompleted = true;

      // Close the popup
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'closePopup' });
      });
    } else if (request.action === 'closeTab') {
      // Close the current tab
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.remove(tabs[0].id);
      });
    } else if (request.action === 'showPopup') {
      // Send a message to the content script to show the popup
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'showPopup' });
      });
    }
  }
);
  