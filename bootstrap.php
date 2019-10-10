<?php

$pdo = require_once __DIR__ . '/connection.php';

switch ($_SERVER['REQUEST_METHOD']) {
	case 'POST':
			$response = require_once __DIR__ . '/src/save_user.php';
		break;
	case 'GET' && isset($_GET['put']):
			$response = require_once __DIR__ . '/src/put_user.php';
		break;
	case 'GET' && isset($_GET['del']):
			$response = require_once __DIR__ . '/src/delete_user.php';
		break;
	default:
			$response = require_once __DIR__ . '/src/list_users.php';
		break;
}

header('Content-Type: application-json');

echo json_encode($response);
