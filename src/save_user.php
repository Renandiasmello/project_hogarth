<?php

$title = filter_input(INPUT_POST, 'title');
$author = filter_input(INPUT_POST, 'author');
$id = filter_input(INPUT_POST, 'id');

if (!trim($title)) {
    http_response_code(422);
    return [
        'msg' => 'Title is required'
    ];
}

if (!trim($author)) {
    http_response_code(422);
    return [
        'msg' => 'Author is required'
    ];
}

if(empty($id)){
    $query = 'INSERT INTO books (title, author) VALUES (?, ?);';
    $msg = 'Creating new register.';
} else {
    $query = 'UPDATE books SET title=?, author=? WHERE id=?;';
    $msg = 'Updating register.';
}

$stmt = $pdo->prepare($query);
if(!$id){
    $stmt->execute([
        $title,
        $author
    ]);
} else {
    $stmt->execute([
        $title,
        $author,
        $id
    ]);
}
return [
    'msg' => $msg,
    'data' => [
        'id' => $pdo->lastInsertId()
    ]
];