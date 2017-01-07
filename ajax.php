<?php
$servername = "localhost";
$username = "ral3594";
$password = "";
$db = "googleMaps";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

if ($_POST['action'] == "test"){
    $sql = "SELECT Time, toHome FROM mapsTable WHERE Time < '10:00:00';";
    
    $result = $conn->query($sql);
    
    if (!$result){
        exit($conn->error);
    }
    
    $arr = array();
    while ($row = $result->fetch_assoc()){
        $time = $row['Time'];
        $duration = $row['toHome'];
        
        if (strpos($duration, 'hour') !== false) {
            $temp = explode(" ", $duration);
            $duration = (intval($temp[0]) * 60) + intval($temp[2]);
        }
        else{
            $duration = explode(" ", $duration)[0];
        }
        
        if (array_key_exists($time, $arr)){
            array_push($arr[$time], $duration);
        }
        else{
            $arr[$time] = array($duration);
        }
    }
    
    print_r($arr);
    
}

?>