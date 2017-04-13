<?php
error_reporting(~0);
ini_set('display_errors', 1);

$api_key = '80bc2c3ddf3ba9400da4bde886f35c2c';
$timestamp = time();

if($_POST["date"]){ 
	$timestamp = $_POST["date"];
};

$json = 'https://api.darksky.net/forecast/'.$api_key.'/52.387180,6.269893,'.$timestamp.'?units=si'; 
$json = file_get_contents($json); 
echo $json;

?>