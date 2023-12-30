// content.js
// This is the file that will handle when YouTube is opened and show the popup

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === 'showPopup') {
        chrome.runtime.sendMessage({ action: 'showPopup' });
      } else if (request.action === 'closePopup') {
        window.close();
      }
    }
  );
  
  // Check for YouTube page and show the popup
  if (window.location.href.includes("youtube.com")) {
    chrome.runtime.sendMessage({ action: 'showPopup' });
  }
  