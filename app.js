Reveal.initialize({
	controls: false,
	controlsTutorial: false,
	progress: true,
	keyboard: true,
	center: true,
	touch: true,
	mouseWheel: true,
	width: 320,
	height: 568,
});

Reveal.addEventListener( 'overviewshown', function( event ) { /* ... */ } );
Reveal.addEventListener( 'overviewhidden', function( event ) { /* ... */ } );

var prenoms = ['H.', 'Océane', 'Mélina', 'Laury Ann', 'Émilie', 'Awa', 'Aminata', 'Migna', 'Sena', 'Clarisse', 'George', 'Angela', 'Laura', 'Wendie', 'Mel', 'Bernadette', 'Liva'];
var prenomsCurrent = 0;
var prenomsInterval;

function startPrenomsAnimation () {
	prenomsInterval = setInterval(function() {
		if (prenomsCurrent > prenoms.length - 1) {
			prenomsCurrent = 0
		}
		document.getElementById('prenoms-animate').textContent = prenoms[prenomsCurrent]
		prenomsCurrent++;
	}, 375);
}

function stopPrenomsAnimation () {
	clearInterval(prenomsInterval)
}

function findBackground(el) {
	if(el.dataset) {
		return el.dataset.backgroundImage || findBackground(el.parentNode)
	} 
	return null
}

function updateBackground(url) {
	if (url !== null) {
		document.querySelector('.blur-bg').style.backgroundImage = 'url(' + url + ')'
	} else {
		document.querySelector('.blur-bg').style.backgroundImage = null		
	}
}

function watchPlayers() {
	$('audio, video').filter(':not(.not-autoslide)').each(function() {
		$(this).on('ended', Reveal.next);
	})
}

$(document).ready(watchPlayers);

Reveal.addEventListener( 'ready', function( event ) {
	if (Reveal.isFirstSlide()) {
		startPrenomsAnimation()
		updateBackground(findBackground(event.currentSlide))
	}
});

var autoslideTimer;

Reveal.addEventListener( 'slidechanged', function( event ) {
	if (autoslideTimer) { clearTimeout(autoslideTimer); }
	if (event.indexh === 1 && event.indexv === 0) {
		startPrenomsAnimation()
	} else if (prenomsInterval !== null) {
		stopPrenomsAnimation()
	}
	updateBackground(findBackground(event.currentSlide))
	if (event.currentSlide.dataset.autoslide) {
		autoslideTimer = setTimeout(function() {
			Reveal.right();
		}, parseInt(event.currentSlide.dataset.autoslide))
	}
});