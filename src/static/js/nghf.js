!function($, doc, win) {
	var html = $('html'), enableMobile = html.hasClass('hf-mobile');
	if (!enableMobile) {
		return;
	}
	
	if (!$('head[name="viewport"]').length) {
		html.find('head').append('<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">');
	}
	var defaults = {
		baseFontSize: 40,
		maxWidth:640,
		minWidth:190
	},
	dataset = html.data(),
	conf = {};
	
	
	for(var key in defaults) {
		if (defaults.hasOwnProperty(key)) {
			conf[key] = defaults[key];
		}
	}
	for(var key in dataset) {
		if (key in defaults) {
			conf[key] = dataset[key];
		}
	}

	var lastWidth, deviceWidth;
	
	/**
	 * 调整根元素的字体大小
	 */
	function resizeRem() {
		var curWidth = 0;
		if (!deviceWidth && window.aji && window.aji.getDeviceWidth) {
			deviceWidth = window.aji.getDeviceWidth();
		} 
		if (deviceWidth) {
			curWidth = deviceWidth / window.devicePixelRatio;
		} else {
			curWidth = Math.min(screen.availWidth, doc.documentElement.clientWidth);
		}

		if (!curWidth || (curWidth == lastWidth)) {
			return;
		}
		if (curWidth > conf.maxWidth) {
			html.css('fontSize', conf.baseFontSize);
		} else if (curWidth < conf.minWidth) {
			html.css('fontSize', (conf.minWidth / conf.maxWidth) * conf.baseFontSize);
		} else {
			html.css('fontSize', (curWidth / conf.maxWidth) * conf.baseFontSize);
		}
		lastWidth = curWidth;
	}
	$(window).bind('resize', resizeRem);
	$(function(){
		$(doc.body).css({
			width: (conf.maxWidth / conf.baseFontSize) + 'rem',
			marginLeft: 'auto',
			marginRight: 'auto'
		});
		
		setTimeout(function() {
			$('img').lazyload({
				effect : "fadeIn"
			});

			// grid
			$('.hf-grid[columns]').each(function() {
				$(this).find('*[data-original]').lazyload();
				});


			// swiper
			$('.swiper-container').each(function() {
				var self = $(this);
				if (self.data('options')) {
				var options = {};
				try {
				options = eval('(' + self.data('options') + ')');
				} catch(ex) {
				//
				}
				}

				var pn = $(this).find('.swiper-pagination');
				if (pn.length && pn.attr('id') && !options.pagination) {
				options.pagination = '#' + pn.attr('id');
				}
				self.swiper(options);
				return;
				});
		}, 10);

	});
	resizeRem();
	
	
}(jQuery, document, window);