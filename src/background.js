'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GREETINGS') {
    const message = 'hi :D';

    console.log(request.payload.message);
    sendResponse({
      message,
    });
  }
});
