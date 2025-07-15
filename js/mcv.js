var Mcv = function() {

    var _markupMcv = function() {

        const _title = 'Artificial Neurofeedback, Neural Network Self-Optimization, and Emergence';
        const _description = 'Article in MCV: Nexus of Theoretical and Applied Media about Artifical Neurofeedback, a novel approach to AI self-optimization.';

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        if (id === 'SSdtIHNvcnJ5LCBEYXZlLCBJJ20gYWZyYWlkIEkgY2FuJ3QgZG8gdGhhdC4=') {

            document.title = 'MCV | ' + _title;
       
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.content = _description;
            }

            let ogTitle = document.querySelector("meta[property='og:title']");
            if (ogTitle) {
                ogTitle.content = 'MCV | ' + _title;
            }

            let ogDescription = document.querySelector("meta[property='og:description']");
            if (ogDescription) {
                ogDescription.content = _description;
            }

            let twitterTitle = document.querySelector('meta[name="twitter:title"]');
            if (twitterTitle) {
                twitterTitle.content = 'MCV | ' + _title;
            }

            let twitterDescription = document.querySelector('meta[name="twitter:description"]');
            if (twitterDescription) {
                twitterDescription.content = _description;
            }

            document.getElementById("volume").innerHTML = "Volume 9 - July 2025";
            document.getElementById("article-title").innerHTML = _title;
            document.getElementById("article-author").innerHTML = 'L. Alvarez, J. Ause, D. Junior';
            document.getElementById("article-date").innerHTML = 'Published: July 11, 2025';
            document.getElementById('article-body').style.display = 'block';

        } else {

            document.getElementById("article-title").innerHTML = "We're sorry. The article you are looking for could not be found.";
            document.getElementById("footer").style.position = 'absolute';
            document.getElementById("footer").style.bottom = '0';

        }

    }

	this.initialize = function() {
		_markupMcv();
	}

	this.initialize();
}