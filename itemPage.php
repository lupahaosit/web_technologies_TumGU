<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">

<?php
$id = $_GET['id'];

$pdo = require 'Database.php';

$host = 'localhost';
$db   = 'lesson21';
$user = 'postgres';
$pass = 'IGOR2002vlad';
$port = '5432';


$pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
$data = $pdo->query("SELECT * FROM items WHERE id = $id")->fetch();
function getItemInfoJson(): string{
    global $data;
    return json_encode($data, JSON_UNESCAPED_UNICODE);
}

$reviews = $pdo->query("SELECT * FROM reviews WHERE itemid = $id");

function reviewsIntoJson() : string{
    global $reviews;
    while ($row = $reviews->fetch()){

        $item =[
                $row['content'],
                $row['name'],
                $row['itemid']
            ];
            $items[] = $item;
        }

        return json_encode($items, JSON_UNESCAPED_UNICODE);
}




?>

<body>
<div>
    <form id="reviewForm">
        <label>Name
            <input type="text" name="reviewerNameInput">
        </label>
        <label>Review
            <input type="text" name="reviewTextInput">
        </label>
        <button type="submit" onclick="drawItemReview()">Add review</button>
    </form>
</div>
<div id="reviews-div" class="d-flex flex-column align-items-center">

</div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"></script>
<script src="index.js" type="application/javascript"></script>
<script>
    const item = <?php echo getItemInfoJson(); ?>;
    getCatalogItem(item['name'], item['price'], item['path'], item['description'])

    const reviews = <?php echo reviewsIntoJson()?>;
    reviews.forEach((element) => {
        console.log(element)
        drawItemReview(element[0], element[1])
    })
</script>
