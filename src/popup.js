'use strict';

import './popup.css';

(function () {

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    let url = tab.url;
    if (matchYoutubeUrl(url)) {
      var url_ = url.split("watch?v=")[1]
      getYTData(url_)
    } else {
      dontYoutube()
    }
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

            const tr = document.createElement("tr");

            var tdtype = document.createElement('td');
            tdtype.textContent = value.type;
            tr.appendChild(tdtype);

            var tdquality = document.createElement('td');
            tdquality.textContent = value.quality;
            tr.appendChild(tdquality);

            var tdextension = document.createElement('td');
            tdextension.textContent = value.extension;
            tr.appendChild(tdextension);

            var tdvideo = document.createElement('td');
            tdvideo.textContent = value.video;
            tr.appendChild(tdvideo);

            var tdaudio = document.createElement('td');
            tdaudio.textContent = value.audio;
            tr.appendChild(tdaudio);

            var tdlength = document.createElement('td');
            tdlength.textContent = value.length;
            tr.appendChild(tdlength);

            var tddownload = document.createElement('td');
            tddownload.innerHTML = '<a href="#!" class="downYT" linkYT=\'' + urlFinal + '\'>Baixar</a>';
            tr.appendChild(tddownload);

            document.getElementById("listDownload").appendChild(tr);
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

  function dontYoutube() {
    document.getElementById('ytTitle').innerHTML = "Você não está em um link válido do youtube";
    document.getElementById('tableDownload').style.display = 'none';
  }

  function downloadVideo(url) {
    var action_url = url;
    chrome.tabs.create({ url: action_url });
  }
  function matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return true;
    }
    return false;
  }
})();
