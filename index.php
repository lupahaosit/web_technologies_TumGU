<!DOCTYPE html>
<meta charset="UTF-8">

<html lang="ru">

<?php
$regions = ["Московская область", "Ленинградская область", "Рязанская область"];
$cities1 = ["Москва", "Зеленоград", "Клин"];
$cities2 = ["Санкт-Петербург", "Всеволожск", "Павловск"];
$cities3 = ["РЯЗАНЬ1", "Рязань2", "Рязань3"];

$result = [
    $regions[0] => $cities1,
    $regions[1] => $cities2,
    $regions[2] => $cities3
];

?>
<p><?php Task2();?></p>
<?php echo (Task3('якша'));
Task4($result)
?>

</html>


<?php



function Task1(){
    for ($i = 0; $i <11; $i++){
        if ($i == 0){
            echo ("это ноль");
        }
        else{
            echo(numberType($i));
        }
    }
}

function Task2(){
    $regions = ["Московская область", "Ленинградская область", "Рязанская область"];
    $cities1 = ["Москва", "Зеленоград", "Клин"];
    $cities2 = ["Санкт-Петербург", "Всеволожск", "Павловск"];
    $cities3 = ["РЯЗАНЬ1", "Рязань2", "Рязань3"];

    $result = [
            $regions[0] => $cities1,
            $regions[1] => $cities2,
            $regions[2] => $cities3
    ];
}

//в задании изначально сказано массив для транслитерации, и нет ни слова про обработку точек, пробелов и т.д.
function Task3($text){
    $symbols = [
            'а' => 'a',
        'б' => 'b',
        'в' => 'v',
        'г' => 'g',
        'д' => 'd',
        'е' => 'e',
        'ё' => 'e',
        'ж' => 'zh',
        'з' => 'z',
        'и' => 'i',
        'й' => 'i',
        'к' => 'k',
        'л' => 'l',
        'м' => 'm',
        'н' => 'n',
        'о' => 'o',
        'п' => 'p',
        'р' => 'r',
        'с' => 's',
        'т' => 't',
        'у' => 'u',
        'ф' => 'f',
        'х' => 'h',
        'ц' => 'c',
        'ч' => 'ch',
        'ш' => 'sh',
        'щ' => 'sh',
        'ъ' => '',
        'ы' => 'u',
        'ь' => '',
        'э' => 'e',
        'ю' => 'yu',
        'я' => 'ya',
    ];

    $transString = '';
    $chars = mb_str_split($text);
    foreach ($chars as $char){
        $transString = $transString . $symbols[$char];
    }
    return $transString;
}

function Task4($inputArray) {
    foreach ($inputArray as $key => $item) {
        if (is_array($item)) {
            echo "<ul><li>{$key}<ul>";
            Task4($item);
            echo "</ul></li></ul>";
        } else {
            echo "<li>{$item}</li>";
        }
    }
}







function numberType($x){
    if ($x % 2 == 0) return "чётное число";
    else return "нечётное число";
}

?>