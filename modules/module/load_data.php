<?
session_start();
require('../../library/common.php');
$page=new core();
$page->setting();
$page->sqlite_create();
$row    = $page->sqlite_query('select * from modules order by id desc');
if(mysqli_num_rows($row) > 0){
    while($data = mysqli_fetch_assoc($row)){
        if($data['xuatban'] == 1){
            $xb = 'checked=\'checked\'';
        }else{
            $xb = '';
        }
        $array[] = array(
                            'id'=>$data['id'], 
                            'ten'=>$data['ten'],
                            'chucnang'=>$data['chucnang'], 
                            'thoigian'=>date('Y/m/d H:i:s', $data['thoigian'] ) ,
                            'xuatban'=> '<input type="checkbox" '.$xb.'  data-id=\''.$data['id'].'\' class=\'xuatban-modules\'  />');
    }
}


echo json_encode($array);

?>