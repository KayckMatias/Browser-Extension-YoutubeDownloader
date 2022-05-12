'use strict';

import './popup.css';

(function () {

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    let url = tabs[0].url;
    var url_ = url.split("watch?v=")[1]
    getYTData(url_)
    /*
    chrome.tabs.sendMessage(
      tab.id,
      {
        type: 'ytUrl'
      },
      response => {
        getYTData(response.url)
      }
    );*/
  });

  function getYTData(ytId) {
    let baseURL = 'https://youtube-downloader-api-nodejs.herokuapp.com/' + ytId;
    let getConfig = function () {
      let url = "".concat(baseURL, ytId);
      fetch(url)
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          Object.entries(data.formats.formats_info).forEach((entry) => {
            const [key, value] = entry;
            console.log(value.itag)
            var urlFinal = value.url
            document.getElementById('listDownload').innerHTML += '<a href="#!" class="downYT" linkYT=\'' + urlFinal + '\'>Baixar ' + value.quality + ' </a> <br>';
          })

          var ytTitle = data.name;
          document.getElementById('ytTitle').innerHTML = ytTitle;

          var buttonDown = document.getElementsByClassName('downYT');
          for (let i = 0; i < buttonDown.length; i++) {
            buttonDown[i].addEventListener("click", function () {
              downloadVideo(this.getAttribute('linkYT'));
            })
          }
        })

        .catch(function (err) {
          alert(err);
        });
    }
    getConfig();
  }

  function downloadVideo(url) {
    var action_url = url;
    chrome.tabs.create({ url: action_url });
  }
})();
