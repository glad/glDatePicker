$(window).load(function()
{
	// Update code sectionList with syntax highlighting
	prettyPrint();

	// Start the image slides
	$('#slides-images').cycle();

	// Get a list of sectionList corresponding to menu items
	var sectionList = (function() {
		var results = [];

		// Find all the sections
		$('.section').each(function() {
			var sectionName = $(this).data('section') || '';
			var section = (sectionName.length > 0) ? $(this) : null;

			// Only grab the section if it already isn't in the list
			if(section !== null && !results.hasOwnProperty(sectionName)) {
				results[sectionName] = section;
			}
		});

		return results;
	})();

	// Determine which section is in view
	var isElementInView = function(el) {
		var pad = 80;

		var rect = el[0].getBoundingClientRect();
		var elHeight = rect.height;
		var winHeight = window.innerHeight;

		// Adjust height of the element if it's above or below the view
		elHeight += (rect.top < pad) ? (rect.top - pad) : 0;
		elHeight -= (rect.bottom > winHeight - pad) ? (rect.bottom - (winHeight - pad)) : 0;

		// Return true if the element is more than 50% in the view
		return ((elHeight / winHeight) >= 0.5);
	};

	// Scrolls the view to a specific section
	var scrollToSection = function(sectionName) {
		// Default to blank and remove leading hash
		sectionName = (sectionName || '').replace(/\#/,'');

		// If we have a hit...
		if(sectionName.length > 0) {
			// Get the corresponding section
			var section = (sectionList[sectionName] || null);

			if(section != null) {
				// Scroll to it
				$('html, body').animate(
					{ scrollTop: (section.offset().top - 80) },
					{ duration: 500 }
				);
			}
		}
	};

	// Scroll to hash if one was provided in the url
	var urlHash = (window.location.hash || '');
	if(urlHash.length > 0) {
		scrollToSection(urlHash);
	}

	// Scroll to section if link has hash
	$('a').click(function(e) {
		scrollToSection(this.hash);
	});

	// Determine which sectionList are in view
	$(window).scroll(function() {
		// Loop through sectionList to find the one that was scrolled to
		for(var sectionName in sectionList) {
			if(sectionList.hasOwnProperty(sectionName)) {
				var section = sectionList[sectionName];

				if(isElementInView(section)) {
					// Remove style from all menu items
					$('a.menu').removeClass('active');

					// If the section isn't home, set its style
					if(sectionName != 'home') {
						$('a.menu').each(function(j, menu) {
							var menuHash = (menu.hash || '').replace(/\#/,'');

							// If we found the menu item, mark it active
							if(menuHash.length > 0 && menuHash == sectionName) {
								$(menu).addClass('active');
								return false;
							}
						});
					}

					return false;
				}
			}
		}
	});
});
