<?php
// save the JSON file back to the server
$myFile = "../data/data.json";
$fh = fopen($myFile, 'w') or die("can't open file");
$stringData = $_GET["json"];
fwrite($fh, $stringData);
fclose($fh)
?>