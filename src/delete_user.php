<?php

$query = 'DELETE FROM books WHERE id=?;';

$id = filter_input(INPUT_GET, 'del');

$stmt = $pdo->prepare($query);
$stmt->execute([$id]);

return [
    'msg' => 'Deleting Record',
    'data' => true,
];