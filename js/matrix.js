var Matrix = function() {

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

    var _openSelection = function(color) {
        _getRandomWikimediaImage().then(imageUrl => {
            if (imageUrl) {
                $('#container-selection > div').append('<img src="'+imageUrl+'" alt="This is a random image form the Wikimedia Creative Commons API." border="0" />');
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
        $('#container-selection > div > button').on( "click", function() {
            _closeSelection();
        });
        let i = 0;
        while (i < 400) {
            const randomInt = _getRandomIntInclusive(0, 10);
            const randomColor = _getRandomHexColor();
            const markupDiv= $('<div id="matrix-square-'+i+'" style="background-color:'+randomColor+';animation-delay:'+randomInt+'s;"></div>');
            $('#container-matrix').append(markupDiv);
            $('#matrix-square-'+i).on( "click", function() {
                _openSelection(randomColor);
            });
            i++;
        }
    }

	this.initialize = function() {
		_markupMatrix();
	}

	this.initialize();
}