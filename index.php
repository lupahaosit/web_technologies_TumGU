<?php

class MenuRenderer {
    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }


    public function getAllMenuItems() {
        $stmt = $this->db->query("SELECT * FROM menu_items ORDER BY parent_id, sort_order");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function buildTree(array $items, $parentId = null) {
        $branch = [];

        foreach ($items as $item) {
            if ($item['parent_id'] == $parentId) {
                $children = $this->buildTree($items, $item['id']);
                if ($children) {
                    $item['items'] = $children;
                }
                $branch[] = $item;
            }
        }

        return $branch;
    }


    public function renderMenu(array $menuItems, $level = 0) {
        $output = '';

        foreach ($menuItems as $item) {
            $hasChildren = !empty($item['items']);
            $isOpen = $level === 0 ? 'open' : '';

            $output .= '<div class="my-list-item" data-id="' . $item['id'] . '">';
            $output .= '<div class="d-flex align-items-center">';

            if ($hasChildren) {
                $output .= '<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down">';
            } else {
                $output .= '<span class="list-item__arrow-placeholder"></span>';
            }

            $output .= '<img class="list-item__folder" src="img/folder.png" alt="folder">';
            $output .= '<span>' . htmlspecialchars($item['name']) . '</span>';
            $output .= '</div>';

            if ($hasChildren) {
                $output .= '<div class="submenu-level ' . $isOpen . '">';
                $output .= $this->renderMenu($item['items'], $level + 1);
                $output .= '</div>';
            }

            $output .= '</div>';
        }

        return $output;
    }
}

$host = 'localhost';
$db   = 'lesson20';
$user = 'postgres';
$pass = 'IGOR2002vlad';
$port = '5432';

$db  = new PDO("pgsql:host=$host;port=$port;dbname=$db", $user, $pass);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);


$menuRenderer = new MenuRenderer($db);


$allItems = $menuRenderer->getAllMenuItems();

$menuTree = $menuRenderer->buildTree($allItems);

$renderedMenu = $menuRenderer->renderMenu($menuTree);
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Каталог товаров</title>
    <style>
        .my-list-item {
            margin-left: 20px;
            padding: 5px 0;
            cursor: pointer;
        }
        .d-flex {
            display: flex;
            align-items: center;
        }
        .list-item__arrow, .list-item__arrow-placeholder {
            width: 16px;
            height: 16px;
            margin-right: 5px;
            transition: transform 0.2s ease;
        }
        .list-item__folder {
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }
        .submenu-level {
            display: none;
            margin-left: 15px;
        }
        .submenu-level.open {
            display: block;
        }
        .list-item__arrow.rotated {
            transform: rotate(-90deg);
        }
    </style>
</head>
<body>
<div class="menu-container">
    <?php echo $renderedMenu; ?>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.my-list-item > .submenu-level').forEach(submenu => {
            const parent = submenu.closest('.my-list-item');
            if (parent && !parent.closest('.submenu-level')) {
                submenu.classList.add('open');
                const arrow = parent.querySelector('.list-item__arrow');
                if (arrow) arrow.classList.remove('rotated');
            }
        });

        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('list-item__arrow')) {
                const listItem = e.target.closest('.my-list-item');
                const submenu = listItem.querySelector('.submenu-level');

                if (submenu) {
                    submenu.classList.toggle('open');
                    e.target.classList.toggle('rotated');
                }
            }

            if (e.target.closest('.d-flex') && !e.target.classList.contains('list-item__arrow')) {
                const listItem = e.target.closest('.my-list-item');
                const arrow = listItem.querySelector('.list-item__arrow');
                if (arrow) {
                    const submenu = listItem.querySelector('.submenu-level');
                    if (submenu) {
                        submenu.classList.toggle('open');
                        arrow.classList.toggle('rotated');
                    }
                }
            }
        });
    });
</script>
</body>
</html>