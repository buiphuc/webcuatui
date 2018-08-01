<?php
$page=new core();

if($_GET['action'] == 'danh-sach'){
    $html='modules/danhmuc/admin/danhsach.html';
}
if($_GET['action'] == 'them-moi'){
    $html='modules/danhmuc/admin/themmoi.html';
}
$menu = $this->sqlite_row('select * from  categories');
if(sizeof($menu) > 0){
  $categories = showCategories($menu, $parent_id = 0, $char = '');
}
$page->rv('$categories',$categories);

$page->create_content($html);
$page->create_template();
return $page->content;
?>