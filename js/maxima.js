/*$(document).ready(function(){

	var degrees = [7.5,6.3,8.2,7,7.7,4.7,7.9,8.3,7.9,9,6.7,7.2,7,5.3,4,5.6,3,0,0.7,5.3,1.5,5.7,9,10.4,14.6,11.1,12.4,9,10,9.9,10.8,11.9,11.4,7,7.7,10.9,10.6,11.1,9.9,8.2,8.3,8.3,6.6,4.4,2.6,5.6,6.1,3.5,3.1,8.3,11.1,11.6,11.3,7.9,6.5,5.4,5.5,6.3,6.6,6.7,8.6,9,8.4,3.2,6.4,7.3,7.8,8.3,8.1,9.2,8.5,10.1,9.9,10.4,8.3,9,12,6.8,7.5,9.6,9.3,10.1,10.1,9.9,9.6,14.9,13.3,12.9,11.2,11.7,11.6,13,13.4,20.4,15.8,13.3,11.7,10.4,11.5,14.9,15.7,18.2,16.7,15.8,16.7,14.1,11.8,10.6,13,13.6,13.8,16.6,12.5,9.3,8.8,8,7.7,10.7,9.3,10.6,11.2,14.1,17.9,14,16,18.8,23.6,25.8,25.2,25.3,22.1,25.5,25.1,22.2,12.1,12.1,13.6,18.1,18.7,17.3,18.6,23.4,19,13.3,14.6,14.5,19.3,20.9,22.7,20.5,18,22.6,24.3,17.2,21.4,27.5,25.6,25.6,26.5,21.6,20.3,21.2,20.8,21.1,19,19.1,18.7,21.1,19.5,17.1,18.9,16.8,20.1,24.9,28.4,22.7,19.3,18.3,18.9,21.8,20.2,19.2,19.8,18.7,19.8,22.8,18.1,19.4,22.1,21.2,23.6,27.4,21.7,20.3,18.3,19.2,21.3,22.6,23.8,26.5,29.5,32.9,27.4,26.1,25.3,25.5,22.4,23.4,21.3,23.5,21.2,20.9,20.5,21,18.6,21.7,20.8,21.6,22.4,22.8,20.5,18.5,16.8,16.3,22.6,21.5,21.7,21.7,21,23.4,24.2,24.3,22.9,19.8,22.7,26.9,30.2,31,26.2,26.5,24.6,21.4,23.8,25.4,22.9,21.7,22.9,21.3,22.8,24.2,26.8,27.6,22.9,25.7,21.7,28.1,31.2,31.4,29,21.2,21.6,20.7,19.8,20,20.7,21.3,20.3,23.6,24.3,19.1,20.4,21.6,17.7,18.7,17.6,15.7,19,17.3,14.1,12.7,14.5,14.2,14.5,13.5,13.1,11,11.4,13.4,13.7,18.8,16.3,12.8,12,12,12.7,10.4,11.6,9.5,10.1,12.6,13.8,14.8,15.4,15.3,16.2,13.8,11.7,12,9.7,10.8,9.3,5.7,5.6,4.3,5.2,5.8,5,4.7,6.9,12.9,14.2,11.5,8.2,8.1,12.5,13.9,14.2,11.1,8.7,8.4,3.6,9.4,4.2,4.3,6.8,9.4,9.4,8.1,4,4.1,5.4,9.5,9.6,10.4,9.2,9.6,7.6,7.5,9.1,7.9,7.5,8.5,9.1,7.5,1,7.1,6.9,8,9.7,11.7,11.8,9.3,4.3,-0.8,1.5,3.3];
	var i = 0;
	var html1 = '';
	var html2 = '';
	
	console.log(degrees.length);
	var side = 15;
	var x = 0;
	var y = 0;
	var line = '';
	var calculatedDegrees = 0;
	for (i; i< degrees.length; i++) {

		calculatedDegrees = calculatedDegrees - degrees[i];
		console.log(degrees[i],calculatedDegrees);

		x = x + side*Math.cos(Math.round(calculatedDegrees)/180*Math.PI);
		y = y+ side*Math.sin(Math.round(calculatedDegrees)/180*Math.PI);
		line= line + x+','+y+' ';
	}
	$('#line').attr('points',line);
});
*/
$(document).ready(function(){

	function drawSwirl (date) {
		console.log(date);
		var selectedDate = date;
		var url = 'functions.php';
		//var url = 'https://api.darksky.net/forecast/80bc2c3ddf3ba9400da4bde886f35c2c/52.387180,6.269893,'+selectedDate+'?units=si';
		var i = 0;
		var html1 = '<svg>';
		var side = 25;
		var calculatedDegrees = 0;

		$.ajax({
			url: url,
			type: "post",
			dataType: "jsonp",
			success: function (data) {

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

	var myDate = new Date("April 1, 2017 02:30:00"); // Your timezone!
	var myEpoch = myDate.getTime();
	console.log(myEpoch);
});