<!DOCTYPE html>
<?php
 $a = 2;
 $b = -3;


 function calciulcatePart1($a, $b){
    if ($a < 0 && $b < 0) return $a * $b;
    elseif($a>=0 && $b >=0) return $a - $b;
    else return $a + $b;
 }

 function switchTask2($a){
     switch ($a){
         case 1:
            forForTask2(1);
             break;
         case 2:
             forForTask2(2);
             break;
         case 3:
             forForTask2(3);
             break;
         case 4:
             forForTask2(4);
             break;
         case 5:
             forForTask2(5);
             break;
         case 6:
             forForTask2(6);
             break;
         case 7:
             forForTask2(7);
             break;
         case 8:
             forForTask2(8);
             break;
         case 9:
             forForTask2(9);
             break;
         case 10:
             forForTask2(10);
             break;
         case 11:
             forForTask2(11);
             break;
         case 12:
             forForTask2(12);
             break;
         case 13:
             forForTask2(13);
             break;
         case 14:
             forForTask2(14);
             break;
         case 15:
             forForTask2(15);
             break;
     }
 }

 function forForTask2($a){
     for ($i = $a; $i <=15; $i++){
         echo($i . ' ');
     }
 }

 function sum($a, $b){
     return $a + $b;
 }
 function minus($a, $b){
     return $a - $b;
 }
 function multiply($a, $b){
     return $a * $b;
 }

 function degree($a, $b){
     if ($b != 0){
         return $a/$b;
     }
 }

 function mathOperation($arg1, $arg2, $operation){
     switch ($operation){
         case '+':
             return sum($arg1, $arg2);
             break;
         case '-':
             return minus($arg1, $arg2);
             break;
         case '/':
             return multiply($arg1, $arg2);
             break;
         case '*':
             return degree($arg1, $arg2);
             break;
     }
 }

//Task 5
function getYearTask5(){
    echo "<p>Текущий год (способ 1): " . date('Y') . "</p>";

    $currentYear = getdate()['year'];
    echo "<p>Текущий год (способ 2): $currentYear</p>";

    $dateTime = new DateTime();
    echo "<p>Текущий год (способ 3): " . $dateTime->format('Y') . "</p>";
}

// Task 6
function power($val, $pow) {
    if ($pow == 0) {
        return 1;
    }
    if ($pow < 0) {
        return 1 / power($val, -$pow);
    }
    return $val * power($val, $pow - 1);
}
?>

?>
<html lang="UTF-8">
<head>

    <title>ds</title></head>
<body>
    <?php
    echo (degree(5,2));
    echo getYearTask5();
    echo ('<br>');
    echo(power(2, -3));
    ?>



</body>
</html>