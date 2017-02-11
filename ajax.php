<?php
$servername = "localhost";
$username = "ral3594";
$password = "";
$db = "googleMaps";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

if ($_POST['action'] == "test"){
    if (isset($_POST['weekDay'])){

        // $sql = " SELECT Time, AVG(SUBSTRING_INDEX(toHome, 'mins', 1)) AS toHome FROM mapsTable WHERE Time > '5:00:00' AND Time < '6:00:00' AND Weekday = '{$_POST['weekDay']}' GROUP BY Time;";
        $sql = "SELECT Time, SUBSTRING_INDEX(toHome, 'mins', 1) AS toHome FROM mapsTable WHERE Time >= '6:00:00' AND Time <= '7:00:00' AND Weekday = '{$_POST['weekDay']}' ORDER BY Time ASC, Date ASC;";
        $result = $conn->query($sql);
        
        if (!$result){
            exit($conn->error);
        }
        
        $arr = array();
        $final = array("elts" => array());
        while ($row = $result->fetch_assoc()){
            $time = $row['Time'];
            $duration = $row['toHome'];
            
            // if (strpos($duration, 'hour') !== false) {
            //     $temp = explode(" ", $duration);
            //     $duration = (intval($temp[0]) * 60) + intval($temp[2]);
            // }
            // else{
            //     $duration = explode(" ", $duration)[0];
            // }
            
            if (array_key_exists($time, $arr)){
                array_push($arr[$time], $duration);
            }
            else{
                $arr[$time] = array($duration);
            }
        }
        
        // foreach ($arr as $key => $value){
        //     // print_r($value);
        //     array_push($final["elts"], $value);
        // }
        $final["elts"] = $arr;
        
        $final['keys'] = array_keys($arr);
    }    

    echo json_encode($final);
    
    
}

?>