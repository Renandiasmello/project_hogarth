<?php

$query = 'SELECT * FROM books;';

$stmt = $pdo->prepare($query);
$stmt->execute();

return [
    'msg' => 'All records',
    'data' => $stmt->fetchAll(\PDO::FETCH_ASSOC),
];