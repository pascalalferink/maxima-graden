$(document).ready(function(){

	function drawSwirl (date) {
		console.log(date);
		var selectedDate = date;
		var url = 'functions.php';
		var i = 0;
		var html1 = '<svg>';
		var side = 25;
		var calculatedDegrees = 0;

		$.ajax({
			url: url,
			type: "post",
			data: { date: selectedDate},
			dataType: "json",
			success: function (data) {

				console.log(data);

				var hourly = data.hourly.data;
				var oldX = 0;
				var oldY = 0;

				for (i; i< hourly.length; i++) {
					
					calculatedDegrees = calculatedDegrees - hourly[i].temperature;

					var newX  = oldX + side*Math.cos(Math.round(calculatedDegrees)/180*Math.PI);
					var newY = oldY + side*Math.sin(Math.round(calculatedDegrees)/180*Math.PI);

					html1 = html1 + '<polyline style="animation-delay: '+ (i+1)/10+'s" data-time="" data-temp='+hourly[i].temperature+' points = "'+oldX+','+oldY+' '+newX+','+newY+' " />';
					oldX = newX;
					oldY = newY;
				}

				html1 = html1 + '</svg>';
				$('body').append(html1);
			}
		});
	}
	console.log(new Date().getTime());
	var selectedDate =Math.round(new Date().getTime()/1000);

	$('input').blur(function(e){
		drawSwirl(Math.round(new Date($(this).val()).valueOf()/1000));


	})

	drawSwirl(selectedDate);

});