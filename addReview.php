<?php
header('Content-Type: text/plain'); // Просто текст, без JSON
echo "Полученные данные:\n";
print_r($_POST); // Должен вывести массив с name и text


$host = 'localhost';
$db   = 'lesson21';
$user = 'postgres';
$pass = 'IGOR2002vlad';
$port = '5432';


$pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
$review = $_POST['reviewTextInput'];
$name = $_POST['reviewerNameInput'];
$id = $_POST['itemId'];
$stmt = $pdo->prepare("INSERT INTO reviews (content, name, itemid) VALUES (:review, :name, :id)");
$stmt->execute([
    ':review' => $review,
    ':name' => $name,
    ':id' => $id
]);
echo 'data sended'
?>
