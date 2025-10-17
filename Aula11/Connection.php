<?php

class Connection {

    public static function getInstance() {
        static $conn = null;

        if (!isset($conn)) {
            $connectionString = "host=localhost port=5432 dbname=local user=postgres password=1309";
            $connection = pg_connect($connectionString);
        }

        return $connection;
    }

    public static function query(string $sql) {
        $connection = self::getInstance();
        return pg_query($connection, $sql);
    }
}