(function ($) {
	'use strict';

	$.fn.swipe = function(callback, minMove) {
		var that = $(this);
		var TouchStart = false;
		var Once = false;
		var Touch = {};

		minMove = minMove || 20;

		var swipeInfo = function(e) {
			Touch.end = {
				x: e.originalEvent.pageX || e.originalEvent.touches[0].pageX,
				y: e.originalEvent.pageX || e.originalEvent.touches[0].pageX
			};

			var directionX, directionY;

			if (minMove < (Math.abs(Touch.start.x - Touch.end.x))) {
				directionX = ( Touch.end.x > Touch.start.x ) ? 'right' : 'left';
			} else {
				directionX = 'none';
			}

			if (minMove < (Math.abs(Touch.start.y - Touch.end.y))) {
				directionY = ( Touch.end.y > Touch.start.y ) ? 'down' : 'up';
			} else {
				directionY = 'none';
			}

			return {
				direction: {
					x: directionX,
					y: directionY
				},
				offset: {
					x: Touch.end.x - Touch.start.x,
					y: Touch.end.y - Touch.start.y
				}
			};
		};

		that.on('touchstart mousedown', function(e) {
			TouchStart = true;
			Once = true;
			Touch = {
				start: {
					x: e.originalEvent.pageX || e.originalEvent.touches[0].pageX,
					y: e.originalEvent.pageX || e.originalEvent.touches[0].pageX
				},
				end: {
					x: 0,
					y: 0
				}
			};
		});

		that.on('touchend mouseup', function() {
			TouchStart = false;
		});

		that.on('touchmove mousemove', function(e) {
			if (false === TouchStart) {return;}

			var Swipe = swipeInfo(e);

			if (true === Once) {
				if ('left' === Swipe.direction.x || 'right' === Swipe.direction.x) {
					callback(Swipe.direction.x);
					Once = false;
				}
			}
		});
	};

})(jQuery);
