<?php
require_once(dirname(__FILE__) . "/config.php");

error_reporting(E_ALL);
setlocale(LC_ALL, "ja_JP.utf8");

function loadSay(){
    $pdo = getDB();
    if($_REQUEST["cursor"] == "load"){
        $sql = "select id,name as author,content as text from chat /*where content > :cursor OR 1 = 1*/;";
    }else{
        $sql = "select id,name as author,content as text from chat /*where id > :cursor*/ ";
    }
    $stmt = $pdo->prepare($sql);
    //$stmt->execute(array(":cursor" => $_REQUEST["cursor"]));
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

$arr = loadSay();

header("Content-Type:application/json");
echo json_encode($arr);
