<?php
header("Content-type:text/html;chartset-utf-8");

$username=$_POST["username"];
if($username==="admin"){
echo"用户名不能是admin";
}else{
echo"用户名可以注册"}
}