// content.js
// This is the file that will handle when YouTube is opened and show the popup

// Declare a variable to store the HTML string
const popupTemplateHTML = '<div id="workReminderPopup"><h1>Did you complete your work?</h1><button id="yesButton">Yes</button><button id="noButton">No</button></div>';

const popupStyle = `
position: fixed;
top: 52%;
left: 58%;
transform: translate(-50%, -50%);
background: black;
color: white;
font-size: 2rem;
text-align: center;
padding: 3rem 20rem 20rem 20rem;
z-index: 999;
border-radius: 10px;
width: 80rem;
height: 25rem;
`

const buttonStyle = `
display: inline-block;
width: calc(40% - 1rem);
padding: 2rem 0 2rem 0;
margin: 20rem 2rem 0 2rem;
border: none;
border-radius: 50px;
background: #171717;
color: white;
font-size: 2.5rem;
font-weight: bold;
cursor: pointer;
`

// Function to show the popup
function showPopup() {
  // Check for internet connection
  if (navigator.onLine) {
    // Open the reminder popup
    if (!document.getElementById('workReminderPopup')) {
      var popup = document.createElement('div');
      popup.id = 'workReminderPopup';
      popup.innerHTML = popupTemplateHTML;
      popup.style.cssText = popupStyle;

      document.body.appendChild(popup);

      // Apply styles to the buttons
      document.getElementById('yesButton').style.cssText = buttonStyle;
      document.getElementById('noButton').style.cssText = buttonStyle;

      document.getElementById('yesButton').addEventListener('click', function() {
        chrome.runtime.sendMessage({ action: 'workCompleted' });
        popup.remove();
      });

      document.getElementById('noButton').addEventListener('click', function() {
        chrome.runtime.sendMessage({ action: 'closeTab' });
        popup.remove();
      });
    }
  }
}

// Function to close the popup
function closePopup() {
  // Close the popup if it's open
  var popup = document.getElementById('workReminderPopup');
  if (popup) {
    popup.remove();
  }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'showPopup') {
    // Call the function to show the popup
    showPopup();
  } else if (request.action === 'closePopup') {
    // Call the function to close the popup
    closePopup();
  }
});

// Check for YouTube page and show the popup
if (window.location.href.includes("youtube.com")) {
  chrome.runtime.sendMessage({ action: 'showPopup' });
}
