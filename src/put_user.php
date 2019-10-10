<?php

$query = 'SELECT * FROM books WHERE id=?;';

$stmt = $pdo->prepare($query);
$stmt->execute([
    filter_input(INPUT_GET, 'put')
]);

return [
    'msg' => 'A record',
    'data' => $stmt->fetch(\PDO::FETCH_ASSOC),
];