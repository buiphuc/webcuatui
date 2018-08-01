<?php

$page=new core();
$html='modules/module/danhsach.html';

$row    = $this->sqlite_row('select * from modules where me = 0 order by id desc');

if(sizeof($row)>0)
{ 
	foreach($row as $r)
	{
	   if($r['xuatban'] == 1){
	       $checked= 'checked="checked"';
	   }else{
	       $checked = '';
	   }
	   $table_chucnang .= '
         <tr>
            <td><span data-toggle="collapse" data-target="#collapseme'.$r['id'].'" >+</span></td>
            <td>'.$r['id'].'</td>
            <td>'.$r['ten'].'</td>
            <td>'.$r['chucnang'].'</td>
            <td>'.date('Y/m/d H:i',$r['thoigian']).'</td>
            <td><input type="checkbox" class="xuatban_modules" data-id="'.$r['id'].'" '.$checked.' /></td>
            <td><a href="javascript:void(0)" data-id="'.$r['id'].'" class="xoa_modules"><i class="fa fa-trash-o"></i></a></td>
        </tr>
        <tr id="collapseme'.$r['id'].'" class="collapse out collapse_child">
            
        </tr>
       ';
       $option_chucnang .='<option value="'.$r['id'].'">'.$r['ten'].'</option>';
       
	}
}
$page->rv('$table_chucnang',$table_chucnang);
$page->rv('$option_chucnang',$option_chucnang);
$page->create_content($html);
$page->create_template();
return $page->content;
?>