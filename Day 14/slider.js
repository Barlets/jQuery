(function($){
	var sliderUl = $('div.slider').css('overflow', 'hidden').children('ul'),
	imgs = sliderUl.find('img'),
		imgWidth = imgs[0].width, //500
		imgsLen = imgs.length, //4
		current = 1,
		totalImgsWidth = imgsLen * imgWidth;//2000

		$('#slider-nav').show().find('button').on('click', function() {
			var direction = $(this).data('dir'),
				loc = imgWidth; // 500

		//update current value
		( direction === 'next' ) ? ++current : --current;

		//if first image
		if ( current === 0 ) {
			current = imgsLen;
			loc = totalImgsWidth - imgWidth;
			direction = 'next';
		} else if ( current -1 === imgsLen) { //Are we at end? Should we reset?
			current = 1;
			loc = 0;
		}

		transition(sliderUl, loc, direction);
	});

		function transition ( container, loc, direction ) {
			var unit; // -= +=

			if ( direction && loc !==0 ) {
				unit = ( direction == 'next' ) ? '-=' : '+=';
			}

			container.animate({
				'margin-left' : unit ? ( unit + loc ) : loc,
			}, 200)
		}


	})(jQuery);