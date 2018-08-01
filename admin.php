<?php
session_start();
require_once('library/common.php');
require_once('library/page.php');
$page=new core();
$page->setting();
$page->sqlite_create();
$_SESSION['admin_login'] = 1; 
$page->create_admin();
if((int)$_SESSION['admin_login'] != 0 ){
    
    if($_GET['f']=='quan-ly-admin')$content=$page->m('admin/danhsach.php');
    if($_GET['f']=='modules')$content=$page->m('module/danhsach.php');
    if($_GET['f']=='quan-ly-danh-muc')$content=$page->m('danhmuc/admin/index.php');
    
    $menu = $page->sqlite_row('select * from modules where xuatban = 1');
    if(sizeof($menu) > 0)
    {
        foreach($menu as $m){
            if($m['me'] == 0){
                
                        $li2 = ''; $hienthi2 = 0;
                        foreach($menu as $m2){
                            if($m2['me'] == $m['id']){
                                if($m2['menutrai'] == 1){
                                    $hienthi2 = 1;
                                }
                                $li2.='<li>
                                        <a href="/admin.php?f='.$m['chucnang'].'&action='.$m2['chucnang'].'">'.$m2['ten'].'</a>
                                    </li>';
                            }
                        }
                        if($li2!= '' && $hienthi2 == 1 ){
                            $li1.='<li class="has-sub">
                                <a class="js-arrow" href="#">
                                    <i class="fas fa-tachometer-alt"></i>'.$m['ten'].'</a>
                            ';
                            $li1.='<ul class="list-unstyled navbar__sub-list js-sub-list">'.$li2.'</ul>';
                        }else{
                            $li1.='<li class="has-sub">
                                <a class="js-arrow" href="/admin.php?f='.$m['chucnang'].'">
                                    <i class="fas fa-tachometer-alt"></i>'.$m['ten'].'</a>
                            ';
                        }
                $li1 .='<li>';
            }
        }
    }
}
$page->rv('$menuleft',$li1);
$page->rv('$content',$content);
$page->create_template();
$page->show_html();

?>

                                
                                
                            