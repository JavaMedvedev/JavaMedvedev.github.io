var tlOpen = new TimelineMax({ease: Linear.easeNone});
var tlClose = new TimelineMax({ease: Linear.easeNone});


$(function(){
	$('.close').on('click', function(){
		// $('.hotspots .wrapper').removeClass('flipped');
		tlClose
			.to($('.hotspots .wrapper'), .125, {rotationX:90})
			.set($('.hotspots .wrapper').find('.back'), {display: 'none'})
			.to($('.hotspots .wrapper'), .125, {rotationX:0})
			.add(function(){$('.hotspot-data .active').removeClass('active');})
		
		
	})
	$.each($('.hotspots-container .icon'), function(){
		var x = $(this).data('left');
		var y = $(this).data('top');
		console.log(x,y);
		$(this).css({
			left: x + '%',
			top: y + '%'
		})
		$(this).on('click', function(){
			$('.hotspot-data').find("#" + $(this).data('card')).addClass('active');
			$('.hotspot-data').find("#" + $(this).data('card') + ' .image img').attr('src', $('.hotspot-data').find("#" + $(this).data('card') + ' .image img').data('src'));
			// $('.hotspots .wrapper').addClass('flipped');
			tlOpen
				.to($('.hotspots .wrapper'), .125, {rotationX:90})
				.set($('.hotspots .wrapper').find('.back'), {display: 'block'})
				.to($('.hotspots .wrapper'), .25, {rotationX:180})
			
		})
	})
})