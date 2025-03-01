var Matrix = function() {

    const _dreamWords = [
        // Nature & Elements (1-50)
        "ocean", "river", "mountain", "tree", "fire", "cloud", "sun", "moon", "stars", "lightning",
        "rain", "snow", "wind", "forest", "beach", "desert", "volcano", "earthquake", "rainbow", "storm",
        "lake", "waterfall", "cave", "cliff", "island", "glacier", "tornado", "hurricane", "fog", "dew",
        "flower", "grass", "rock", "crystal", "sand", "mud", "ice", "steam", "sunrise", "sunset",
        "horizon", "valley", "hill", "garden", "jungle", "meadow", "swamp", "oasis", "canyon", "geyser",
        // Structures & Places (51-100)
        "house", "school", "church", "bridge", "stairs", "elevator", "door", "window", "wall", "tower",
        "castle", "prison", "hospital", "store", "restaurant", "theater", "stadium", "museum", "library", "park",
        "office", "factory", "warehouse", "basement", "attic", "garage", "bathroom", "kitchen", "bedroom", "hallway",
        "tunnel", "maze", "labyrinth", "ruins", "monument", "temple", "palace", "cottage", "apartment", "skyscraper",
        "lighthouse", "windmill", "barn", "shed", "greenhouse", "bunker", "fort", "pyramid", "arch", "fence",
        // Vehicles & Transportation (101-130)
        "car", "train", "airplane", "boat", "bicycle", "bus", "submarine", "rocket", "carriage", "motorcycle",
        "helicopter", "ship", "raft", "canoe", "wagon", "sled", "skateboard", "scooter", "trolley", "spaceship",
        "blimp", "hot-air-balloon", "jet", "sailboat", "truck", "tank", "ambulance", "taxi", "limousine", "tractor",
        // Animals (131-180)
        "dog", "cat", "bird", "snake", "spider", "wolf", "bear", "fish", "butterfly", "lion",
        "tiger", "elephant", "horse", "rabbit", "mouse", "rat", "monkey", "gorilla", "penguin", "eagle",
        "owl", "hawk", "dove", "crow", "peacock", "dolphin", "whale", "shark", "octopus", "jellyfish",
        "dragon", "unicorn", "phoenix", "griffin", "deer", "fox", "coyote", "raccoon", "squirrel", "bat",
        "bee", "ant", "scorpion", "lizard", "turtle", "frog", "alligator", "dinosaur", "seahorse", "starfish",
        // People & Beings (181-230)
        "baby", "child", "teacher", "stranger", "crowd", "police", "doctor", "friend", "enemy", "lover",
        "parent", "sibling", "grandparent", "boss", "student", "soldier", "priest", "angel", "demon", "ghost",
        "witch", "wizard", "warrior", "king", "queen", "princess", "prince", "giant", "dwarf", "mermaid",
        "vampire", "zombie", "alien", "robot", "clown", "athlete", "musician", "artist", "dancer", "actor",
        "pilot", "sailor", "farmer", "chef", "nurse", "scientist", "politician", "beggar", "hero", "villain",
        "trump", "elon", "putin", "hitler", "satan", "god", "jesus", "buddha", "mohammed", "zeus", "mary", "lilith",
        "stalin", "genghis", "caesar", "tesla", "oswald", "einstein", "lincoln", "booth", "bob", 
        // Objects & Items (231-300)
        "key", "lock", "phone", "computer", "book", "letter", "mirror", "clock", "camera", "television",
        "radio", "lamp", "candle", "knife", "sword", "gun", "shield", "crown", "ring", "necklace",
        "bracelet", "watch", "glasses", "mask", "hat", "shoes", "dress", "coat", "umbrella", "backpack",
        "suitcase", "box", "gift", "toy", "doll", "balloon", "rope", "chain", "hammer", "axe",
        "scissors", "needle", "compass", "map", "bottle", "cup", "plate", "bowl", "chair", "table",
        "bed", "pillow", "blanket", "flag", "cross", "crystal-ball", "wand", "staff", "torch", "treasure",
        "gold", "silver", "diamond", "pearl", "paper", "pen", "brush", "drum", "bell", "whistle",
        // Actions & States (301-350)
        "flying", "falling", "running", "swimming", "climbing", "dance", "walking", "jump", "crawl", "floating",
        "fight", "kiss", "hugging", "crying", "laughing", "singing", "talking", "shouting", "whisper", "sleeping",
        "waking", "eating", "drinking", "breathing", "bleeding", "healing", "dying", "burning", "freezing", "melting",
        "growing", "shrinking", "transforming", "hiding", "seeking", "chase", "escaping", "winning", "losing", "celebrating",
        "working", "playing", "building", "destroy", "painting", "writing", "reading", "teaching", "learn", "creating",
        "fuck", "kill", "hate", "scream", "caress", "suck", "tongue", "bite", "lick", "climax", "orgasm", "come", "ejaculate",
        "oppress", "resist", "surrender", "betray", "forgive", "forget", "remember",
        // Emotions & Sensations (351-400)
        "joy", "sadness", "anger", "fear", "love", "hate", "hope", "despair", "peace", "anxiety",
        "excitement", "boredom", "pleasure", "pain", "warmth", "cold", "hunger", "thirst", "fatigue", "energy",
        "loneliness", "friendship", "jealousy", "pride", "shame", "guilt", "trust", "doubt", "courage", "cowardice",
        "wisdom", "confusion", "freedom", "imprisonment", "power", "weakness", "success", "failure", "birth", "death",
        "light", "darkness", "silence", "noise", "speed", "stillness", "beauty", "ugliness", "truth", "lies",
        // Abstract Concepts (401-450)
        "time", "space", "infinity", "eternity", "destiny", "fate", "chance", "luck", "karma", "soul",
        "spirit", "mind", "body", "dream", "reality", "fantasy", "memory", "future", "past", "present",
        "heaven", "hell", "paradise", "apocalypse", "war", "peace", "order", "chaos", "balance", "harmony",
        "unity", "division", "creation", "destruction", "life", "death", "good", "evil", "justice", "injustice",
        "knowledge", "ignorance", "wisdom", "folly", "youth", "age", "beginning", "end", "change", "stasis",
        // Colors & Elements (451-475)
        "red", "blue", "green", "yellow", "purple", "orange", "white", "black", "grey", "brown",
        "gold", "silver", "rainbow", "shadow", "flame", "smoke", "mist", "dust", "air", "earth",
        "water", "fire", "metal", "wood", "stone",
        // Numbers & Patterns (476-500)
        "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
        "hundred", "thousand", "million", "circle", "square", "triangle", "spiral", "cross", "star", "heart",
        "infinity", "maze", "web", "chain", "void"
    ];

    let _selectionOpen = false;

    let _audioActive = false;
    let _audioMuted = false;

    let _audioCtx;
    let note1;
    let note2;
    let note3;
    let gainNode1;
    let gainNode2;
    let gainNode3;

    let audioTimeout1;
    let audioTimeout2;

    const arrFallbackImages = [
        'https://upload.wikimedia.org/wikipedia/commons/b/b9/%E5%A4%9C%E5%8F%89%E9%AC%BC.JPG',
        'https://upload.wikimedia.org/wikipedia/commons/c/c2/CunninghamBharhut.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/1/11/Scroll_painting_of_Atavaka%2C_Unknown_Artist%2C_Japan%2C_14th_century.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/83/Plaosan_Temple_Guardian.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/d/d3/Bangkok_statue.jpg'
    ];

    var _getRandomHexColor = function() {
        return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }

    var _isPngOrJpg = function(filename) {
        if (typeof filename !== 'string') {
          return false; // filename is not a string
        }
        const lowerCaseFilename = filename.toLowerCase();
        return (lowerCaseFilename.endsWith('.png') || lowerCaseFilename.endsWith('.jpg') || lowerCaseFilename.endsWith('.jpeg'));
    }

    async function _getRandomWikimediaImage() {
        const r =  Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        const imageFallbackUrl = arrFallbackImages[(r-1)];
        const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=random&grnnamespace=6&grntype=file&prop=imageinfo&iiprop=url&format=json&origin=*';
        try {
          const response = await fetch(url);
          const data = await response.json();
          const pages = data.query.pages;
          const imageId = Object.keys(pages)[0];
          const imageUrl = pages[imageId].imageinfo[0].url;
          if (_isPngOrJpg(imageUrl)) {
            return imageUrl;
          } else {
            return imageFallbackUrl;
          }
        } catch (error) {
          console.error("Error fetching image:", error);
          return imageFallbackUrl;
        }
    }

    var _openSelection = function(color) {
        _selectionOpen = true;
        _getRandomWikimediaImage().then(imageUrl => {
            $('#container-selection > div >div#image-container').css('background-image','url("'+imageUrl+'")');
        });
        $('#container-selection > div').css('background-color', color);
        $('#container-selection').css('z-index', '2');
        $('#container-selection > div').addClass('show');
        $('#container-selection > div > div#image-container').addClass('show');

        $('#container-selection > div').append('<div class="dream-word-container" id="dream-word-container-1"></div>');
        $('#container-selection > div').append('<div class="dream-word-container" id="dream-word-container-2"></div>');
        $('#container-selection > div').append('<div class="dream-word-container" id="dream-word-container-3"></div>');

        $('#container-selection > div > #dream-word-container-1').append('<div class="dream-word" id="dream-word-1" style="--color-word-1: '+_getRandomHexColor()+';">'+_dreamWords[Math.floor(Math.random() * _dreamWords.length)]+'</div>');
        $('#container-selection > div > #dream-word-container-2').append('<div class="dream-word" id="dream-word-2" style="--color-word-2: '+_getRandomHexColor()+';">'+_dreamWords[Math.floor(Math.random() * _dreamWords.length)]+'</div>');
        $('#container-selection > div > #dream-word-container-3').append('<div class="dream-word" id="dream-word-3" style="--color-word-3: '+_getRandomHexColor()+';">'+_dreamWords[Math.floor(Math.random() * _dreamWords.length)]+'</div>');
    }

    var _closeSelection = function(color) {
        _selectionOpen = false;
        $('#container-selection > div').removeClass('show');
        $('#container-selection > div > div#image-container').removeClass('show');
        $('#container-selection').css('z-index', '0');

        $("#dream-word-container-1").remove();
        $("#dream-word-container-2").remove();
        $("#dream-word-container-3").remove();
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
                $('#container-selection > div > #btnAudio').css('background-image','url("/images/audio-110x110.png")');
                _audioMuted = false;
            } else {
                _audioStop();
                $('#container-selection > div > #btnAudio').css('background-image','url("/images/audio-no-110x110.png")');
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
                if (!_selectionOpen) {
                    _openSelection(randomColor);
                    if (!_audioActive) {
                        _audioInit();
                        _audioActive = true;
                        $('#container-selection > div > #btnAudio').css('background-image','url("/images/audio-110x110.png")');
                    } else if (!_audioMuted) {
                        _audioPlayFromGrid();
                    }
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
    }
    var _audioPlay = function() {
        gainNode1.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime);
        gainNode3.gain.exponentialRampToValueAtTime(0.5, _audioCtx.currentTime);
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
    }

	this.initialize = function() {
		_markupMatrix();
	}

	this.initialize();
}