<?php

    try {
        $pdo = new PDO('mysql:dbname=project_hogarth;host=localhost', 'root', '', [PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8']);
        return $pdo;
    } catch (Exception $e) {
        die("Error to try connect " . $e->getMessage());
    }
