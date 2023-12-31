// content.js
// This is the file that will handle when YouTube is opened and show the popup

htmlContent = '<h1>Did you complete your work?</h1><button id="yesButton">Yes</button><button id="noButton">No</button>'
cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); z-index: 9999;'

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'showPopup') {
      // First, check for the internet connection
      if (!navigator.onLine) {
        return;
      }
      // Open the reminder popup
      if (!document.getElementById('workReminderPopup')) {
        var popup = document.createElement('div');
        popup.id = 'workReminderPopup';
        popup.innerHTML = htmlContent;
        popup.style.cssText = cssContent;
        document.body.appendChild(popup);

        document.getElementById('yesButton').addEventListener('click', function() {
          chrome.runtime.sendMessage({ action: 'workCompleted' });
          popup.remove();
        });

        document.getElementById('noButton').addEventListener('click', function() {
          chrome.runtime.sendMessage({ action: 'closeTab' });
          popup.remove();
        });
      }
    } else if (request.action === 'closePopup') {
      // Close the popup if it's open
      var popup = document.getElementById('workReminderPopup');
      if (popup) {
        popup.remove();
      }
    }
  }
);

// Check for YouTube page and show the popup
if (window.location.href.includes("youtube.com")) {
chrome.runtime.sendMessage({ action: 'showPopup' });
}