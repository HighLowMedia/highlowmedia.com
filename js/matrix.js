var Matrix = function() {

    let _audioActive = false;
    //let _audioPlaying = false;
    let _audioMuted = false;

    let _audioCtx;
    let note1;
    let note2;
    let note3;
    let gainNode1;
    let gainNode2;
    let gainNode3;
    //let _oscillator;
    //let _gainNode;

    let audioTimeout1;
    let audioTimeout2;

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
        while (i < 300) {
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

    var _getRandomNumberBetween = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        const r =  Math.floor(Math.random() * (max - min + 1)) + min;
        return parseFloat(r.toFixed(2));
    }

    var _audioInit = function() {

        _audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // Create oscillators for different notes

        note1 = _audioCtx.createOscillator();
        gainNode1 = _audioCtx.createGain();
        note1.type = 'sine';
        note1.connect(gainNode1);
        gainNode1.connect(_audioCtx.destination);

        note2 = _audioCtx.createOscillator();
        gainNode2 = _audioCtx.createGain();
        note2.type = 'sine';
        note2.connect(gainNode2);
        gainNode2.connect(_audioCtx.destination);

        note3 = _audioCtx.createOscillator();
        gainNode3 = _audioCtx.createGain();
        note3.type = 'sine';
        note3.connect(gainNode3);
        gainNode3.connect(_audioCtx.destination);

        note1.frequency.setValueAtTime(_getRandomNumberBetween(411,560), _audioCtx.currentTime);
        gainNode1.gain.setValueAtTime(0.0001, _audioCtx.currentTime);
        gainNode1.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime + 3.5);
        note1.frequency.setValueAtTime(_getRandomNumberBetween(411,560), _audioCtx.currentTime + 12);

        note2.frequency.setValueAtTime(_getRandomNumberBetween(251,410), _audioCtx.currentTime);
        gainNode2.gain.setValueAtTime(0.0001, _audioCtx.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime + 3.5);
        note2.frequency.setValueAtTime(_getRandomNumberBetween(251,410), _audioCtx.currentTime + 24);

        note3.frequency.setValueAtTime(_getRandomNumberBetween(90,440), _audioCtx.currentTime);
        gainNode3.gain.setValueAtTime(0.0001, _audioCtx.currentTime);
        gainNode3.gain.exponentialRampToValueAtTime(0.3, _audioCtx.currentTime + 3.5);
        note3.frequency.setValueAtTime(_getRandomNumberBetween(90,440), _audioCtx.currentTime + 36);

        // Play the notes

        note1.start(0);

        audioTimeout1 = setTimeout(() => {
            note2.start(0);
        }, 5000); 

        audioTimeout2 = setTimeout(() => {
            note3.start(0);
        }, 7500); 
        
        _audioActive = true;
        _audioPlaying = true;
    }
    var _audioPlay = function() {
        //_gainNode.gain.setValueAtTime(0.0001, _audioCtx.currentTime);
        gainNode1.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime);
        gainNode3.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime);
        _audioPlaying = true;
    }
    var _audioPlayFromGrid = function() {
        
        note1.frequency.setValueAtTime(_getRandomNumberBetween(411,560), _audioCtx.currentTime);
        gainNode1.gain.setValueAtTime(0.0001, _audioCtx.currentTime);
        gainNode1.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime + 3.5);
        note1.frequency.setValueAtTime(_getRandomNumberBetween(411,560), _audioCtx.currentTime + 12);

        audioTimeout1 = setTimeout(() => {
            note2.frequency.setValueAtTime(_getRandomNumberBetween(251,410), _audioCtx.currentTime);
            gainNode2.gain.setValueAtTime(0.0001, _audioCtx.currentTime);
            gainNode2.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime + 3.5);
            note2.frequency.setValueAtTime(_getRandomNumberBetween(251,410), _audioCtx.currentTime + 24);
        }, 5000); 

        audioTimeout2 = setTimeout(() => {
            note3.frequency.setValueAtTime(_getRandomNumberBetween(90,440), _audioCtx.currentTime);
            gainNode3.gain.setValueAtTime(0.0001, _audioCtx.currentTime);
            gainNode3.gain.exponentialRampToValueAtTime(0.3, _audioCtx.currentTime + 3.5);
            note3.frequency.setValueAtTime(_getRandomNumberBetween(90,440), _audioCtx.currentTime + 36);
        }, 7500); 
        
        _audioPlaying = true;
    }
    var _audioStop = function() {
        if (audioTimeout1) {
            clearTimeout(audioTimeout1)
        }
        if (audioTimeout2) {
            clearTimeout(audioTimeout2)
        }
        gainNode1.gain.linearRampToValueAtTime(0.0, _audioCtx.currentTime);
        gainNode2.gain.linearRampToValueAtTime(0.0, _audioCtx.currentTime);
        gainNode3.gain.linearRampToValueAtTime(0.0, _audioCtx.currentTime);
        _audioPlaying = false;
    }

	this.initialize = function() {
		_markupMatrix();
	}

	this.initialize();
}