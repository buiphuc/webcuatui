<?php
session_start();
require_once('library/common.php');
$page=new core();
$page->setting();
$page->sqlite_create();
$_SESSION['admin_login'] = 1; 
$page->create_admin();
if((int)$_SESSION['admin_login'] != 0 ){
    
    if($_GET['f']=='admin')$content=$page->m('admin/danhsach.php');

}

$page->rv('$content',$content);
$page->create_template();
$page->show_html();

?>