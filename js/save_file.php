<?php
// save the JSON file back to the server
if(isset($_GET["json"])){
$myFile = "../data/data.json";
$fh = fopen($myFile, 'w+') or die("can't open file");
$stringData = $_GET["json"];
fwrite($fh, $stringData);
echo $stringData;
fclose($fh);
print($stringData);
}

elseif(isset($_GET["msg"])){
$myFile = "../data/msg.txt";
$fh = fopen($myFile, 'w+') or die("can't open file");
$stringData = $_GET["msg"];
fwrite($fh, $stringData);
echo $stringData;
fclose($fh);
print($stringData);
}
?>