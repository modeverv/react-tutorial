<?php

/**
 * get DB connection(PDO)
 */
function getDB(){
    $db = dirname(__FILE__) . "/chat2.db";
    $dsn = "sqlite:" . $db;
    $user = '';
    $pass = '';
    $dbh;
    try{
        $dbh = new PDO($dsn, $user, $pass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch (PDOException $e){
        echo('Error:'.$e->getMessage());
        die();
    }
    return $dbh;
}
