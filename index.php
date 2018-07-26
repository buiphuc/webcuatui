<?php
session_start();
require_once('library/common.php');
   
$page=new core();
$page->setting();
$page->sqlite_create();
$page->create_main_html();

//$GLOBALS['categoryid'] = 0;
$page->create_template();
$page->show_html();

?> 