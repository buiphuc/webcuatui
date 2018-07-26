<?php
date_default_timezone_set("Asia/Ho_Chi_Minh");
class core
{


function get_relative()
{
	$self=$_SERVER['PHP_SELF'];
	$sogach=substr_count($self, '/')-1;
	if($_SERVER['SERVER_NAME']=='localhost')
	{
		$sogach=$sogach-1;
	}
	$this->relative=@str_repeat('../',$sogach);
	return $this->relative;
}
function setting()
{
	$this->get_relative();
}
function sqlite_create()
{ 
    $this->conn = mysqli_connect('localhost', 'root', 'mysql','webcuatui') or die("Can't not connection database");
	//GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'hailong@123456' WITH GRANT OPTION;
} 
   
function sqlite_query($sql)
{
	return $result=@mysqli_query($this->conn,$sql);
}  
function sqlite_row($sql)
{
	$result=@mysqli_query($this->conn,$sql);
	while($row=@mysqli_fetch_assoc($result))
	{
		$row_data[]=$row;
	}
	return $row_data;
}
function sqlite_single_row($sql)
{
	$result=@mysqli_query($this->conn, $sql);
	$row=@mysqli_fetch_assoc($result);
	return $row;
}
function mem_get($key)
{
	if(!$this->memcache)
	{
		$this->memcache = new Memcache;
		$host='localhost';
		if(get_node()!=1)$host='10.0.0.1';
		@$this->memcache->connect($host, 11211) or die ("");
	}
	return $this->memcache->get($key);
}

function mem_set($key,$var,$flag=false,$expire=0)
{
	if(!$this->memcache)
	{
		$this->memcache = new Memcache;
		$host='localhost';
		if(get_node()!=1)$host='10.0.0.1';
		@$this->memcache->connect($host, 11211) or die ("");
	}
	$this->memcache->set($key,$var,$flag,$expire);
}

function mem_del($key)
{
	if(!$this->memcache)
	{
		$this->memcache = new Memcache;
		$host='localhost';
		if(get_node()!=1)$host='10.0.0.1';
		@$this->memcache->connect($host, 11211) or die ("");
	}
	$this->memcache->delete($key);
}

function mem_flush()
{
	if(!$this->memcache)
	{
		$this->memcache = new Memcache;
		$host='localhost';
		if(get_node()!=1)$host='10.0.0.1';
		@$this->memcache->connect($host, 11211) or die ("");
	}
	$this->memcache->flush();
}
function check_domain($domain)
{
 	$domain=str_replace('_','',$domain);
	if (preg_match ("#^(([a-z0-9][-a-z0-9]*?[a-z0-9])\.)+[a-z]{2,7}$#", $domain)) {
	return true;
	} else {

	return false;
	}
}


function create_main_html()
{
	include 'library/Mobile-Detect-2.8.11/Mobile_Detect.php';
		$detect = new Mobile_Detect();

        if($_GET['f'] == 'tintuc'){
			$this->create_content('templates/tintuc/index.html');
		}elseif($_GET['print'] == 1){
			$this->create_content('templates/print.html');
		}elseif(!isset($_GET) || $_GET['f'] == '' || $_GET['f'] == 'gioithieuvina'){
			$this->create_content('templates/giaodien-v3/index2.html');
		}elseif($_GET['f'] == 'xemkhoahoc' || $_GET['f'] == 'danhsachhs' || $_GET['f'] == 'chatroom'){
			$this->create_content('templates/giaodien-v3/index2.html');
		}elseif($_GET['f'] == 'tailieu' || $_GET['f'] == 'danhsachdownload' ){
			$this->create_content('templates/index_tailieu.html');
		}elseif($_GET['f'] == 'video'){
			$this->create_content('templates/video/index.html');
		}
        /*elseif($_GET['f'] == 'xembaihoc'){
			$this->create_content('templates/khoahoc/xembaihoc.html');
		}*/else{
			//$this->create_content('templates/index.html');
            //$this->create_content('templates/index-v3/xemkhoahoc.html');
		      $this->create_content('templates/giaodien-v3/trangcon.html');
        }
	

		//$this->create_content('templates/index.html');

}


function get_object_from_xml_file($file,$key,$relative=NULL)
{
	require_once('library/xml_array.php');
	$this->xml_object = readDatabase($relative.$file,$key);
}




function utf8_strlen($s) {
    return strlen(utf8_decode($s));
}

function get_cutted_string($str,$len,$more='...'){
	# utf8 substr
	# www.yeap.lv
	if($this->utf8_strlen($str)>$len)
	{
		$addmore=$more;
	}
	$from=0;
return @preg_replace('#^(?:[\x00-\x7F]|[\xC0-\xFF][\x80-\xBF]+){0,'.$from.'}'.
			   '((?:[\x00-\x7F]|[\xC0-\xFF][\x80-\xBF]+){0,'.$len.'}).*#s',
			   '$1',$str).$addmore;
}
function cut_string($str, $length, $char=" ..."){
	$strlen	= mb_strlen($str, "UTF-8");
	if($strlen <= $length) return $str;
	$substr	= mb_substr($str, 0, $length, "UTF-8");
	if(mb_substr($str, $length, 1, "UTF-8") == " ") return $substr . $char;
	$strPoint= mb_strrpos($substr, " ", "UTF-8");
	if($strPoint < $length - 20) return $substr . $char;
	else return mb_substr($substr, 0, $strPoint, "UTF-8") . $char;
}

function create_content($template)
{
	$this->content = @file_get_contents($template) or die ('Khong tim thay file giao dien '.$template);
}


function rv($key,$value)
{
	$this->replace_array[]=array($key,$value);
}
function replace_all($row,$strip=1)
{
	if(sizeof($row)>0)
	{
		foreach($row as $name=>$value)
		{
			if($strip==1)$value=stripslashes($value);
			$this->rv('$'.$name,$value);
		}
	}
}

function replace_element($key,$value)
{
	$this->content=str_replace($key,$value ,$this->content);
}


function rl($key,$key_array,$row_array,$comment_type=null)
{
	if(count($row_array)>0)
	{
		$loop_content='/*'.$this->content.'*/';
		foreach($key_array as $ka)
		{
			$i_ndot++;
			eval($ka.'=$ka;');
			$command.=$ka.'=$ra['.($i_ndot-1).'];';
		}
		if($this->replace_out_loop!=TRUE or !isset($this->replace_out_loop))
		{
			if(count($this->replace_array)>0)
			{
				foreach($this->replace_array as $ra)
				{
					@eval($ra[0].'=$ra[1];');
				}
			}
		}
		$begin='*/
		foreach($row_array as $ra)
		{
			'.$command.'
			$piece.=<<<CHEN
';
			$end='
CHEN;
		}
	/*
	';

		${begin_loop.$key}=$begin;
		${end_loop.$key}=$end;

		eval('$content=<<<CHEN
'.$loop_content.'
CHEN;
	');
		eval($content);


		$key='loop'.$key;
		$this->replace_loop_array[]=array($key,$piece);
	}
}


function get_part_loop()
{
	if(count($this->replace_array)>0)
	{
		foreach($this->replace_array as $ra)
		{
			@eval($ra[0].'=$ra[1];');

		}
	}

	if(count($this->replace_loop_array)>0)
	{
		$loop_content='$nd=<<<CHEN
'.$this->content.'
CHEN;
';

		$begin_loop='
CHEN;
/*
';

		$end_loop='
*/
$this->duoi=<<<CHEN
	';

		eval($loop_content);
		$nd='$this->dau=<<<CHEN

'.$nd.'
CHEN;
';

	eval($nd);


	}

}

function create_template()
{
	if(count($this->replace_loop_array)!=1)
	{
		if(count($this->replace_array)>0)
		{
			foreach($this->replace_array as $ra)
			{
				@eval($ra[0].'=$ra[1];');
			}
		}

		if(count($this->replace_loop_array)>0)
		{
			foreach($this->replace_loop_array as $rla)
			{
				${begin_.$rla[0]}	=	$rla[1].'<!--';
				${end_.$rla[0]}	=	'-->';

			}
		}

		@eval('$content=<<<CHEN
	'.$this->content.'
CHEN;
		');

		$this->content=@encode_string($content);

	}
	else
	{
		$this->get_part_loop();
		foreach($this->replace_loop_array as $rla)
		{
			$giualap=$rla[1];

		}
		$this->content=@encode_string($this->dau.$giualap.$this->duoi);
	}
}


function show_html()
{
	echo $this->content;
}



function encode_post($data)
{
	return @encode_string((trim(($this->decode_java($data)))));
}
function encode_post_2($data)
{
	return @encode_string(trim($data));
}

function encode_text_area($data)
{
	return @encode_string((trim((strip_tags($this->decode_java($data),'<br></br></ br>')))));
}

function encode_text($data)
{
	return (trim((strip_tags($this->decode_java($data)))));
}

function encode_editor($data)
{
	$allow_tag='<strong><em><b><p><a><br></br></ br><div><style><span><img><table><tbody><th><tr><td><center><h1><h2><h3><h4><h5><h6><li><ul><font><pre><i><hr><object><embed><param><flash><iframe><script><mce:script><xmp><blockquote>';
	//echo '<xmp>'.$data.'</xmp>';
	return (trim(($this->decode_java(strip_tags($data,$allow_tag)))));
}


function encode_sqlite($data)
{
	return sqlite_escape_string($data);
}

function decode_java($data)
{
	return $data;
}

function decode($data)
{
	return stripslashes($data);
}


function get_post_data()
{
	if($_POST['text_array']!='')
	{
		$text_array=$this->encode_post($_POST['text_array']);
		$pieces = explode(" ", $text_array);
		foreach($pieces as $p)
		{
			$text_result[$p]=$this->encode_post($_POST[$p]);
		}
		$result['text']=$text_result;
	}
	if($_POST['select_one_array']!='')
	{
		$select_one_array=$this->encode_post($_POST['select_one_array']);
		$pieces = explode(" ", $select_one_array);
		foreach($pieces as $p)
		{
			$select_one_result[$p]=$this->encode_post($_POST[$p]);
		}
		$result['select_one']=$select_one_result;
	}

	if($_POST['logic_array']!='')
	{
		$logic_array=$this->encode_post($_POST['logic_array']);
		$pieces = explode(" ", $logic_array);
		foreach($pieces as $p)
		{
			$logic_result[$p]=$_POST[$p];
		}
		$result['logic']=$logic_result;
	}

	if($_POST['textarea_array']!='')
	{
		$textarea_array=$this->encode_post($_POST['textarea_array']);
		$pieces = explode(" ", $textarea_array);
		foreach($pieces as $p)
		{
			$textarea_result[$p]=$this->encode_post(nl2br($_POST[$p]));
		}
		$result['textarea']=$textarea_result;
	}
	if($_POST['frame_array']!='')
	{
		$frame_array=$this->encode_post($_POST['frame_array']);
		$pieces = explode(" ", $frame_array);
		foreach($pieces as $p)
		{
			$frame_result[$p]=$this->encode_post($_POST[$p]);
		}
		$result['frame']=$frame_result;
	}


	if($_POST['select_multiple']!='')
	{
		$select_multiple_array=$this->encode_post($_POST['select_multiple']);
		$pieces = explode(" ", $select_multiple_array);

		foreach($pieces as $p)
		{
			$select_multiple_result[$p]=$this->encode_post($_POST[$p]);
		}
		$result['select_multiple']=$select_multiple_result;
	}
	if($_POST['select_multiple_inner']!='')
	{
		$select_multiple_innerHTML_array=$this->encode_post($_POST['select_multiple_inner']);
		$pieces = explode(" ", $select_multiple_innerHTML_array);
		foreach($pieces as $p)
		{
			$select_multiple_innerHTML_result[$p]=$this->encode_post($_POST['select_multiple_inner']);
		}
		$result['select_multiple_inner']=$select_multiple_innerHTML_result;
	}


	return $result;

}


function get_post_data_2()
{
	if($_POST['text_array']!='')
	{
		$text_array=$this->encode_post_2($_POST['text_array']);
		$pieces = explode(" ", $text_array);
		foreach($pieces as $p)
		{
			$text_result[$p]=$this->encode_post_2($_POST[$p]);
			$result_all[$p]=$this->encode_post_2($_POST[$p]);
		}
		$result['text']=$text_result;
	}
	if($_POST['select_one_array']!='')
	{
		$select_one_array=$this->encode_post_2($_POST['select_one_array']);
		$pieces = explode(" ", $select_one_array);
		foreach($pieces as $p)
		{
			$select_one_result[$p]=$this->encode_post_2($_POST[$p]);
			$result_all[$p]=$this->encode_post_2($_POST[$p]);
		}
		$result['select_one']=$select_one_result;
	}

	if($_POST['logic_array']!='')
	{
		$logic_array=$this->encode_post_2($_POST['logic_array']);
		$pieces = explode(" ", $logic_array);
		foreach($pieces as $p)
		{
			$logic_result[$p]=$_POST[$p];
			$result_all[$p]=$this->encode_post_2($_POST[$p]);
		}
		$result['logic']=$logic_result;
	}

	if($_POST['textarea_array']!='')
	{
		$textarea_array=$this->encode_post_2($_POST['textarea_array']);
		$pieces = explode(" ", $textarea_array);
		foreach($pieces as $p)
		{
			$textarea_result[$p]=$this->encode_post_2($_POST[$p]);
			$result_all[$p]=$this->encode_post_2($_POST[$p]);
		}
		$result['textarea']=$textarea_result;
	}
	if($_POST['frame_array']!='')
	{
		$frame_array=$this->encode_post_2($_POST['frame_array']);
		$pieces = explode(" ", $frame_array);
		foreach($pieces as $p)
		{
			$frame_result[$p]=$this->encode_post_2($_POST[$p]);
			$result_all[$p]=$this->encode_post_2($_POST[$p]);
		}
		$result['frame']=$frame_result;
	}


	if($_POST['select_multiple']!='')
	{
		$select_multiple_array=$this->encode_post_2($_POST['select_multiple']);
		$pieces = explode(" ", $select_multiple_array);
		foreach($pieces as $p)
		{
			$select_multiple_result[$p]=$this->encode_post_2($_POST[$p]);
			$result_all[$p]=$this->encode_post_2($_POST[$p]);
		}
		$result['select_multiple']=$select_multiple_result;
	}
	if($_POST['select_multiple_innerHTML']!='')
	{
		$select_multiple_innerHTML_array=$this->encode_post_2($_POST['select_multiple_innerHTML']);
		$pieces = explode(" ", $select_multiple_innerHTML_array);
		foreach($pieces as $p)
		{
			$select_multiple_innerHTML_result[$p]=$this->encode_post_2($_POST[$p.'innerHTML']);
			//$result_all[$p]=$this->encode_post_2($_POST[$p]);
			$result_all[$p]=$this->encode_post_2($_POST[$p.'innerHTML']);
		}
		$result['select_multiple_innerHTML']=$select_multiple_innerHTML_result;
	}
	$this->result_all=$result_all;
	return $result;

}

function a($value)
{
	if($value=='')return '';
	return (int)$value;
}

function check_var($var,$error_string='')
{
	$arr1 = str_split($var);
	if(ord($arr1[0])>=48 and ord($arr1[0])<=57)
	{
		$this->error[]=$error_string;
		return false;
	}
	foreach($arr1 as $a)
	{
		$ok=0;
		if(ord($a)>=65 and ord($a)<=90)$ok=1;
		if(ord($a)>=97 and ord($a)<=122)$ok=1;
		if(ord($a)>=48 and ord($a)<=57)$ok=1;
		if(ord($a)==95)$ok=1;
		if($ok===0)
		{
			$this->error[]=$error_string;
			return false;
		}
	}

}

function check_non_speacial_char($var,$error_string='')
{
	$arr1 = str_split($var);
	foreach($arr1 as $a)
	{
		$ok=0;
		if(ord($a)>=65 and ord($a)<=90)$ok=1;
		if(ord($a)>=97 and ord($a)<=122)$ok=1;
		if(ord($a)>=48 and ord($a)<=57)$ok=1;
		if(ord($a)==95)$ok=1;
		if($ok===0)
		{
			$this->error[]=$error_string;
			return false;
		}
	}

}
function check_is_num($var,$error_string='')
{
	$arr1 = str_split($var);
	foreach($arr1 as $a)
	{
		$ok=0;
		if(ord($a)>=48 and ord($a)<=57)$ok=1;
		if($ok===0)
		{
			$this->error[]=$error_string;
			return false;
		}
	}

}

function check_null($var,$error_string='')
{
	if($var=='')$this->error[]=$error_string;
}

function get_error($error=NULL,$option1='',$option2='')
{
	if(!isset($error))$error=$this->error;
	if(count($error)>0)
	{
		foreach($error as $e)
		{
			$er.=$option1.$e.$option2;
		}
		return $er;
	}

}

function m($module,$option=NULL)
{

	return @include("modules/".$module);
}



function create_admin()
{
    if((int)$_SESSION['admin_login'] != 0 ){
        $this->create_content('templates/admin/index.html');
    }else{
        $this->create_content('templates/admin/login.html');    
    }
	
}




function get_query_string($exist_array=NULL,$sub_array=NULL,$and_string='&amp;')
{
	if(isset($exist_array))
	{
		$new_array=array_merge($_GET, $exist_array);
		foreach($new_array as $name=>$value)
		{
			$name=$this->clear_file($name);
			$value=$this->clear_file($value);
			$s_string.=$and_string.$name.'='.$value;
		}
	}

	if(isset($sub_array))
	{
		$new_array=array_merge($_GET, $sub_array);
		foreach($sub_array as $name=>$value)
		{
			$name=$this->clear_file($name);
			$value=$this->clear_file($value);
			unset($new_array[$name]);
		}
		foreach($new_array as $name=>$value)
		{
			$name=$this->clear_file($name);
			$value=$this->clear_file($value);
			$s_string.=$and_string.$name.'='.$value;
		}


	}
	if(substr($s_string,0,5)==$and_string)return substr($s_string,5);
	return substr($s_string,1);
}



function rewrite_to_get()
{
	$stringurl=$_GET['stringurl'];
	$stringurl_array=explode('&',$stringurl);
	foreach($stringurl_array as $r)
	{
		$get_array=explode('=',$r);
		$key=$get_array[0];
		$value=$get_array[1];
		$_GET[$key]=$value;
	}
}

function get_rewrite_query_string($exist_array=NULL,$sub_array=NULL,$and_string='&amp;')
{
	foreach($exist_array as $name=>$value)
	{
		$sub_array[$name]=0;
	}
			print_r($my_get);

	if(isset($exist_array))
	{
		$new_array=array_merge($my_get, $exist_array);
		foreach($new_array as $name=>$value)
		{

			$name=$this->clear_file($name);
			$value=$this->clear_file($value);
			$s_string.=$and_string.$name.'='.$value;
		}
	}

	if(isset($sub_array))
	{

		$new_array=array_merge($my_get, $sub_array);
		foreach($sub_array as $name=>$value)
		{
			$name=$this->clear_file($name);
			$value=$this->clear_file($value);
			unset($new_array[$name]);
		}
		foreach($new_array as $name=>$value)
		{
			$name=$this->clear_file($name);
			$value=$this->clear_file($value);
			$s_string.=$and_string.$name.'='.$value;
		}


	}
	if(substr($s_string,0,5)==$and_string)return substr($s_string,5);
	return substr($s_string,1);
}







function encode_edit($edit)
{
	return htmlentities($edit,ENT_QUOTES,'UTF-8');
}


function show_error_note()
{
	$string='
	if(sizeof($java_error_element)>0)
	{
		foreach($java_error_element as $j)
		{
			echo \'hidden_element("\'.$j.\'");\';

		}

	}
	if(sizeof($java_error)>0)
	{
		foreach($java_error as $j)
		{
			echo \'error_note("\'.$j[\'ele\'].\'","\'.$j[\'echo\'].\'");\';

		}

	}';
	return $string;

}


function tcvn2uni($st)
	{
		$vietU 	= 'á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ|é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ|ó|ò|ỏ|õ|ọ|ơ|ớ|ờ|ở|ỡ|ợ|ô|ố|ồ|ổ|ỗ|ộ|ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự|í|ì|ỉ|ĩ|ị|ý|ỳ|ỷ|ỹ|ỵ|đ|Á|À|Ả|Ã|Ạ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ|Ó|Ò|Ỏ|Õ|Ọ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự|Í|Ì|Ỉ|Ĩ|Ị|Ý|Ỳ|Ỷ|Ỹ|Ỵ|Đ';
		$vietT 	= '¸|µ|¶|·|¹|¨|¾|»|¼|½|Æ|©|Ê|Ç|È|É|Ë|Ð|Ì|Î|Ï|Ñ|ª|Õ|Ò|Ó|Ô|Ö|ã|ß|á|â|ä|¬|í|ê|ë|ì|î|«|è|å|æ|ç|é|ó|ï|ñ|ò|ô|­|ø|õ|ö|÷|ù|Ý|×|Ø|Ü|Þ|ý|ú|û|ü|þ|®|¸|µ|¶|·|¹|¡|¾|»|¼|½|Æ|¢|Ê|Ç|È|É|Ë|Ð|Ì|Î|Ï|Ñ|£|Õ|Ò|Ó|Ô|Ö|ã|ß|á|â|ä|¥|í|ê|ë|ì|î|¤|è|å|æ|ç|é|ó|ï|ñ|ò|ô|¦|ø|õ|ö|÷|ù|Ý|×|Ø|Ü|Þ|ý|ú|û|ü|þ|§';
		$arr1 		= explode("|", $vietU);
		$arr2		= explode("|", $vietT);
		return str_replace($arr2, $arr1, $st);
	}
//class


function clear_file( $Raw,$skip=NULL ){
    $Raw = trim($Raw);
    $RemoveChars  = array( "([^a-zA-Z0-9_.".$skip."])" );
    $ReplaceWith = array("");
    return @preg_replace($RemoveChars, $ReplaceWith, $Raw);
}


function url_co_dau( $Raw,$skip=NULL ){
    $Raw = trim($Raw);
    $RemoveChars  = array( "([^a-zA-Z0-9_ áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệóòỏõọơớờởỡợôốồổỗộúùủũụưứừửữựíìỉĩịýỳỷỹỵđÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÓÒỎÕỌƠỚỜỞỠỢÔỐỒỔỖỘÚÙỦŨỤƯỨỪỬỮỰÍÌỈĨỊÝỲỶỸỴĐ/])" );
    $ReplaceWith = array("");
    return @preg_replace($RemoveChars, $ReplaceWith, $Raw);
}



function to_number( $Raw ){
    $Raw = trim($Raw);
    $RemoveChars  = array( "([^0-9_.])" );
    $ReplaceWith = array("");
    return @preg_replace($RemoveChars, $ReplaceWith, $Raw);
}

function to_seo_url_bo_gach( $Raw,$codau=NULL ){
	$return=$this->to_seo_url( $Raw,$codau);
	$return=str_replace('/','-',$return);
	return $return;
}


function get_Sale2(){
    $sale = $this->sqlite_single_row('select * from ds_sale where xuatban = 1 order by thoigian asc');
    $this->sqlite_query('update ds_sale set thoigian = '.time().' where id ='.$sale['id']);
    return $sale['admin'];
}
function get_Sale(){    
    $sale = $this->sqlite_row('select * from ds_sale where xuatban = 1 order by thoigian asc');
    $thoigian = time();    
    foreach($sale as $s){
            $batdau = date('d-m-Y H:i',strtotime(date('d-m-Y').' '. $sale['batdau']));
            $ketthuc = date('d-m-Y H:i',strtotime(date('d-m-Y').' '. $sale['ketthuc']));
            $this->sqlite_query('update ds_sale set thoigian = '.time().' where id ='.$sale['id']);
            if($thoigian >= $batdau && $thoigian <= $ketthuc){
                return $s['admin'];  
            }else{
                continue;
            }
    }
    return $this->get_Sale2();

}
function insert_thongbao($nguoinhan,$noidung,$nguoigui = 24,$qc = 0){
    $qr = $this->sqlite_query('insert into thongbao_admin (nguoinhanthongbao,noidungthongbao,thoigian,trangthai,nguoigui,xuatban,type,quangcao) VALUES ('.(int)$nguoinhan.',"'.htmlentities($noidung).'",'.time().',0,'.(int)$nguoigui.',1,0,'.(int)$qc.')');
    if($qr == true){
        return 'true';
    }else{
        return 'false';
    }
}
function insert_thongbao_thanhvien($nguoinhan,$noidung){
    $qr = $this->sqlite_query('insert into thongbao_thanhvien (nguoinhan,noidung,thoigian,xuatban,trangthai) VALUES ('.(int)$nguoinhan.',"'.htmlentities($noidung).'",'.time().',0,0)');
    if($qr == true){
        return 'true';
    }else{
        return 'false';
    }
}
function add_doanhso_giaovien($giaovien,$khoahoc,$gia,$mamua,$thanhvien){
    $array_random = $this->sqlite_single_row('select * from giaovien_random where giaovien = '.$giaovien);
	$array_ko_ds = explode(',',$array_random['thutuan']);

	$hien = 1;
	$loai = 1;
	$dem = $this->sqlite_single_row('select COUNT(*) as C from doanhthugiaovien where giaovien='.$giaovien.' and loai = 1');
	if(sizeof($array_ko_ds) > 0){
		foreach($array_ko_ds as $ads){
			if((int)$dem['C'] == ($ads-1)){
				$hien = 0;
				break;
			}
		}
	}
    if($dem['C'] == 10){
        $this->sqlite_query('update doanhthugiaovien set loai = 0 where giaovien = '.$giaovien);
    }
	return $this->sqlite_query('insert into doanhthugiaovien (giaovien,khoahoc,thoigian,sotien,hien,loai,mamua,thanhvien) values ('.$giaovien.','.$khoahoc.','.time().','.$gia.','.$hien.','.$loai.','.$mamua.','.$thanhvien.')');
}

}

function encode_string($data)
{
	return $data;
}




class xml_db {
    var $name;  // aa name
    var $symbol;    // three letter symbol
    var $code;  // one letter code
    var $type;  // hydrophobic, charged or neutral

    function xml_db ($aa)
    {
		if(sizeof($aa)>0)
        foreach ($aa as $k=>$v)
            $this->$k = $aa[$k];
    }
}
function seo( $Raw,$codau=NULL ){
	$return = preg_replace('/\s+/', ' ',$Raw);
	//$return = preg_replace('~\s{2,}~','-', $Raw);// versio kahcs

	$return=str_replace('&nbsp;','',$return);
	$return=str_replace('&nbsp','',$return);

	$return=str_replace('.','-',$return);

	$return=remove_sign($return);

	$return = preg_replace('/\-+/', '-',$return);
	$return=preg_replace('/\/{2,}/', '-', $return);

	return $return;
}


function readXml($filename)
{
	// read the XML database of aminoacids
    $data = @implode("", @file($filename));
    $parser = xml_parser_create();
    xml_parser_set_option($parser, XML_OPTION_CASE_FOLDING, 0);
    xml_parser_set_option($parser, XML_OPTION_SKIP_WHITE, 1);
    xml_parse_into_struct($parser, $data, $values, $tags);
    xml_parser_free($parser);

    // loop through the structures
    foreach ($tags as $key=>$val) {
        if ($key == "record") {
            $molranges = $val;
            // each contiguous pair of array entries are the
            // lower and upper range for each molecule definition
            for ($i=0; $i < count($molranges); $i+=2) {
                $offset = $molranges[$i] + 1;
                $len = $molranges[$i + 1] - $offset;
                $tdb[] = parseM(array_slice($values, $offset, $len));
            }
        } else {
            continue;
        }
    }
    return $tdb;
}


function readXmlToArray($file)
{

	$db=readXml($file);
	if(sizeof($db)>0)
	{
		foreach($db as $r)
		{
			$texta[$r->name]=$r->value;

		}
	}
	return $texta;
}


function parseM($mvalues)
{
    for ($i=0; $i < count($mvalues); $i++) {
        $mol[$mvalues[$i]["tag"]] = $mvalues[$i]["value"];
    }
    return new xml_db($mol);
}



function vnd_date($date)
{
	return @date('d-m-Y H:i:s',$date);
}


function vnd_date2($date)
{
	$last_day  =  mktime(0, 0, 0, date("m")  , date("d")-1, date("Y"));

	if($last_day<strtotime($date))
	{
		if(strlen($date)==10)
		{
			return substr($date,8,2).'/'.substr($date,5,2).'/'.substr($date,0,4) ;
		}
		return substr($date,-8,5).'  '. substr($date,8,2).'/'.substr($date,5,2).'/'.substr($date,0,4) ;

	}else
	{
		return substr($date,8,2).'/'.substr($date,5,2).'/'.substr($date,0,4) ;

	}
}


function remove_sign($str,$skip=NULL)
{
$str=strip_tags($str);
$coDau=array("_"," ","à","á","ạ","ả","ã","â","ầ","ấ","ậ","ẩ","ẫ","ă","ằ","ắ"
,"ặ","ẳ","ẵ","è","é","ẹ","ẻ","ẽ","ê","ề","ế","ệ","ể","ễ","ì","í","ị","ỉ","ĩ",
"ò","ó","ọ","ỏ","õ","ô","ồ","ố","ộ","ổ","ỗ","ơ"
,"ờ","ớ","ợ","ở","ỡ",
"ù","ú","ụ","ủ","ũ","ư","ừ","ứ","ự","ử","ữ",
"ỳ","ý","ỵ","ỷ","ỹ",
"đ",
"À","Á","Ạ","Ả","Ã","Â","Ầ","Ấ","Ậ","Ẩ","Ẫ","Ă"
,"Ằ","Ắ","Ặ","Ẳ","Ẵ",
"È","É","Ẹ","Ẻ","Ẽ","Ê","Ề","Ế","Ệ","Ể","Ễ",
"Ì","Í","Ị","Ỉ","Ĩ",
"Ò","Ó","Ọ","Ỏ","Õ","Ô","Ồ","Ố","Ộ","Ổ","Ỗ","Ơ"
,"Ờ","Ớ","Ợ","Ở","Ỡ",
"Ù","Ú","Ụ","Ủ","Ũ","Ư","Ừ","Ứ","Ự","Ử","Ữ",
"Ỳ","Ý","Ỵ","Ỷ","Ỹ",
"Đ","ê","ù","à");
$khongDau=array("-","-","a","a","a","a","a","a","a","a","a","a","a"
,"a","a","a","a","a","a",
"e","e","e","e","e","e","e","e","e","e","e",
"i","i","i","i","i",
"o","o","o","o","o","o","o","o","o","o","o","o"
,"o","o","o","o","o",
"u","u","u","u","u","u","u","u","u","u","u",
"y","y","y","y","y",
"d",
"A","A","A","A","A","A","A","A","A","A","A","A"
,"A","A","A","A","A",
"E","E","E","E","E","E","E","E","E","E","E",
"I","I","I","I","I",
"O","O","O","O","O","O","O","O","O","O","O","O"
,"O","O","O","O","O",
"U","U","U","U","U","U","U","U","U","U","U",
"Y","Y","Y","Y","Y",
"D","e","u","a");

	if(isset($skip))
	{
		foreach($skip as $s)
		{
			$key = array_search($s, $coDau);
			unset($coDau[$key],$khongDau[$key]);
		}
	}

	$str= str_replace($coDau,$khongDau,$str);
	$str=strtolower($str);
	$return= clear_file($str,'/-');
	$return=str_replace('-/-','/',$return);

	return $return;
}



function a($value)
{
	if($value=='')return '';
	return (int)$value;
}

function add_vnd_dot($value)
{
	if($value=='')return '';
	$value==(int)$value;
	$value= number_format($value,0,'','.');
	return $value;
}
function decode($data)
{
	return stripslashes($data);
}
function clear_file( $Raw,$skip=NULL ){
    $Raw = trim($Raw);
    $RemoveChars  = array( "([^a-zA-Z0-9_.".$skip."])" );
    $ReplaceWith = array("");
    return @preg_replace($RemoveChars, $ReplaceWith, $Raw);
}
function ValidateEmail($email){
    if(filter_var($email, FILTER_VALIDATE_EMAIL) == true){
        return true;
    }else{
        return false;
    }
}
function check_phone($phone){
	$pattern = "/^0([1-9]{1})([0-9]{8,9})/";
	return preg_match($pattern,$phone);
}


function sothanhchu($so)
{
$s[1]='A';
$s[2]='B';
$s[3]='C';
$s[4]='D';
$s[5]='E';
$s[6]='F';
$s[7]='G';
$s[8]='H';
$s[9]='I';
$s[10]='J';
$s[11]='K';
$s[12]='L';
return $s[$so];
}
function lastday($month = '', $year = '') {
   if (empty($month)) {
      $month = date('m');
   }
   if (empty($year)) {
      $year = date('Y');
   }
   $result = strtotime("{$year}-{$month}-01");
   $result = strtotime('-1 second', strtotime('+1 month', $result));
   return date('d', $result);
}
function firstDay($month = '', $year = '')
{
    if (empty($month)) {
      $month = date('m');
   }
   if (empty($year)) {
      $year = date('Y');
   }
   $result = strtotime("{$year}-{$month}-01");
   return date('Y-m-d', $result);
}


function conver_time($time){
  $date1 = $time;
  $date2 = time();

  $diff = abs($date2 - $date1);

  $years = floor($diff / (365*60*60*24));
  $months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));
  $days = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24) / (60*60*24));
  $hours = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24) / (60*60));
  $minutes = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24 - $hours*60*60) / 60);

  $array =  array('year'=>$years,'month'=>$months,'day'=>$days,'hours'=>$hours,'minute'=>$minutes);
  return $array;
}
function getBrowser($agent = null){
	$u_agent = ($agent!=null)? $agent : $_SERVER['HTTP_USER_AGENT'];
	$bname = 'Unknown';
	$platform = 'Unknown';
	$version= "";

	//First get the platform?
	if (preg_match('/linux/i', $u_agent)) {
		$platform = 'linux';
	}
	elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
		$platform = 'mac';
	}
	elseif (preg_match('/windows|win32/i', $u_agent)) {
		$platform = 'windows';
	}

	// Next get the name of the useragent yes seperately and for good reason
	if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent))
	{
		$bname = 'Internet Explorer';
		$ub = "MSIE";
	}
	elseif(preg_match('/Firefox/i',$u_agent))
	{
		$bname = 'Mozilla Firefox';
		$ub = "Firefox";
	}
	elseif(preg_match('/Chrome/i',$u_agent))
	{
		$bname = 'Google Chrome';
		$ub = "Chrome";
	}
	elseif(preg_match('/Safari/i',$u_agent))
	{
		$bname = 'Apple Safari';
		$ub = "Safari";
	}
	elseif(preg_match('/Opera/i',$u_agent))
	{
		$bname = 'Opera';
		$ub = "Opera";
	}
	elseif(preg_match('/Netscape/i',$u_agent))
	{
		$bname = 'Netscape';
		$ub = "Netscape";
	}

	// finally get the correct version number
	$known = array('Version', $ub, 'other');
	$pattern = '#(?<browser>' . join('|', $known) .
	')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
	if (!preg_match_all($pattern, $u_agent, $matches)) {
		// we have no matching number just continue
	}

	// see how many we have
	$i = count($matches['browser']);
	if ($i != 1) {
		//we will have two since we are not using 'other' argument yet
		//see if version is before or after the name
		if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
			$version= $matches['version'][0];
		}
		else {
			$version= $matches['version'][1];
		}
	}
	else {
		$version= $matches['version'][0];
	}

	// check if we have a number
	if ($version==null || $version=="") {$version="?";}

	return array(
		'userAgent' => $u_agent,
		'name'      => $bname,
		'version'   => $version,
		'platform'  => $platform,
		'pattern'    => $pattern
	);
}

function replaceMQ($str){
   $str = str_replace('>','&gt;',$str);
   $str = str_replace('<','&lt;',$str);
   return $str;
}
function generateRandomString($length = 10, $letters = '1234567890qwertyuiopasdfghjklzxcvbnm')
  {
      $s = '';
      $lettersLength = strlen($letters)-1;

      for($i = 0 ; $i < $length ; $i++)
      {
      $s .= $letters[rand(0,$lettersLength)];
      }

      return $s;
  }
function getValue($str,$case){
    $return = '';
    switch($case){
        case 0 : //Không thực hiện gì
            $return = $str;
        break;
        case 1 : //trả về kiểu số
            $return = (int)$str;
        break;
        case 2 : //trả về kiểu chuỗi xử lý không có tag html và xử lý các dấu " ' ' "
            $return = htmlentities(strip_tags($str));
        break;
        case 3 : //trả về kiểu chuỗi xử lý có tag html và xử lý các dấu " ' ' "
            $return = htmlentities($str);
        break;
        
    }
}
?>
