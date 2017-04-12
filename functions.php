<?php
	include('config.php');
	//https://api.darksky.net/forecast/80bc2c3ddf3ba9400da4bde886f35c2c/52.387180,6.269893,1492004689?units=si
	$darkskyUrl = '//api.darksky.net/forecast/';
	$key = '80bc2c3ddf3ba9400da4bde886f35c2c';
	$lat = 52.387180;
	$lng = 6.269893;
	//$date = int time (void);
	$units = 'si';
	
	
	if($_POST["date"]){ 
		$date = $_POST["date"];
	};
	if(($_POST["lat"]) && ($_POST["lng"])){ 
		$lat = $_POST["lat"];
		$lng = $_POST["lng"];
	};
	if($_POST["units"]){ 
		$units = $_POST["units"];
	};
	
	$url = $darkskyUrl+$key+'/'+$lat+'/'+$lng+'?units='+$units;

	$json = file_get_contents($url); 
	$response = json_decode($json, true);

	echo json_encode($response);
?>