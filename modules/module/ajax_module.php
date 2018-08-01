<?
session_start();
require('../../library/common.php');
$page=new core();
$page->setting();
$page->sqlite_create();
$admin = (int)$_SESSION['admin_login'];
if($admin != 0){
    if($_POST['type'] == 'themmodules'){
        $str = '';
        $ten = htmlentities(strip_tags($_POST['ten']));
        $chucnang = removeTitle($_POST['chucnang'],'-');
        $me = (int)$_POST['me'];
        
        if($ten == ''){
            $err[] ='Vui lòng nhập vào tên chức năng';
        }
        if($_POST['chucnang'] == ''){
            $err[] ='Vui lòng nhập vào chức năng';
        }
        if(isset($err)){
            foreach($err as $e){
                $str.='<li>'.$e.'</li>';
            }
            echo $e;
        }else{
            $page->sqlite_query('insert into modules (ten,chucnang,me,thoigian,xuatban) values ("'.$ten.'","'.$chucnang.'",'.$me.','.time().',1) ');
            echo 1;
        }
    }
    if($_POST['type'] == 'xuatban_modules'){
        $id = (int)$_POST['id'];
        $row = $page->sqlite_single_row('select xuatban,id from modules where id='.$id);
        if((int)$row['id'] == 0){
            echo 'Modules không tồn tại hoặc đã bị xóa';
        }else{
            if($row['xuatban'] == 1){
                $v = 0;
            }else{
                $v = 1;
            }
            $page->sqlite_query('update modules set xuatban = '.$v.' where id='.$id);
            echo 1;
        } 
    }
    if($_POST['type'] == 'xoa_modules'){
        $id = (int)$_POST['id'];
        $row = $page->sqlite_single_row('select id from modules where id='.$id);
         if((int)$row['id'] == 0){
            echo 'Modules không tồn tại hoặc đã bị xóa';
        }else{
            $page->sqlite_query('delete from  modules  where id='.$id);
            echo 1;
        }
    }
}else{
    echo 'Bạn đang không đăng nhập. Vui lòng đăng nhập để thực hiện chức năng này';
}
?>