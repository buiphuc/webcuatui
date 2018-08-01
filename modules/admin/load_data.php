<?
session_start();
require('../../library/common.php');
$page=new core();
$page->setting();
$page->sqlite_create();
$row    = $page->sqlite_query('select * from admin order by id desc');
if(mysqli_num_rows($row) > 0){
    while($data = mysqli_fetch_assoc($row)){
        if($data['xuatban'] == 1){
            $xb = 'checked=\'checked\'';
        }else{
            $xb = '';
        }
        $array[] = array(
                            'id'=>$data['id'], 
                            'ten'=> '<input class="info_user form-control" type="text" value="'. $data['ten'].'" data-name="ten" data-id="'.$data['id'].'">',
                            'email'=> '<input class="info_user form-control" type="text" value="'.$data['email'].'" data-name="email" data-id="'.$data['id'].'">' , 
                            'pass'=> '<input class="info_user form-control" type="text" placeholder="Thay đổi password"  data-name="email" data-id="'.$data['id'].'">' , 
                            'dienthoai'=>'<input class="info_user form-control" type="text" value="'.$data['dienthoai'].'" data-name="dienthoai" data-id="'.$data['id'].'">' ,
                            'xoa'=>'<a href="#" data-id="'.$data['id'].'" class="xoa" >Xóa</a>' ,
                            'xuatban'=> '<input  type="checkbox" '.$xb.'  data-id=\''.$data['id'].'\' class=\'xuatban-admin\'  />');
    }
}


echo json_encode($array);

?>
