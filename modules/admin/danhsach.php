<?php

$page=new core();
$html='modules/admin/danhsach.html';

$page->create_content($html);
$page->create_template();
return $page->content;
?>