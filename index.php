<!DOCTYPE html>
<meta charset="UTF-8">


<?php
/// это по сути уже ответ и к первому и второму заданиям
/// все картинки на одном экране и отправляют на другой при нажатии по картинке
/// указывается лишь путь к папке, оттуда достаются все картинки
/// вложенность в папке не учитывал(по тз не говорилось)
$filesInDir = array_diff(scandir("images"), ['.', '..']);
$fileSize = 1024 * 1024 * 8;
$fileTypes = ['png', 'webp', 'jpg', 'svg'];
logRequest();
?>

<?php
function logRequest() {

    $currentTime = date("Y-m-d H:i:s");

    $logFile = 'log0.txt';
    if (!file_exists($logFile)) file_put_contents($logFile, '');
    $logCount = count(file($logFile));

    if ($logCount >= 10) {
        $i = 0;
        while (file_exists("log$i.txt")) {
            $i++;
        }
        $logFile = "log{$i}.txt";
    }
    file_put_contents($logFile, "Request time: $currentTime\n", FILE_APPEND);
}


    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        $file = $_FILES['files_input'];
        $fileType = explode('.', $file['name']);
        if ($file['size'] < $fileSize && in_array($fileType[1], $fileTypes)){
            move_uploaded_file($file['tmp_name'], "images/{$file['name']}");
            header("Refresh:0");
        }
    }
?>
<html lang="ru">

    <?php
    foreach ($filesInDir as $item){
        echo("<a href='soloImage.php?path=images/$item' target='_blank'><img src='images/{$item}', style='max-width: 350px; max-height: 190px; padding-left: 20px'></a>");
    };
    ?>
<form action="index.php" method="post" enctype="multipart/form-data">
    <input type="file" name="files_input">
    <button type="submit">uploadfile</button>
</form>
</html>

