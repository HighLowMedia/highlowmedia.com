var Matrix = function() {

    let _audioActive = false;
    let _audioPlaying = false;
    let _audioMuted = false;

    let _audioCtx;
    let _oscillator;
    let _gainNode;

    async function _getRandomWikimediaImage() {
        const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=random&grnnamespace=6&grntype=file&prop=imageinfo&iiprop=url&format=json&origin=*`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          const pages = data.query.pages;
          const imageId = Object.keys(pages)[0];
          const imageUrl = pages[imageId].imageinfo[0].url;
          return imageUrl;
        } catch (error) {
          console.error("Error fetching image:", error);
          return null;
        }
    }

    var _isPngOrJpg = function(filename) {
        if (typeof filename !== 'string') {
          return false; // filename is not a string
        }
        const lowerCaseFilename = filename.toLowerCase();
        return (lowerCaseFilename.endsWith('.png') || lowerCaseFilename.endsWith('.jpg') || lowerCaseFilename.endsWith('.jpeg'));
      }

    var _openSelection = function(color) {
        _getRandomWikimediaImage().then(imageUrl => {
            if (imageUrl) {
                if (_isPngOrJpg(imageUrl)) {
                    $('#container-selection > div').append('<img src="'+imageUrl+'" alt="This is a random image form the Wikimedia Creative Commons API." border="0" />');
                } else {
                    $('#container-selection > div').append('<img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/%E5%A4%9C%E5%8F%89%E9%AC%BC.JPG" alt="​夜叉鬼" border="0" />');
                }   
            } else {
                $('#container-selection > div').append('<img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/%E5%A4%9C%E5%8F%89%E9%AC%BC.JPG" alt="​夜叉鬼" border="0" />');
            }
        });
        $('#container-selection > div').css('background-color', color);
        $('#container-selection').css('z-index', '2');
        $('#container-selection > div').addClass('show');
    }

    var _closeSelection = function(color) {
        $('#container-selection > div').removeClass('show');
        $('#container-selection').css('z-index', '0');
        $('#container-selection > div img').remove();
    }

    var _getRandomHexColor = function() {
        return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }

    var _getRandomIntInclusive = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var _markupMatrix = function() {
        $('#container-selection > div > #btnAudio').on( "click", function() {
            if (_audioMuted) {
                _audioPlay();
                $('#container-selection > div > #btnAudio').css('background-image','url("/images/audio-96x96.png")');
                _audioMuted = false;
            } else {
                _audioStop();
                $('#container-selection > div > #btnAudio').css('background-image','url("/images/audio-no-96x96.png")');
                _audioMuted = true;
            }
        });
        $('#container-selection > div > #btnClose').on( "click", function() {
            _closeSelection();
            _audioStop();
        });
        let i = 0;
        while (i < 400) {
            const randomInt = _getRandomIntInclusive(0, 10);
            const randomColor = _getRandomHexColor();
            const markupDiv= $('<div id="matrix-square-'+i+'" style="background-color:'+randomColor+';animation-delay:'+randomInt+'s;"></div>');
            $('#container-matrix').append(markupDiv);
            $('#matrix-square-'+i).on( "click", function() {
                _openSelection(randomColor);
                if (!_audioActive) {
                    _audioInit();
                    _audioActive = true;
                    $('#container-selection > div > #btnAudio').css('background-image','url("/images/audio-96x96.png")');
                } else if (!_audioMuted) {
                    _audioPlayFromGrid();
                }
            });
            i++;
        }
    }

    var _audioInit = function() {
        _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        _oscillator = _audioCtx.createOscillator();
        _gainNode = _audioCtx.createGain();
        _oscillator.connect(_gainNode);
        _gainNode.connect(_audioCtx.destination);
        _oscillator.type = 'sine';
        _oscillator.frequency.setValueAtTime(440, _audioCtx.currentTime); // 440 Hz
        _gainNode.gain.setValueAtTime(0.0001, _audioCtx.currentTime);
        _gainNode.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime + 3.5)
        _oscillator.start(0);
        _audioActive = true;
        _audioPlaying = true;
    }
    var _audioPlay = function() {
        _gainNode.gain.setValueAtTime(0.0001, _audioCtx.currentTime);
        _gainNode.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime + 1.0);
        _audioPlaying = true;
    }
    var _audioPlayFromGrid = function() {
        _gainNode.gain.setValueAtTime(0.0001, _audioCtx.currentTime);
        _gainNode.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime + 3.5);
        _audioPlaying = true;
    }
    var _audioStop = function() {
        _gainNode.gain.linearRampToValueAtTime(0.0, _audioCtx.currentTime + 1.0);
        _audioPlaying = false;
    }

	this.initialize = function() {
		_markupMatrix();
	}

	this.initialize();
}