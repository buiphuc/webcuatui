<?php
session_start();
require_once('../library/common.php');
$page=new core();
$page->setting();
$page->sqlite_create();

if($_POST['type'] == 'login_admin'){
    $email = getValue($_POST['email'],2);
    $pass  = sha1(md5($_POST['pass']));
    
    $row = $page->sqlite_single_row('select * from admin where email="'.$email.'" and pass="'.$pass.'"');
    if($row['id'] != 0){
        $_SESSION['info_admin'] = $row;
        $_SESSION['admin_login'] = $row['id'];
        echo 1;
    }else{
        echo 0;   
    }
}
?>