<?php
header("Content-type:text/html;chartset-utf-8");

$username=$_GET["username"];
if($username==="admin"){
echo"false";
}else{
echo"true"}
}