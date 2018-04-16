// document loaded
(function () {
  // LOG ERRORS TO SERVER LOG
  window.onerror = function (msg, url, line, col, error) {
    /* document.write(msg);
    document.write(url);
    document.write(line);
    document.write(col);
    document.write(error); */
    var req = new XMLHttpRequest();
    var params = 'msg=' + encodeURIComponent(msg) + '&url=' + encodeURIComponent(url) + '&line=' + line + '&col=' + col + '&error=' + error;
    req.onreadystatechange = function () {
      if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
        console.log(req);
      }
    }
    req.open('POST', 'https://screensaver.metazoa.org/screensaver/log/index.php');
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send(params);
  }

})();

var DEBUG = false;

function youtubeAPIInit (iframeId) {
  log('youtubeAPIInit', iframeId)
  var tag = document.createElement('script')
  tag.id = 'iframe-js'
  tag.src = 'https://www.youtube.com/iframe_api'
  var firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
}

var player

function onYouTubeIframeAPIReady () {
  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  player = new YT.Player('iframe-video', {
    playerVars: {
      'controls': 0,
      'color': 'white',
      'disablekb': 1,
      'enablejsapi': 1,
      'fs': 0,
      'iv_load_policy': 3,
      'modestbranding': 1,
      'origin': 'metazoa.org',
      'showinfo': 0,
      'rel': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  })
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady (event) {
  log('onPlayerReady', event)
  var plyr = event.target;
  plyr.playVideo() // play
  plyr.setVolume(5); // volume in %
  plyr.hideVideoInfo();
  
}
function onPlayerPlaybackQualityChange (event) {
  // log('onPlayerPlaybackQualityChange', event)
}
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange (playerStatus) {
  if (playerStatus.data == -1) {
    // unstarted
    log('unstarted', playerStatus.target)
    playerStatus.target.playVideo()
  } else if (playerStatus.data == 0) {
    // ended
    log('ended', playerStatus.target)
    playerStatus.target.playVideo() // loop
  } else if (playerStatus.data == 1) {
    // playing
  } else if (playerStatus.data == 2) {
    // paused
    log('paused', playerStatus.target)
    playerStatus.target.playVideo()
  } else if (playerStatus.data == 3) {
    // buffering = purple
  } else if (playerStatus.data == 5) {
    // video cued = orange
  }
}
function onPlayerError (event) {
  log('onPlayerError', event)
}
function stopVideo () {
  log('stopVideo')
  player.stopVideo()
}

function hideDescription(selector, time) {
    setTimeout(function(){fadeOut(selector);}, time);
}

function fadeOut(selector) {
    var el = document.querySelector(selector);
    // credit to:
    // http://www.chrisbuttery.com/articles/fade-in-fade-out-with-javascript/
    el.style.opacity = 0.7;
    (function fade() {
      if ((el.style.opacity -= .1) < 0) {
        el.style.display = 'none';
      } else {
          // do nothing
          requestAnimationFrame(fade);
      }
    })();
}

// change color for each element child
function changeColorForEachChild(elm) {
    // console.log('changeColorForEachParagraph', elm);
    var children = elm.children;
    log(children);
    for (var i = 0; i < children.length; i++) {
        children[i].style.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    }
}

// return random number from to
function randomFromTo(from, to) {
    return Math.floor(Math.random() * to) + from
}

function log(msg, val) {
    if (DEBUG) {
        console.log(msg, val);
    }
}