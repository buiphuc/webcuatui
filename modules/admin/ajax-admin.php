<?
session_start();
require('../../library/common.php');
$page=new core();
$page->setting();
$page->sqlite_create();
$admin = (int)$_SESSION['admin_login'];
if($admin != 0){
    if($_POST['type'] == 'themadmin'){
        $str = '';
        $ten = htmlentities(strip_tags($_POST['ten']));
        $email = htmlentities(strip_tags($_POST['email']));
        $dienthoai = htmlentities(strip_tags($_POST['dienthoai']));
        $pass = sha1(md5($_POST['pass']));
        
        if($ten == ''){
            $err[]='Vui lòng nhập vào tên';
        }
        if($email == ''){
            $err[]='Vui lòng nhập vào email';
        }
        if($_POST['pass'] == ''){
            $err[]='Vui lòng nhập vào pass';
        }
        $row = $page->sqlite_single_row('select id from admin where email = "'.$email.'"');
        if((int)$row['id'] != 0){
            $err[]='Email đã được sử dụng vui lòng kiểm tra lại';
        }
        if(isset($err)){
            foreach($err as $e){
                $str.='<li>'.$e.'</li>';
            }
            echo $e;
        }else{
            $page->sqlite_query('insert into admin (ten,email,dienthoai,pass,thoigian,xuatban) values ("'.$ten.'","'.$email.'","'.$dienthoai.'","'.$pass.'",'.time().',1) ');
            echo 1;
        }
    }
    if($_POST['type'] == 'change_info'){
        $id = (int)$_POST['id'];
        $name = htmlentities(strip_tags($_POST['name']));
        if($name == 'pass'){
            $value = sha1(md5($_POST['value']));
        }else{
            $value = htmlentities(strip_tags($_POST['value']));
        }
        $page->sqlite_query('update admin set '.$name.'="'.$value.'" where id='.$id);
        echo 1;
    }
    if($_POST['type'] == 'xuatban_admin'){
        $id = (int)$_POST['id'];
        $row = $page->sqlite_single_row('select * from admin where id='.$id);
        if( (int)$row['id'] != 0){
            if($row['xuatban'] == 1){
                $v = 0;
            }else{
                $v = 1;
            }
            $page->sqlite_query('update admin set xuatban="'.$v.'" where id='.$id);
            echo 1;
        }else{
            echo 'Tài khoản quản trị không tồn tại hoặc đã bị xóa';
        }
    }
    if($_POST['type'] == 'xoa_admin'){
        $id = (int)$_POST['id'];
        $row = $page->sqlite_single_row('select * from admin where id='.$id);
        if( (int)$row['id'] != 0){
            $page->sqlite_query('delete from admin where id='.$id);
            echo 1;
        }else{
            echo 'Tài khoản quản trị không tồn tại hoặc đã bị xóa';
        }
    }
}else{
    echo 'Bạn đang không đăng nhập. Vui lòng đăng nhập để thực hiện chức năng này';
}
?>