// popup.js
// This is the file that will handle the button clicks in the popup html file

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('yesButton').addEventListener('click', function() {
      chrome.runtime.sendMessage({ action: 'workCompleted' });
      window.close();
    });
  
    document.getElementById('noButton').addEventListener('click', function() {
      chrome.runtime.sendMessage({action: 'showPopup'})
      window.close();
    });
  });
  