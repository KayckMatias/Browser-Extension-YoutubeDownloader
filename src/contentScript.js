'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    var url_ = url.split("watch?v=")[1]
    console.log(url_)
    if (request.type === 'ytUrl') {
      sendResponse({
        url_,
      });
    }
  });
});
