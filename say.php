<?php
require_once(dirname(__FILE__) . "/config.php");

error_reporting(E_ALL);
setlocale(LC_ALL, "ja_JP.utf8");

$name = $_REQUEST["author"];
$content = htmlspecialchars($_REQUEST["text"]);

function replaceYoutube($string){
  $regex = "/https\:\/\/www\.youtube\.com\/watch\?v\=(.*)/";
  // https://i.ytimg.com/vi/xTU0K5q7Zbo/mqdefault.jpg
  if(preg_match($regex,$string,$m)){
      return array("replaced" => true , "content" => "<a href='". $string . "' target='_blank'>" . $string ."\n<img src='https://i.ytimg.com/vi/". $m[1] . "/mqdefault.jpg'/></a>\n"); 
  }else{
      return array("replaced" => false , "content" => $string . "\n") ;
  }
}

function replaceLink($string){
    $regex = "/http.*/";
    if(preg_match($regex,$string,$m)){
        return array("replaced" => true, "content" => "<a href='" . $string . "' target='_blank'>" . $string . "</a>\n");
    }else{
        return array("replaced" => false, "content" => $string . "\n" );
    }
}

function insertSay($name,$content){
    $sql = "insert into chat(name,content) values(:name,:content);";
    $pdo = getDB();
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(":name" => $name, ":content" => nl2br($content)));
}

$content = str_replace("\r\n","\n",$content);
$content_ar = explode("\n",$content);
for($i=0,$l=count($content_ar);$i<$l;$i++){
    $ret = replaceYoutube($content_ar[$i]);
    if($ret["replaced"]){
        $content_ar[$i] = $ret["content"];
    }else{
        $ret = replaceLink($content_ar[$i]);
        $content_ar[$i] = $ret["content"];
    }
}
$content = implode($content_ar,"");
//var_dump($content);
insertSay($name,$content);

setcookie("author",$name,time()+60*60*24*365);

header("Content-Type:application/json");
echo json_encode(array("status" => "ok"));
