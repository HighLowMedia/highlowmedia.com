var Matrix = function() {

    var _openSelection = function(color) {
        $('#container-selection > div').css('background-color', color);
        $('#container-selection').css('z-index', '2');
        $('#container-selection > div').addClass('show');
    }

    var _closeSelection = function(color) {
        $('#container-selection > div').removeClass('show');
        $('#container-selection').css('z-index', '0');  
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