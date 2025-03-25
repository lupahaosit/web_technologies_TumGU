<!DOCTYPE html>
<?php

function getTime(){
    $dateTime = new DateTime();
    $currentTime = date('H:i');
    $timeArray = explode(':', $currentTime);
    $hoursTextForm = "";
    $minutesTextFrom = "";

    if (($timeArray[0] >=5 && $timeArray[0] <=20)|| ($timeArray[0] >=1 && $timeArray[0]<= 4)) $hoursTextForm = "часов";
    else if($timeArray  >= 22) $hoursTextForm = "часа";
    else $hoursTextForm = "часа";

    $timeAsInt = (int)$timeArray[1];
    if ($timeAsInt % 10 == 1 && strlen($timeArray[1]) == 2) $minutesTextFrom = "минута";
    elseif (($timeAsInt >=11 && $timeAsInt <=14)) $minutesTextFrom = "минут";
    elseif(($timeAsInt % 10 <=9 && $timeAsInt % 10 >=5) || $timeAsInt % 10 == 0) $minutesTextFrom = "минут";
    elseif($timeAsInt <=4 && $timeAsInt >=2) $minutesTextFrom = "минуты";
    elseif ($timeAsInt == 1) $minutesTextFrom = "минута";
    else{
        $minutesTextFrom = "минуты";
    }

    return $timeArray[0] . ' ' . $hoursTextForm . ' : ' . $timeArray[1] . ' ' . $minutesTextFrom;
}
$headerH1 = "<h1>This is h1</h1>";
$title = "<title>this is title</title>";
?>
<html lang="UTF-8">
<head>
    <?php echo ($title)?>
</head>
<body>
    <?php echo($headerH1);
    echo('<br>' . getTime());
            ?>


</body>
</html>