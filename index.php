<?php
class ItemModel
{
    public $id = 0;
    public $price = 0;
    public $name;
    public $description;
    public $imagePath;

    public function __construct($id = 0, $price = 0, $name = null, $description = null, $imagePath = null)
    {
        $this->id = $id;
        $this->price = $price;
        $this->name = $name;
        $this->description = $description;
        $this->imagePath = $imagePath;
    }
}
$host = 'localhost';
$db   = 'lesson21';
$user = 'postgres';
$pass = 'IGOR2002vlad';
$port = '5432';


$pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$data = $pdo->query('SELECT * FROM items');
function getCatalog(): string {
    global $data;
    $items = array();

    while ($row = $data->fetch()) {
        $item = new ItemModel(
            $row['id'],
            $row['price'],
            $row['name'],
            $row['description'],
            $row['path']
        );
        $items[] = $item;
    }

    return json_encode($items, JSON_UNESCAPED_UNICODE);
}

?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link href="style.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"></script>
    <title>Каталог товаров</title>
</head>
<body>

<div id="catalog-id" class=" d-flex flex-row flex-wrap">
</div>

<div id="reviews d-flex flex-column justify-content-around">


</div>

<script src="index.js" type="application/javascript"></script>
<script>
    const itemsData = <?php echo getCatalog(); ?>;

    itemsData.forEach(item => {
        console.log(item)
        drawCatalogItem(item['id'], item['name'], item['price'], item['imagePath'])

    });
</script>



</body>

</html>

