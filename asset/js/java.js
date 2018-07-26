//window.onscroll = Float
function encode(data)
{
	return encodeURIComponent(data);
}


function LoadXmlDoc(url,element_id)
{
element=element_id
xmlHttp=GetXmlHttpObject(stateChanged)
xmlHttp.open("GET", url , true)
xmlHttp.send(null)
}
function LoadXmlDocPost(url,data,element_id)
{
data=data+'&ndacheck=1';
element=element_id
xmlHttp=GetXmlHttpObject(stateChanged)
xmlHttp.open("POST", url , true)
xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
xmlHttp.send(data);
}

function stateChanged()
{
 
if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
{
try{document.getElementById(element).innerHTML=xmlHttp.responseXML.getElementsByTagName('data')[0].firstChild.data;
}catch(e)
{
}

try{
	eval(xmlHttp.responseXML.getElementsByTagName('java')[0].firstChild.data)
}
catch(e)
{
}

}
}


function GetXmlHttpObject(handler)
{
var objXmlHttp=null

if (navigator.userAgent.indexOf("Opera")>=0)
{
	objXmlHttp=new XMLHttpRequest()
	objXmlHttp.onload=handler
	objXmlHttp.onerror=handler
	return objXmlHttp
}
if (navigator.userAgent.indexOf("MSIE")>=0)
{
var strName="Msxml2.XMLHTTP"
if (navigator.appVersion.indexOf("MSIE 5.5")>=0)
{
strName="Microsoft.XMLHTTP"
}
try
{
objXmlHttp=new ActiveXObject(strName)
objXmlHttp.onreadystatechange=handler
return objXmlHttp
}
catch(e)
{
alert("Error. Scripting for ActiveX might be disabled")
return
}
}
if (navigator.userAgent.indexOf("Mozilla")>=0)
{
objXmlHttp=new XMLHttpRequest()
objXmlHttp.onload=handler
objXmlHttp.onerror=handler
return objXmlHttp
}
}


function create_get_element_array(array)
{
	var command="data='button="+array[0]+"';";
	var text_array='';
	var logic_array='';
	var select_one_array='';
	var textarea_array='';
	var frame_array='';
	var select_multiple='';
	var select_multiple_innerHTML='';
	var type;
	var i=0;
	for (a in array)
	{
		i++;
		if(i>1 & i<=array.length)
		{
			type=document.getElementById(array[a]).type;
			if(type=='text' || type=='hidden' || type=='password')
			{
				command=command+"data=data+'&"+array[a]+"='+encode(document.getElementById('"+array[a]+"').value);";
				text_array=text_array+' '+array[a];
			}
			if(type=='checkbox')
			{
				command=command+"data=data+'&"+array[a]+"='+logic_to_01(document.getElementById('"+array[a]+"').checked);";
				logic_array=logic_array+' '+array[a];
			}
			if(type=='textarea')
			{
				command=command+"data=data+'&"+array[a]+"='+encode(document.getElementById('"+array[a]+"').value);";
				textarea_array=textarea_array+' '+array[a];
			}
			if(!type)
			{
				command=command+"data=data+'&"+array[a]+"='+encode(document.getElementById('"+array[a]+"').contentWindow.document.body.innerHTML);";
				frame_array=frame_array+' '+array[a];
			}

			if(type=='select-one')
			{
				command=command+"data=data+'&"+array[a]+"='+document.getElementById('"+array[a]+"').value;";
				select_one_array=select_one_array+' '+array[a];
			}
			if(type=='select-multiple')
			{
				command=command+"data=data+'&"+array[a]+"='+encode(document.getElementById('"+array[a]+"').value);";
				select_multiple=select_multiple+' '+array[a];
				command=command+"data=data+'&"+array[a]+"innerHTML='+encode(document.getElementById('"+array[a]+"').innerHTML);";
				select_multiple_innerHTML=select_multiple_innerHTML+' '+array[a];
			}

		}

	}
	command=command+"data=data+'&text_array='+'"+text_array+"';";
	command=command+"data=data+'&logic_array='+'"+logic_array+"';";
	command=command+"data=data+'&select_one_array='+'"+select_one_array+"';";
	command=command+"data=data+'&textarea_array='+'"+textarea_array+"';";
	command=command+"data=data+'&frame_array='+'"+frame_array+"';";
	command=command+"data=data+'&select_multiple='+'"+select_multiple+"';";
	command=command+"data=data+'&select_multiple_innerHTML='+'"+select_multiple_innerHTML+"';";
	return command;

}


function logic_to_01(value)
{
	if(value==true)
	{
		return 1;
	}else
	{
		return 0;
	}
}


function submit_form(echo_id,button_id,xml_file,array)
{
	try{document.getElementById(button_id).disabled=true;}
	catch(e){}

	ele_array=array.split(",");

	new_ele_array=new Array();
	new_ele_array[0]=button_id;
	i=0;

	if(ele_array.length>0)
	{
		for (a in ele_array)
		{
			i++;
			if(i<ele_array.length+1)
			{
				new_ele_array[i]=ele_array[a];
			}
		}

	}else
	{
		data='';
	}
	eval(create_get_element_array(new_ele_array));
	LoadXmlDocPost(xml_file,data,echo_id);
}

function submit_form2(echo_id,button_id,xml_file,divbao)
{
	var arr = new Array();
	var elestring='';
	var elems = document.getElementById(divbao).getElementsByTagName("*");


	for(var i = 0; i < elems.length; i++)
	{
	  var elem = elems[i];
	  var id = elem.getAttribute("id");
	  var type = elem.type;

	  if(type=='text' || type=='hidden' || type=='password')elestring=elestring+','+id;
	  if(type=='select-one')elestring=elestring+','+id;
	  if(type=='textarea')elestring=elestring+','+id;
	  if(type=='checkbox')elestring=elestring+','+id;
	  if(type=='select-multiple')elestring=elestring+','+id;

	}
	elestring=elestring.substr(1)

	submit_form(echo_id,button_id,xml_file,elestring)
}



function submit_form3(echo_id,button_id,xml_file,divbao,post_data_array)
{
 	var formData = new FormData();
	var arr = new Array();
	var elestring='';
	var elems = document.getElementById(divbao).getElementsByTagName("*");
	for(var i = 0; i < elems.length; i++)
	{
	  var elem = elems[i];
	  var id = elem.getAttribute("id");
	  var type = elem.type;
	  if(type=='file')
	  {
		var ins=document.getElementById(id).files.length;
		
		for(var x=0;x<ins;x++)
		{
			formData.append(id+"[]", document.getElementById(id).files[x]);
		}

	
	  }
	  if(type=='text' || type=='hidden' || type=='password')formData.append(id,document.getElementById(id).value);
	  if(type=='select-one')formData.append(id,document.getElementById(id).value);
	  if(type=='textarea')formData.append(id,document.getElementById(id).value);
	  if(type=='checkbox')formData.append(id,logic_to_01(document.getElementById(id).checked));
	  if(type=='select-multiple')formData.append(id,document.getElementById(id).innerHTML);
	  
	}
	
	if(typeof  post_data_array!='undefined')
	{
		for ( property in post_data_array ) {
			formData.append(property,post_data_array[property]);
		}
	}

	var xhr = new XMLHttpRequest();
	xhr.open('POST',xml_file);
	xhr.onload = function () {
	if (xhr.status === 200) {
		try{document.getElementById(echo_id).innerHTML=xhr.responseXML.getElementsByTagName('data')[0].firstChild.data;
	}catch(e)
	{
	}
	
	try{
		eval(xhr.responseXML.getElementsByTagName('java')[0].firstChild.data)
	}
	catch(e)
	{	
	}
	
	console.log('all done: ' + xhr.status);
	} else {
		console.log('Something went terribly wrong...');
	}
	};
	
	xhr.send(formData);	  
	
}



function Float() {
	if(document.all) {
		document.all.common_echo.style.pixelTop=document.documentElement.scrollTop+0;
	}else
	{
		if(document.layers) {
			document.common_echo.top = window.pageYOffset;
		}
		if(document.getElementById) {
			document.getElementById('common_echo').style.top=window.pageYOffset+0 + 'px';
		}
	}
}

function showecho(ele,timeout,loi)
{
	document.getElementById(ele).style.display='none';
	setTimeout("document.getElementById('"+ele+"').style.display='block';",200)
	setTimeout("document.getElementById('"+ele+"').style.display='none';",timeout)
}
function add_dot(self)
{
	oldvalue=self.value;
	oldvalue=oldvalue.replace('.','');
	oldvalue=oldvalue.replace('.','');
	oldvalue=oldvalue.replace('.','');
	oldvalue=oldvalue.replace('.','');
	oldvalue=oldvalue.replace('.','');

	len=oldvalue.length;
	var returnvalue;
	var part1='';
	var part2='';
	var part3='';
	var part4='';

	if(len<=3){part1=oldvalue}
	if(len>3 & len<=6)
		{
			part1=oldvalue.substr(0,len-3);
			part2='.'+oldvalue.substr(len-3,3);
		}

	if(len>6 & len<=9)
		{
			part1=oldvalue.substr(0,len-6);
			part2='.'+oldvalue.substr(len-6,3);
			part3='.'+oldvalue.substr(len-3,3);
		}

	if(len>9 & len<=11)
		{
			part1=oldvalue.substr(0,len-9);
			part2='.'+oldvalue.substr(len-9,3);
			part3='.'+oldvalue.substr(len-6,3);
			part4='.'+oldvalue.substr(len-3,3);
		}

	if(len>11)
		{
			part1=''
		}
	returnvalue=part1+part2+part3+part4;

	self.value=returnvalue;
}




function login()
{
	submit_form2('thongbao_form_login','nut_dangnhap','/modules/thanhvien/login.php','form_login');
}


function dangky(gh = '')
{
	$('#loading-dangky').html('Đang xử lý ...<img src="/templates/images/loading-nt.gif" alt="loading" />');
	var email = $('#dangky_email').val();
	var re_email = $('#reemail').val();
	var pass = $('#dangky_pass').val();
	var repass = $('#repass').val();
	var phone = $('#dangky_dienthoai').val();
	var year = $('#dangky_namsinh').val();
    var tinhtp = $('#tinhtp').val();
    var quanhuyen = $('#quanhuyen').val();
	if(re_email != email){
		$('#thongbaoemail').html('<br>Vui lòng nhập lại email chính xác');
		$('#loading-dangky').html('');
		return false;
	}else{
		$('#thongbaoemail').html('');
	}
	if(repass != pass ){
		$('#thongbaopass').html('<br>Vui lòng nhập lại pass chính xác');
		$('#loading-dangky').html('');
		return false;
	}else{
		$('#thongbaopass').html('');
	}
	var paten = /^([0-9]{9,11})$/;
	var res = paten.test(phone);
	if(phone == ''){
		$('#thongbaophone').html('<br>Vui lòng cung cấp số điện thoại');
		$('#loading-dangky').html('');
		return false;
	}else{
		$('#thongbaophone').html('');
	}
	if(res == false){
		$('#thongbaophone').html('<br>Vui lòng cung cấp số điện thoại chính xác của bạn');
		$('#loading-dangky').html('');
		return false;
	}else{
		$('#thongbaophone').html('');
	}
	if(year == 0){
		$('#thongbaoyear').html('<br>Vui lòng cung cấp năm sinh');
		$('#loading-dangky').html('');
        return false;
	}else{
		$('#thongbaoyear').html('');
	}
    if(tinhtp == 0){
        $('#thongbaodc').html('Vui lòng cung cấp địa chỉ');
		$('#loading-dangky').html('');
        return false;
    }else{
        $('#thongbaodc').html('');
        
    }
    var gh2 = $('#gh').val();
	submit_form2('dangky_echo','nut_dangky','/modules/thanhvien/dangky_xml.php?gh='+gh2,'form_dangky');
}
function emailcheck(){
	var email = $('#dangky_email').val();
	var re_email = $('#reemail').val();
	if(re_email == email){
		$('#reemail').css('border','green 3px solid');
		$('#thongbaoemail').html('');
	}else{
		$('#reemail').css('border','red 3px solid');
		$('#thongbaoemail').html('<br>Vui lòng nhập lại email chính xác');

	}
}
function passcheck(){
	var pass = $('#dangky_pass').val();
	var repass = $('#repass').val();
	if(repass == pass){
		$('#repass').css('border','green 3px solid');
		$('#thongbaopass').html('');
	}else{
		$('#repass').css('border','red 3px solid');
		$('#thongbaopass').html('<br>Vui lòng nhập lại pass chính xác');
	}
}



function logout(gh)
{
	LoadXmlDoc('/modules/thanhvien/logout.php');
}


// Js thanh toán

	function validateForm()
	{
		var x=document.forms["myForm"]["pin"].value;
		var y=document.forms["myForm"]["serial"].value;
		var provider = document.forms["myForm"]["provider"].value;
		var k=document.forms["myForm"]["username"].value;
		if(provider == 'VTT'|| provider == 'FPT'|| provider == 'VTC'||provider == 'VNP'||provider == 'VMS')
		{

			if (x==null || x=='' || y==null || y=='')
			{
				document.getElementById('alert').innerHTML = 'Bạn phải nhập mã thẻ và số serial';
				return false;
			}else
			{
				document.getElementById('alert').innerHTML = '';
			}
		}
		else if (x==null || x=='' || x=='Ma the')
		{
			document.getElementById('alert').innerHTML = 'Bạn phải nhập mã thẻ';
			x.focus();
			return false;
		}
	}
function change(){
	var provider = document.forms["myForm"]["provider"].value;
	if(provider == 'VTT'|| provider == 'FPT'|| provider == 'VTC'|| provider == 'VNP'|| provider == 'VMS')
	{
		document.getElementById('seri').innerHTML="*";
	}else{
		document.getElementById('seri').innerHTML="";
	}
}


function setOptionText(ExSelect, theArray) {
	for (loop = 0; loop < ExSelect.options.length; loop++) {
		ExSelect.options[loop].text = theArray[loop];
	}
}

function gui_phanhoi(id)
{
    $('#nutphanhoi').button('loading');
    
	phanhoi=encode(document.getElementById('phanhoi').value);
    var gv = $('#idgv').val();
    var type = $('#idgv').data('type');
	if(phanhoi == "" || phanhoi == null){
		alert("Bạn phải nhập nội dung bình luận");
        $('#nutphanhoi').button('reset');
		return false;
	}
	data='phanhoi='+phanhoi+'&gv='+gv+'&type='+type;
	try{ph_id='phanhoi_moi_'+last_phanhoi_id}catch(e){ph_id='phanhoi_moi'}
 	LoadXmlDocPost('/modules/khoahoc/guiphanhoi.php?id='+id,data,ph_id)
}

function gui_traloi(id, makhoahoc)
{
    $('#button_traloi'+id).button('loading');
    var gv = $('#idgv').val();
    var type = $('#idgv').data('type');
	document.getElementById("btn-traloi_"+id).disabled=true;
	phanhoi=encode(document.getElementById('text'+id).value);
	if(phanhoi == "" || phanhoi == null){
		alert("Bạn phải nhập nội dung bình luận");
        $('#button_traloi'+id).button('reset');
		return false;
	}
	data='phanhoi='+phanhoi+'&gv='+gv+'&type='+type+'&makhoahoc='+makhoahoc;
	try{traloi_id='traloi_moiecho_'+last_traloi_id}catch(e){traloi_id='traloi_moi_'+id}
 	LoadXmlDocPost('/modules/khoahoc/guiphanhoi_traloi.php?id='+id,data,traloi_id)
}



function open_asset(folder,editor_name,type,class_name,select_content)
{
	if(!folder)folder='';
	if(!editor_name)editor_name='';
	if(!class_name)class_name='';
	var curent_file='';
	var curent_alt='';

	if(select_content!='')
	{
		var myArray = select_content.split('src="');
		if(myArray[1]!='')
		{
			myArray=myArray[1].split('"');
			curent_file=myArray[0];
		}
		var myaltArray = select_content.split('alt="');
		if(myaltArray[1]!='')
		{
			myaltArray=myaltArray[1].split('"');
			curent_alt=myaltArray[0];
		}
	}

	window.open('asset_manager.php?editor_name='+editor_name+'&type='+type+'&class='+class_name+'&curent_file='+curent_file+'&alt='+encodeURIComponent(curent_alt),'mywindow','width=800,height=675');
}


function insert_img(path,file,ele,class_name,option,alt)
{
	if(file=='')
	{
		alert('Bạn vui lòng chọn file ở khung bên phải');
	}else
	{
		if(class_name!='')
		{
			tinyMCE.get(ele).selection.setContent('<span class="'+class_name+'"><img '+option+' src="'+path+file+'" alt="'+alt+'"/></span>');
		}else
		{
			tinyMCE.get(ele).selection.setContent('<img '+option+'  src="'+path+file+'" alt="'+alt+'"/>');
		}
	}
}


function deleteCookie(cname){
	var x = cname +'=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
	document.cookie = x;
}
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
    var path = "path=/"
	document.cookie = cname + "=" + cvalue + "; " + expires + "; " + path;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie(cname) {
    var ck = getCookie(cname);
    if (ck != "") {
        return true;
    } else {
		return false;
    }
}
function doi_dap_an(id, stt, vitri,dapan,test)
{
	
	if(vitri == 'trai'){
		if(!$('#phai_'+stt).hasClass('scroll_active')){
			if($(".baybenphai").length > 0){
				var box_baybenphai = $(".baybenphai");
				var box_baybenphai_scroll = box_baybenphai.scrollTop();
				var top_box_baybenphai = box_baybenphai.offset().top;
				var elm = $('#phai_'+stt)
				var top_elm = elm.offset().top;
				box_baybenphai.scrollTop((top_elm - top_box_baybenphai) + box_baybenphai_scroll);
				elm.siblings('.bay_phai_row').removeClass('scroll_active');
				elm.addClass('scroll_active');
			}
			
		}
	}else if(vitri == 'phai'){
		var x_stt = (stt-1);
		if(x_stt == 0){
			x_stt = 1;
		}
		if(!$('#trai_'+stt).hasClass('scroll_active')){
			$('body').animate({
				scrollTop: $("#trai_"+x_stt).offset().top
			}, 200);

			$('#trai_'+stt).siblings('.traitest').removeClass('scroll_active');
			$('#trai_'+stt).addClass('scroll_active');
		}
	}


	var demA = 0;
	$('.dapan_A').each(function (index, value){
		if($(this).hasClass('dachon')){
			demA++;
		}
	});
	var demB = 0;
	$('.dapan_B').each(function (index, value){
		if($(this).hasClass('dachon')){
			demB++;
		}
	});
	var demC = 0;
	$('.dapan_C').each(function (index, value){
		if($(this).hasClass('dachon')){
		demC++;
		}
	});
	var demD = 0;
	$('.dapan_D').each(function (index, value){
		if($(this).hasClass('dachon')){
		demD++;
		}
	});
	var dangchondapan = '';
	if($('#phai_'+stt+' .dapan_phai').hasClass('dachon')){
		if($('#phai_'+stt+' .dachon').hasClass('dapan_A') ){
			dangchondapan = 'A';
		}
		if($('#phai_'+stt+' .dachon').hasClass('dapan_B') ){
			dangchondapan = 'B';
		}
		if($('#phai_'+stt+' .dachon').hasClass('dapan_C') ){
			dangchondapan = 'C';
		}
		if($('#phai_'+stt+' .dachon').hasClass('dapan_D') ){
			dangchondapan = 'D';
		}
	}

	if(dapan == 'A' && dangchondapan != 'A' ){
		demA = demA + 1;
	}else if(dangchondapan == 'A'){
		demA = demA -1;
	}
	if(dapan == 'B' && dangchondapan != 'B'){
		demB = demB + 1;
	}else if(dangchondapan == 'B'){
		demB = demB -1;
	}
	if(dapan == 'C' && dangchondapan != 'C'){
		demC = demC + 1;
	}else if(dangchondapan == 'C'){
		demC = demC -1;
	}

	if(dapan == 'D' && dangchondapan != 'D'){
		demD = demD + 1;
	}else if(dangchondapan == 'D'){
		demD = demD -1;
	}

	$('#thongkedapanA').html(demA);
	$('#thongkedapanB').html(demB);
	$('#thongkedapanC').html(demC);
	$('#thongkedapanD').html(demD);
	try{
		LoadXmlDoc('/modules/test/chon.php?id='+id+'&test='+test+'&vitri='+stt,'');	
	}catch(e){
		
	}
	
}
function timcauchualam(){
    $('.bay_phai_row').each(function (index, value){
		if($(this).children('span.dapan_phai').hasClass('dachon') == false){
		  var x = $(this).attr('id');
          if(!$('#'+x).hasClass('scroll_active')){
			var box_baybenphai = $(".baybenphai");
			var box_baybenphai_scroll = box_baybenphai.scrollTop();
			var top_box_baybenphai = box_baybenphai.offset().top;
			var elm = $('#'+x)
			var top_elm = elm.offset().top;
			box_baybenphai.scrollTop((top_elm - top_box_baybenphai) + box_baybenphai_scroll);
			elm.siblings('.bay_phai_row').removeClass('scroll_active');
			elm.addClass('scroll_active');
		  }

          var l = x.replace('phai','trai');
          var vitri = parseInt(x.replace('phai_',''));
          var x_stt = (vitri-1);
    		if(x_stt == 0){
    			x_stt = 1;
    		}
          if(!$('#'+l).hasClass('scroll_active')){
			$('body').animate({
				scrollTop: $("#trai_"+x_stt).offset().top
			}, 200);
			$('#'+l).siblings('.traitest').removeClass('scroll_active');
			$('#'+l).addClass('scroll_active');
		  }
          return false;
		}
	});
}
function nopbai(id)
{
    $('.btn-nopbai').addClass('hidden');
    $('.dangxuly').html('Đang nộp bài ... <br><img src="/templates/images/ajax-loader.gif" alt="loading" />');    
    var kq = true;
    $('.bay_phai_row').each(function (index, value){

          if($(this).children('span').hasClass('dapan_phai') == true){
    		  if($(this).children('span.dapan_phai').hasClass('dachon') == false){
    		  var x = $(this).attr('id');
              if(!$('#'+x).hasClass('scroll_active')){
    			var box_baybenphai = $(".baybenphai");
    			var box_baybenphai_scroll = box_baybenphai.scrollTop();
    			var top_box_baybenphai = box_baybenphai.offset().top;
    			var elm = $('#'+x)
    			var top_elm = elm.offset().top;
    			box_baybenphai.scrollTop((top_elm - top_box_baybenphai) + box_baybenphai_scroll);
    			elm.siblings('.bay_phai_row').removeClass('scroll_active');
    			elm.addClass('scroll_active');
    		  }

              var l = x.replace('phai','trai');
              var vitri = parseInt(x.replace('phai_',''));
              var x_stt = (vitri-1);
        		if(x_stt == 0){
        			x_stt = 1;
        		}
              if(!$('#'+l).hasClass('scroll_active')){
    			$('body').animate({
    				scrollTop: $("#trai_"+x_stt).offset().top
    			}, 200);
    			$('#'+l).siblings('.traitest').removeClass('scroll_active');
    			$('#'+l).addClass('scroll_active');
    		  }
              kq = false;
              return false;
    		  }else{
		          kq = true;
    		  }
        }else if($(this).children('input').hasClass('dapan_text_phai') == true){

            if($(this).children('input.dapan_text_phai').val() == ''){
                kq = false;
                return false;
            }else{
                return true;
            }
		}
	});
    if(kq == true){
        deleteCookie(id);
        LoadXmlDoc('/modules/test/nopbai.php?id='+id,'nopbai_echo');
    }else{
        $('.btn-nopbai').removeClass('hidden');
        $('.dangxuly').html('');
        $('#thongbaotest').html("Vui lòng làm hết  câu hỏi trước khi nộp bài");
        $('#thongbaotest').show(200);
        setTimeout(function(){ $('#thongbaotest').hide(200); }, 2000);
    }

}

function nopbaitungcau(id)
{   
    $('#button_next').button('loading');
    $('.owl-stage .owl-item input').each(function(index,value){
        v = $(this).val();
        if(v == '' || v == null){
            $('#button_next').button('reset');
            $('#thongbaotest').html("Vui lòng làm hết  câu hỏi trước khi nộp bài");
            $('#thongbaotest').show(200);
            setTimeout(function(){ $('#thongbaotest').hide(200); }, 2000);
            return false;
        }
    });
    $('.owl-stage .owl-item p.box_dap_ans').each(function(index,value){
    	x = $(this).children('.question_select').length;
    	if(x > 0){
    		dem = 0;
    		$('.owl-stage .owl-item p.box_dap_ans .question_select').each(function(){
    			if($(this).children('i').hasClass('pick_ans')){
    				dem++;
                }
    		});
    		if(dem == 0){
    			$('#button_next').button('reset');
                $('#thongbaotest').html("Vui lòng làm hết  câu hỏi trước khi nộp bài");
                $('#thongbaotest').show(200);
                setTimeout(function(){ $('#thongbaotest').hide(200); }, 2000);
                return false;
            }
        }
    });
    
    LoadXmlDoc('/modules/test/nopbai.php?id='+id,'nopbai_echo');
}
function nopbaituluyen(id)
{
    $('.btn-nopbai').addClass('hidden');
    $('.dangxuly').html('Đang nộp bài ... <br><img src="/templates/images/ajax-loader.gif" alt="loading" />');
    var kq = true;
    $('.bay_phai_row').each(function (index, value){

          if($(this).children('span').hasClass('dapan_phai') == true){
    		  if($(this).children('span.dapan_phai').hasClass('dachon') == false){
    		  var x = $(this).attr('id');
              if(!$('#'+x).hasClass('scroll_active')){
    			var box_baybenphai = $(".baybenphai");
    			var box_baybenphai_scroll = box_baybenphai.scrollTop();
    			var top_box_baybenphai = box_baybenphai.offset().top;
    			var elm = $('#'+x)
    			var top_elm = elm.offset().top;
    			box_baybenphai.scrollTop((top_elm - top_box_baybenphai) + box_baybenphai_scroll);
    			elm.siblings('.bay_phai_row').removeClass('scroll_active');
    			elm.addClass('scroll_active');
    		  }

              var l = x.replace('phai','trai');
              var vitri = parseInt(x.replace('phai_',''));
              var x_stt = (vitri-1);
        		if(x_stt == 0){
        			x_stt = 1;
        		}
              if(!$('#'+l).hasClass('scroll_active')){
    			$('body').animate({
    				scrollTop: $("#trai_"+x_stt).offset().top
    			}, 200);
    			$('#'+l).siblings('.traitest').removeClass('scroll_active');
    			$('#'+l).addClass('scroll_active');
    		  }
              kq = false;
              return false;
    		  }else{
		          kq = true;
    		  }
        }else if($(this).children('input').hasClass('dapan_text_phai') == true){

            if($(this).children('input.dapan_text_phai').val() == ''){
                kq = false;
                return false;
            }else{
                return true;
            }
		}
	});
    if(kq == true){
        idtest = parseInt($('#idtest').html());
        Cookies.remove('-1');
        LoadXmlDoc('/modules/test/nopbaituluyen.php?id='+id,'nopbai_echo');
    }else{
        $('.dangxuly').html('');
        $('.btn-nopbai').removeClass('hidden');
        alert('Vui lòng làm hết câu hỏi trước khi nộp bài');
    }

}

function nopbai_luyenchuyende(id)
{
    $('.btn-nopbai').addClass('hidden');
    $('.dangxuly').html('Đang nộp bài ... <br><img src="/templates/images/ajax-loader.gif" alt="loading" />');
    var kq = true;
    $('.bay_phai_row').each(function (index, value){

          if($(this).children('span').hasClass('dapan_phai') == true){
    		  if($(this).children('span.dapan_phai').hasClass('dachon') == false){
    		  var x = $(this).attr('id');
              if(!$('#'+x).hasClass('scroll_active')){
    			var box_baybenphai = $(".baybenphai");
    			var box_baybenphai_scroll = box_baybenphai.scrollTop();
    			var top_box_baybenphai = box_baybenphai.offset().top;
    			var elm = $('#'+x)
    			var top_elm = elm.offset().top;
    			box_baybenphai.scrollTop((top_elm - top_box_baybenphai) + box_baybenphai_scroll);
    			elm.siblings('.bay_phai_row').removeClass('scroll_active');
    			elm.addClass('scroll_active');
    		  }

              var l = x.replace('phai','trai');
              var vitri = parseInt(x.replace('phai_',''));
              var x_stt = (vitri-1);
        		if(x_stt == 0){
        			x_stt = 1;
        		}
              if(!$('#'+l).hasClass('scroll_active')){
    			$('body').animate({
    				scrollTop: $("#trai_"+x_stt).offset().top
    			}, 200);
    			$('#'+l).siblings('.traitest').removeClass('scroll_active');
    			$('#'+l).addClass('scroll_active');
    		  }
              kq = false;
              return false;
    		  }else{
		          kq = true;
    		  }
        }else if($(this).children('input').hasClass('dapan_text_phai') == true){

            if($(this).children('input.dapan_text_phai').val() == ''){
                kq = false;
                return false;
            }else{
                return true;
            }
		}
	});
    if(kq == true){
        ///Cookies.remove(id);
        LoadXmlDoc('/modules/test/nopbai_luyenchuyende.php?id='+id,'nopbai_echo');
    }else{
        $('.dangxuly').html('');
        $('.btn-nopbai').removeClass('hidden');
        alert('Vui lòng làm hết câu hỏi trước khi nộp bài');
    }

}

function lamlai(id)
{
    deleteCookie(id);
    deleteCookie('tid_'+id);
	LoadXmlDoc('/modules/test/lamlai.php?id='+id,'nopbai_echo')
}
function lamlailuyentap(lop, mon)
{
	LoadXmlDoc('/modules/test/lamlailuyentap.php?lop='+lop+'&mon='+mon,'nopbai_echo')
}
function lamlaichuyende(id)
{
	LoadXmlDoc('/modules/test/lamlaichuyende.php?id='+id,'nopbai_echo');
}
function login_gg(){
	LoadXmlDoc('/modules/thanhvien/login_gg.php');

}
function PopupVideoNoDownload(url) {
                                VideoNoDownload = window.open(
                                    url, 'popupVideoNoDownload', 'height=768,width=1366,left=10,top=10,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no')
                            }


function setup_phanhoi(id,makhoahoc){
	$('#btn-traloi_'+id).css('display' ,'none');
	var id_text = 'text'+id;
	$('#'+id).html("<textarea name=\"phanhoi_"+id+"\" onclick='' id='text"+id+"' class='textarea_custom form-control'></textarea> <input value=\"Trả lời\" class='btn-phanhoi' id=\"button_traloi"+id+"\"  type=\"button\" onclick=\"gui_traloi("+id+","+makhoahoc+")\" />");
}

function login_thongke(gh)
{
	submit_form2('thongbao_form_login','dangnhap','/modules/thongke/dangnhapthongke.php','form_login');
}
function xemthongke(id , user){
	if($('#batdau').val() == null || $('#batdau').val() == '' ){
		alert('Vui lòng chọn ngày');
		$('#batdau').focus();
		return false;
	}else{
		var start = $('#batdau').val();
	}
	if($('#ketthuc').val() == null || $('#ketthuc').val() == '' ){
		alert('Vui lòng chọn ngày');
		$('#ketthuc').focus();
		return false;
	}else{
		var end = $('#ketthuc').val();
	}
	if($('#ketthuc').val() != '' && $('#batdau').val() != ''){
	LoadXmlDoc('/modules/thongke/chitiet_xml.php?user='+user+'&id='+id+'&start='+start+'&stop='+end , 'result');

	}
}
function xemthongke_ds(id , user){
	if($('#batdau').val() == null || $('#batdau').val() == '' ){
		alert('Vui lòng chọn ngày');
		$('#batdau').focus();
		return false;
	}else{
		var start = $('#batdau').val();
	}
	if($('#ketthuc').val() == null || $('#ketthuc').val() == '' ){
		alert('Vui lòng chọn ngày');
		$('#ketthuc').focus();
		return false;
	}else{
		var end = $('#ketthuc').val();
	}
	if($('#ketthuc').val() != '' && $('#batdau').val() != ''){
	LoadXmlDoc('/modules/thanhvien/trangcanhan/chitiet_xml.php?user='+user+'&id='+id+'&start='+start+'&stop='+end , 'result');

	}
}
function napthedienthoai(){
	$('#button-napthe').attr('disabled','disabled');
	$('#alert').html('Đang xử lý ... Vui lòng chờ trong giây lát <br> <img src="/templates/images/loading-nt.gif" alt="loading" />');
	var mathe = $('#code_card').val();
	var serial = $('#serial').val();
	var provider = $('#provide').val();
	var charge1 = $('#charge1').val();
	var user = $('#user_hidden').val();
	if(user == 0 || user == '' || user == null){
		$('#button-napthe').removeAttr('disabled');
		alert('Bạn cần phải đăng nhập để nạp thẻ ');
		return false;
	}
	if(mathe == '' || mathe == 0 || mathe == null){
		$('#button-napthe').removeAttr('disabled');
		$('#alert').html("Vui lòng nhập mã thẻ");
		$('#code_card').focus();
		return false;
	}
	if(serial == '' || serial == 0 || serial == null){
		$('#button-napthe').removeAttr('disabled');
		$('#alert').html("Vui lòng nhập số serial");
		$('#serial').focus();
		return false;
	}
	data = 'mathe='+mathe+'&serial='+serial+'&provider='+provider+'&charge1='+charge1+'&utarget='+user;
	//LoadXmlDocPost('/modules/info/result.php',data,'alert');
	LoadXmlDocPost('/modules/napthe/napthe_1pay_xml.php',data,'alert');

}
function napthedienthoai2(){
	$('#button-napthe2').attr('disabled','disabled');
	$('#alert2').html('Đang xử lý ... Vui lòng chờ trong giây lát <br> <img src="/templates/images/loading-nt.gif" alt="loading" />');
	var mathe = $('#code_card2').val();
	var serial = $('#serial2').val();
	var provider = $('#provide2').val();
	var charge1 = $('#charge12').val();
	var user = $('#user_hidden').val();
	if(user == 0 || user == '' || user == null){
		$('#button-napthe2').removeAttr('disabled');
		alert('Bạn cần phải đăng nhập để nạp thẻ ');
		return false;
	}
	if(mathe == '' || mathe == 0 || mathe == null){
		$('#button-napthe2').removeAttr('disabled');
		$('#alert2').html("Vui lòng nhập mã thẻ");
		$('#code_card2').focus();
		return false;
	}
	if(serial == '' || serial == 0 || serial == null){
		$('#button-napthe2').removeAttr('disabled');
		$('#alert2').html("Vui lòng nhập số serial");
		$('#serial2').focus();
		return false;
	}
	data = 'mathe='+mathe+'&serial='+serial+'&provider='+provider+'&charge1='+charge1+'&utarget='+user;
	LoadXmlDocPost('/modules/info/result.php',data,'alert2');

}
function start()
{
	idtest = parseInt($('#idtest').html());
	if (h == null)
	{
		h = parseInt($('#hour').html());
		m = parseInt($('#minute').html());
		s = parseInt($('#second').html());
	}
	var myAry = [m,s];
		setCookie(idtest, JSON.stringify(myAry) , 3);

	if(s === -1){
		m -= 1;
		s = 59;
	}
	if (m === -1){
		clearTimeout(timeout);
		$('.btn-nopbai').click(LoadXmlDoc('/modules/test/nopbai.php?id='+idtest+'&timeout=1','nopbai_echo'));
		deleteCookie(idtest);
		return false;
	}

	if(s < 10){
		s = '0'+s;
	}
	$('#minute').html( m) ;
	$('#second').html(s);
    $('#minute2').html( m) ;
	$('#second2').html(s);
	timeout = setTimeout(function(){
		s--;
		start();
	}, 1000);
}
function show_decuong(id){
    var elm = $('#'+id);
    if(elm.hasClass('active')){
        elm.removeClass('active');
        elm.siblings('div').removeClass('active');
    }else{
        elm.addClass('active');
        elm.siblings('div').removeClass('active');
    }

}
function thaydoithongtincanhan(){
    var password = $('#password').val();
    var re_password = $('#password_retype').val();
    var name = $('#name').val();
    var dienthoai = $('#dienthoai').val();
    var lienhe = $('#diachi').val();
    var email_phuhuynh = $('#email_phuhuynh').val();
    var mk_cu = $('#old_password').val();
    var tinhtp = $('#tinhtp').val();
    var quanhuyen = $('#quanhuyen').val();
    var namsinh = $('#namsinh').val();
    if(namsinh > 2017 || namsinh < 2000){
        $('#thongbao2').html('Vui lòng nhập năm sinh hợp lệ. Từ 2000 đến 2017');
        return false;
    }
    if(tinhtp == 0 || quanhuyen == 0){
        $('#thongbao2').html('Vui lòng chọn địa chỉ Tỉnh Thành Phố / Quận Huyện');
        return false;
    }
    if(re_password != password){
        $('#thongbao2').html('Mật khẩu nhập lại không khớp với mật khẩu');
        return false;
    }
    var data = 'name='+name+'&dienthoai='+dienthoai+'&lienhe='+lienhe+'&password='+password+'&email_phuhuynh='+email_phuhuynh+'&mk_cu='+mk_cu+'&tinhtp='+tinhtp+'&quanhuyen='+quanhuyen+'&namsinh='+namsinh;
    LoadXmlDocPost('/modules/thanhvien/trangcanhan_sua.php',data,'thongbao2');
}
function capnhatthongtin(){
    var password = $('#password').val();
    var re_password = $('#password_retype').val();
    var name = $('#name').val();
    var dienthoai = $('#dienthoai').val();
    var lienhe = $('#diachi').val();
    var email_phuhuynh = $('#email_phuhuynh').val();
    var mk_cu = $('#old_password').val();
    var tinhtp = $('#tinhtp').val();
    var quanhuyen = $('#quanhuyen').val();
    var namsinh = $('#namsinh').val();
    if(namsinh > 2017 || namsinh < 2000){
        $('#thongbao2').html('Vui lòng nhập năm sinh hợp lệ. Từ 2000 đến 2017');
        return false;
    }
    if(tinhtp == 0 || quanhuyen == 0){
        $('#thongbao2').html('Vui lòng chọn địa chỉ Tỉnh Thành Phố / Quận Huyện');
        return false;
    }
    if(re_password != password){
        $('#thongbao2').html('Mật khẩu nhập lại không khớp với mật khẩu');
        return false;
    }
    var data = 'name='+name+'&dienthoai='+dienthoai+'&lienhe='+lienhe+'&password='+password+'&email_phuhuynh='+email_phuhuynh+'&mk_cu='+mk_cu+'&tinhtp='+tinhtp+'&quanhuyen='+quanhuyen+'&namsinh='+namsinh;
    LoadXmlDocPost('/modules/thanhvien/form_capnhatthongtin_xml.php',data,'thongbao2');
}
function capnhatthongtin2(){
    var password = $('#password').val();
    var re_password = $('#password_retype').val();
    var name = $('#name').val();
    var dienthoai = $('#dienthoai').val();
    var lienhe = $('#diachi').val();
    var email_phuhuynh = $('#email_phuhuynh').val();
    var tinhtp = $('#tinhtp').val();
    var email = $('#email').val();
    var quanhuyen = $('#quanhuyen').val();
    var namsinh = $('#namsinh').val();
    if(email.length == ''){
        $('#thongbao2').html('Vui lòng nhập Email đăng nhập');
        return false;
    }
    if(namsinh > 2017 || namsinh < 2000){
        $('#thongbao2').html('Vui lòng nhập năm sinh hợp lệ. Từ 2000 đến 2017');
        return false;
    }
    if(tinhtp == 0 || quanhuyen == 0){
        $('#thongbao2').html('Vui lòng chọn địa chỉ Tỉnh Thành Phố / Quận Huyện');
        return false;
    }
    if(re_password != password){
        $('#thongbao2').html('Mật khẩu nhập lại không khớp với mật khẩu');
        return false;
    }
    var data = 'name='+name+'&dienthoai='+dienthoai+'&lienhe='+lienhe+'&password='+password+'&email_phuhuynh='+email_phuhuynh+'&tinhtp='+tinhtp+'&quanhuyen='+quanhuyen+'&namsinh='+namsinh+'&email='+email;
    LoadXmlDocPost('/modules/thanhvien/form_capnhatthongtin_xml.php',data,'thongbao2');
}
function updateinfo(tv){
	$("#button_updateinfo").attr('disabled','disabled');
	$('#thongbaoxuly').html('Đang xử lý ... <img src="/templates/images/loading-nt.gif" alt="loading" />');
	var dienthoai_ck = $('#dienthoai_update').length;
	var email_ck = $('#email_update').length;
	var emaiPH_ck = $('#emailph_update').length;
	var namsinh_ck = $('#namsinh_update').length;
    var diachi_ck = $('#diachi_update').length;
    var tinhtp_ck = $('#tinhtp2').length;
    var quanhuyen_ck = $('#quanhuyen2').length;
    
	var email = ''; var namsinh = ''; var dienthoai = ''; var diachi = ''; var emailPH;var quanhuyen;var tinhtp;var capnhatdc;
    
	if(email_ck == 1){
			email = $('#email_update').val();
            if(email == '' || email == null){
             $('#thongbaoxuly').html('Vui lòng cung cấp email tài khoản.');
             $('#email_update').focus();
             $("#button_updateinfo").removeAttr('disabled');
			 return false;
            }
	}else{
	   email = $('#email_update').val();
	}if(diachi_ck == 1){
			diachi = $('#diachi_update').val();
            if(diachi == '' || diachi == null){
             $('#thongbaoxuly').html('Vui lòng cung cấp địa chỉ của bạn.');
             $('#diachi_update').focus();
             $("#button_updateinfo").removeAttr('disabled');
			 return false;
            }
	}else{
	   diachi = "";
	}if(emaiPH_ck == 1){
        emailPH = $('#emailph_update').val();
        if(emailPH == '' || emailPH == null){
             $('#thongbaoxuly').html('Vui lòng nhập email để nhận thông tin kết quả học tập.');
             $('#emailph_update').focus();
             $("#button_updateinfo").removeAttr('disabled');
			 return false;
        }
    }else{
        emailPH = "";
    }
	if(namsinh_ck == 1){
		namsinh = $('#namsinh_update').val();
		var patenns =/^([1-9]){1}([0-9]{3,})/;
		var kq = patenns.test(namsinh);
        if(namsinh == ""){
            $('#thongbaoxuly').html('Vui lòng nhập vào năm sinh của bạn');
            $('#namsinh_update').focus();
			$("#button_updateinfo").removeAttr('disabled');
			return false;
        }else if(kq == false){
			$('#thongbaoxuly').html('Năm sinh không đúng');
			$("#button_updateinfo").removeAttr('disabled');
			return false;
		}else{
			$('#thongbaoxuly').html('');
		}
	}else{
	   namsinh = "";
	}
	if(dienthoai_ck == 1){
		var dienthoai = $('#dienthoai_update').val();
		var paten = /^0([1-9]{1})([0-9]{8,9})/;
		var res = paten.test(dienthoai);
        if(dienthoai == ""){
            $('#thongbaoxuly').html('Vui lòng nhập vào số điện thoại');
            $('#dienthoai_update').focus();
            $("#button_updateinfo").removeAttr('disabled');
			return false;
        }else if(res === false){
			$('#thongbaoxuly').html('Số điện thoại không đúng');
			$("#button_updateinfo").removeAttr('disabled');
			return false;
		}else{
			$('#thongbaoxuly').html('');
		}
	}else{
	   dienthoai = "";
	}
    if(tinhtp_ck == 1 || quanhuyen_ck == 1){
        var tinhtp = $('#tinhtp2').val();
        var quanhuyen = $('#quanhuyen2').val();
        var capnhatdc = 1;
        if(tinhtp == 0 || quanhuyen == 0){
            $('#thongbaoxuly').html('Vui lòng chọn Tỉnh Thành Phố Quận Huyện');
			$("#button_updateinfo").removeAttr('disabled');
            return false;
        }
    }else{
        tinhtp = '';
        quanhuyen = '';
        capnhatdc = 0;
    }

	var data = 'id='+tv+'&email='+email+'&namsinh='+namsinh+'&dienthoai='+dienthoai+'&emaiPH='+emailPH+'&diachi='+diachi+'&tinhtp='+tinhtp+'&quanhuyen='+quanhuyen+'&capnhatdc='+capnhatdc;
	LoadXmlDocPost('/modules/thanhvien/boxungthongtin.php',data,'thongbaoxuly');
}
function dangkythongtin(type){
	$("#submit").attr('disabled','disabled');
	var hoten = $('#hoten').val();
	var lop = $('input[name=lop]:checked').val();
	var phone = $('#phone').val();
	var email = $('#emailtk').val();
	if(hoten == ''){
		$('#thongbaoten').html('Vui lòng điền vào họ và tên');
		$('#hoten').focus();
		$("#submit").removeAttr('disabled');
		return false;
	}else{
		$('#thongbaoten').html('');
	}
	if(lop == '' || lop == null){
		$('#thongbaolop').html('Vui lòng chọn lớp');
		$("#submit").removeAttr('disabled');
		return false;
	}else{
		$('#thongbaolop').html('');
	}
	if(phone == ''){
		$('#thongbaodt').html('Vui lòng điền vào số điện thoại phụ huynh');
		$("#submit").removeAttr('disabled');
		$('#phone').focus();
		return false;
	}else{
		$('#thongbaodt').html('');
	}
	var paten = /^0([1-9]{1})([0-9]{8,9})/;
	var res = paten.test(phone);
	if(res === false){
		$('#thongbaodt').html('Vui lòng điền vào số điện thoại chính xác');
		$("#submit").removeAttr('disabled');
		$('#phone').focus();
		return false;
	}else{
		$('#thongbaodt').html('');
	}
	if(email == ''){
		$('#thongbaoemail').html('Vui lòng điền vào email');
		$("#submit").removeAttr('disabled');
		$('#emailtk').focus();
		return false;
	}else{
		$('#thongbaoemail').html('');
	}
	var data = 'ten='+hoten+'&lop='+lop+'&phone='+phone+'&email='+email+'&type='+type;
	LoadXmlDocPost('/modules/formdangky/xulyform_xml.php',data,'thongbaoketqua');
}
function show_box_search(){
	if( $('#search_button').hasClass('open_box')){
		$('.box_search').fadeOut(500,'swing');
		$('#search_button').removeClass('open_box');
		$('#search_button').addClass('close_box');
	}else if($('#search_button').hasClass('close_box')){
		$('.box_search').fadeIn(500,'swing');
		$('#search_button').removeClass('close_box');
		$('#search_button').addClass('open_box');
	}
}
function baoloidapan(id,test){
    LoadXmlDoc('/modules/test/baoloi_xml.php?test='+test+'&id='+id);
}
function daxemthongbao(id){
    data = 'id='+id;
    LoadXmlDocPost('/modules/phanhoi/daxemthongbao_xml.php',data);
}
function passwordRecovery(){
    var mail = $('#emailPasswordRecovery').val();
    if(mail == '' || mail == null){
        $('#baoloi').html("Vui lòng nhập vào email");
        $('#emailPasswordRecovery').focus();
        return false;
    }else{
        data = 'email='+mail;
        LoadXmlDocPost('/modules/thanhvien/khoiphucmaukhau_xml.php',data,'baoloi');
    }
}
function UpdateRequestPass(){
    pass = $('#pass').val();
    repass = $('#repass').val();
    thanhvien = $('#thanhvien').val();
    maxacnhan = $('#maxacnhan').val();
    if(repass != pass){
        $('#thongbaoketqua').html("Phần nhập lại mật khẩu của bạn bị sai. Vui lòng nhập lại");
        return false;
    }
    data = 'thanhvien='+thanhvien+'&pass='+pass+'&maxacnhan='+maxacnhan;
    LoadXmlDocPost('/modules/thanhvien/capnhatmatkhaukhoiphuc_xml.php',data,'thongbaoketqua');
}
function themmagiamgia(){
    magiamgia = $('#magiamgia').val();
    data = 'magiamgia='+magiamgia;
    LoadXmlDocPost('/modules/muakhoahoc/magiamgia_xml.php',data);
}
function chonlop(){
    lop = $('#chonlop').val();
    LoadXmlDoc('/modules/trangchu/chonlop_xml.php?id='+lop,'chonmon');
}
function chonmon(){
    var lop = $('#chonlop').val();
    var str = '<i class="fa fa-exclamation-circle  faa-flash animated" aria-hidden="true"></i> ';
    if(lop == 0){
       $('#alert2').html(str+' Bạn phải chọn trước 1 lớp'); return false;
    }else{
        $('#alert2').html('');
    }
    var mon = $('#chonmon').val();
    LoadXmlDoc('/modules/trangchu/chonmon_xml.php?id='+mon,'multi-select');

}
function noidungtuluyen(){

    var str = '<i class="fa fa-exclamation-circle  faa-flash animated" aria-hidden="true"></i> ';
    mon = $('#chonmon').val();
    lop = $('#chonlop').val();
    if(lop == 0){
       $('#alert2').html(str+' Bạn phải chọn trước 1 lớp'); return false;
    }else{
        $('#alert2').html('');
    }
    if(mon == 0 || mon == null){
        $('#alert2').html(str+' Bạn phải chọn trước 1 môn'); return false;
    }else{
         $('#alert2').html('');
    }
    $('.multi-select').toggle();
}
function luyentap(){
    var lop = $('#chonlop').val();
    var mon = $('#chonmon').val();
    var thoigian = $('#thoigian').val();
    var dokho = $('input[name=dokho]:checked').val();
    var socaukho = $('#num_hard').val();
    var socauvua = $('#num_medium').val();
    var socaude = $('#num_easy').val();
    var noidungthi = $('#setcd').val();
    str = '<i class="fa fa-exclamation-circle  faa-flash animated" aria-hidden="true"></i> ';
    if(lop == 0){
        $('#alert2').html(str+' Bạn phải chọn lớp');
        $('#chonlop').css('border','#e5332a thin solid');
        return false;
    }else{
        $('#chonlop').css('border-color','rgb(169, 169, 169)');
    }
    if(mon == 0 || mon == null){
        $('#alert2').html(str+' Bạn phải chọn môn');
        $('#chonmon').css('border','#e5332a thin solid');
        return false;
    }else{
        $('#chonmon').css('border-color','rgb(169, 169, 169)');
    }
    if(noidungthi == 0){
        $('#alert2').html(str+' Bạn phải chọn 1 nội dung thi');
        $('#box_multi_select').css('border','#e5332a thin solid');
        return false;
    }else{
        $('#box_multi_select').css('border-color','rgb(169, 169, 169)');
    }
    if(socaukho == ""){
        $('#alert2').html(str+' Vui lòng nhập số câu hỏi khó');
        $('#num_hard').css('border','#e5332a thin solid');
        return false;
    }else{
        $('#num_hard').css('border-color','rgb(169, 169, 169)');
    }
    if(socauvua == ""){
        $('#alert2').html(str+' Vui lòng nhập số câu hỏi trung bình');
        $('#num_medium').css('border','#e5332a thin solid');
        return false;
    }else{
        $('#num_medium').css('border-color','rgb(169, 169, 169)');
    }
    if(socaude == ""){
        $('#alert2').html(str+' Vui lòng nhập số câu hỏi dễ');
        $('#num_easy').css('border','#e5332a thin solid');
        return false;
    }else{
        $('#num_easy').css('border-color','rgb(169, 169, 169)');
    }
    $('#alert2').html('');
    location.href='/index.php?f=tapluyen&lop='+lop+'&mon='+mon+'&time='+thoigian+'&lever='+dokho+'&numH='+socaukho+'&numM='+socauvua+'&numE='+socaude+'&ndt='+noidungthi;
}
function updatecheckCD() {
     var allVals = [];
     $('#multi-select input:checked').each(function() {
       allVals.push($(this).val());
     });
 $('#setcd').val(allVals);
} 
function lambaikhac(){
	LoadXmlDoc('/modules/test/lambaikhac_xml.php');
}
function xemvideogiaide(idcauhoi){
    $('#modal-body').html('<iframe style="width:100%, height:330px;" scrolling="no" src="https://video.vinastudy.vn/video/video-test.php?id='+idcauhoi+'" webkitallowfullscreen="true" mozallowfullscreen="true"  allowfullscreen="true"></iframe>');
    $('#videogiaicauhoi').modal('show');
}
function xemvideogiaide_mobile(idcauhoi){
    $('.video_giai').html('<iframe style="width:100%, height:330px;" scrolling="no" src="https://video.vinastudy.vn/video/video-test.php?id='+idcauhoi+'" webkitallowfullscreen="true" mozallowfullscreen="true"  allowfullscreen="true"></iframe>');
    $('.videogiai').fadeIn();
}
function closeVideoQuestion(){
    $('#modal-body').html('');
}
function thongbaohettien(g){
    LoadXmlDoc('/modules/test/kiemtrataikhoan_xml.php?key='+g,'thongbaoloi');
}
function thongbaohettien2(g){
    LoadXmlDoc('/modules/test/kiemtrataikhoan2_xml.php?key='+g,'thongbaoloi');
}
function muavideogiai(g){
    var x = confirm("Bạn có chắc muốn mua câu hỏi có mã : " + g + " !");
    if(x == true){
        LoadXmlDoc('/modules/test/muacauhoitest_xml.php?key='+g+'&type=video');
    }else{
        return false;
    }
}
function muahuongdangiai(g){
    var x = confirm("Bạn có chắc muốn mua câu hỏi có mã : " + g + " !");
    if(x == true){
        LoadXmlDoc('/modules/test/muacauhoitest_xml.php?key='+g+'&type=text');
    }else{
        return false;
    }
}
function setSelect(id){
    var ten = $('#caphoc'+id).html();
    $('#selectBoxCapHoc').html(ten);
    $('.drop-button').css('padding-right','50px');
    data = 'id='+id;
    LoadXmlDocPost('/modules/captruonghoc/loadlophoc_xml.php',data,'lop_online');
}
function setSelectLop(id){
    var ten = $('#loponline'+id).html();
    $('.lophoc-select').html(ten);
    data = 'id='+id;
    LoadXmlDocPost('/modules/captruonghoc/loadkhoahoc_xml.php',data,'boxItemKhoaHoc');
}
function chonloptuluyen(){
    lop = $('#chonlop').val();
    LoadXmlDoc('/modules/trangchu/chonlop_xml.php?id='+lop,'chonmon');
}
function chonmontuluyen(){
    var lop = $('#chonlop').val();
    var str = '<i class="fa fa-exclamation-circle  faa-flash animated" aria-hidden="true"></i> ';
    if(lop == 0){
       $('#alert2').html(str+' Bạn phải chọn trước 1 lớp'); return false;
    }else{
        $('#alert2').html('');
    }
    var mon = $('#chonmon').val();
    $('.contents_test').html('');
    LoadXmlDoc('/modules/trangchu/chonmon2_xml.php?id='+mon,'noidungtuluyen');

}
function setValueContentTest(id){
    var value = $('#ndt').val();
    if($('#cd'+id).is(':checked')){
        value = value+','+id;
        var text = $('#text_cd'+id).html();
        var t_old = $('.contents_test').html();
        text_new = t_old+' <span class="item-content-test" id="select'+id+'"> '+text+' <i class="fa fa-times" aria-hidden="true"></i></span>';
        $('.contents_test').html(text_new);
        
    }else{
        $('#select'+id).remove();
        value = value.replace(','+id,'');
    }
    $('#ndt').val(value);
    
}

function dangkyoffline(){
    $('#buttonOffline').button('loading');
    hoten = $('#hoten').val();
    phone = $('#phone').val();
    email = $('#email').val();
    lop   = $('#lop').val();
    cosohoc = $('#cosohoc').val();
    if(hoten == '' || hoten == null){
        $('#hoten').focus();
        $('#erros_alert').html('Vui lòng cung cấp họ và tên ?');
        $('#buttonOffline').button('reset');
        return false;
    }
    if(phone == '' || phone == null){
        $('#phone').focus();
        $('#erros_alert').html('Vui lòng cung cấp số điện thoại ?');
        $('#buttonOffline').button('reset');
        return false;
    }
   	var paten = /^0([1-9]{1})([0-9]{8,9})/;
	var res = paten.test(phone);
    if(res == false){
        $('#phone').focus();
        $('#erros_alert').html('Vui lòng cung cấp đúng số điện thoại của bạn?');
        $('#buttonOffline').button('reset');
        return false;
    }
    if(email == '' || email == null){
        
        $('#email').focus();
        $('#erros_alert').html('Vui lòng cung cấp email ?');
        $('#buttonOffline').button('reset');
        return false;
    }
    if(lop == '' || lop == null){
        $('#lop').focus();
        $('#erros_alert').html('Vui lòng cung cấp lớp đang học ?');
        $('#buttonOffline').button('reset');
        return false;
    }
    if(cosohoc == '' || cosohoc == null){
        $('#cosohoc').focus();
        $('#erros_alert').html('Bạn muốn con học ở cơ sở nào ?');
        $('#buttonOffline').button('reset');
        return false;
    }
    data = 'hoten='+encode(hoten)+'&dienthoai='+encode(phone)+'&email='+encode(email)+'&lop='+encode(lop)+'&coso='+encode(cosohoc);
    LoadXmlDocPost('/modules/trangchu/dangkyoffline_xml.php',data,'erros_alert');
}
function selectDropdown(iddulieu,idnhan='',idhienthi=''){
    var value = $('#'+iddulieu).data("id") ;
    var text = $('#'+iddulieu).html();
    $('#'+idnhan).val(value);
    $('#'+idhienthi).html(text+'<i class="fa fa-caret-down"></i>');
}
function timdekiemtrathang(){
    $('#submit_timdekiemtra').button('loading');
    thang = $('#chonthang').val();
    nam = $('#chonnam').val();
    lop = $('#chonlophangthang').val();
    if(thang == 0){
        $('#show_selectMonth').css('border','red 2px solid');
        $('#submit_timdekiemtra').button('reset');
        return false;
    }else{
        $('#show_selectMonth').css('border','1px #252525 solid');
    }
    if(nam == 0){
        $('#show_selectYear').css('border','red 2px solid');
        $('#submit_timdekiemtra').button('reset');
        return false;
    }else{
        $('#show_selectYear').css('border','1px #252525 solid');
    }
    if(lop == 0){
        $('#show_selectClass').css('border','1px #252525 solid');
        $('#submit_timdekiemtra').button('reset');
        return false;
    }else{
        $('#show_selectClass').css('border','1px #252525 solid');
    }
    data = 'thang='+thang+'&nam='+nam+'&lop='+lop;
    LoadXmlDocPost('/modules/trangchu/testhangthang_xml.php',data,'result_kiemtrahangthang');
}
function thongkekhoahocgiaovien(id){
    
    
    if($('#batdau').val() == null || $('#batdau').val() == '' ){
		alert('Vui lòng chọn ngày');
		$('#batdau').focus();
		return false;
	}else{
		batdau = $('#batdau').val(); 
	}
	if($('#ketthuc').val() == null || $('#ketthuc').val() == '' ){
		alert('Vui lòng chọn ngày');
		$('#ketthuc').focus();
		return false;
	}else{
	   ketthuc = $('#ketthuc').val();
	}
    LoadXmlDoc('modules/thongke/thongkekhoahoc_xml.php?id='+id+'&batdau='+batdau+'&kethuc='+ketthuc,'result_thongketong');
}
function showmenuMobile(){
	if($('#menu-left').hasClass('outmenu')){
		$('#menu-left').hide(300);
		$('#menu-left').removeClass('outmenu');
	}else{
		if($('#menu-left').hasClass('hidden')){
			$('#menu-left').removeClass('hidden');
		}
		$('#menu-left').show(300);
		$('#menu-left').addClass('outmenu');
	}
}
function showSearchMobile(){
	if($("#frm_serch_mobi").length == 0){
		var box_search = '<form class="from-search" id="frm_serch_mobi" action="/index.php" method="get"><input type="hidden" id="inp_hidden" name="f" value="timkiem"><input type="text" name="search" id="search" class="input-search" placeholder="Nhập mã câu hỏi cần tìm"><button class="button-search-mobile" onclick="document.getElementById(\'frm_serch_mobi\').submit();">Tìm kiếm</button></form>';
		$('body').append('<div class="bao-mobile">'+box_search+'</div>');
	}else{
		$('.bao-mobile').remove();
	}
	
}
function muadethionline(id){
	LoadXmlDoc('modules/test/muadetestonline_xml.php?id='+id);
}
function mualuyenchuyende(cd,test){
    LoadXmlDoc('modules/test/muachuyendeluyen_xml.php?test='+test+'&chuyende='+cd);
}
function thongbaomuakhoahocvade(id_test, id_kh){
    $('.button_appen').remove();
    $('#alert_muakhoahoc').modal('show');
    ten = $('#link'+id_kh).attr('title');
    content = '<a href="javascript:LoadXmlDoc(\'/modules/muakhoahoc/muariengdetest_xml.php?id='+id_test+'\',\'thongbaomua\')" class="button-thanhtoan button_appen"><i class="fa fa-cart-plus" aria-hidden="true"></i> &nbsp; | &nbsp; Mua đề luyện "'+ten+'"</a>'
    $('#alert_muakhoahoc .modal-body').append(content);
}
function saveInfoAds(source,loai){
    $('#senddd').button('loading');
    ten = $('#name').val();
    dienthoai = $('#dienthoai').val();
    email = $('#email').val();
    namsinh = $('#namsinh').val();
    if(ten == '' || ten == null){
        $('#alert_mess').html("Vui lòng nhập vào họ và tên");
        $('#senddd').button('reset');
        return false;
    }else{
        $('#alert_mess').html("");
    }
    if(dienthoai == '' || dienthoai == null){
        $('#alert_mess').html("Vui lòng nhập vào số điện thoại");
        $('#senddd').button('reset');
        return false;
    }else{
        $('#alert_mess').html("");
    }
    var paten = /^([0-9]{9,11})$/;
	var res = paten.test(dienthoai);
    if(res == false){
        $('#alert_mess').html("Vui lòng nhập đúng số điện thoại");
        $('#senddd').button('reset');
        return false;
    }else{
        $('#alert_mess').html("");
    }
    
    if(email == '' || email == null){
        $('#alert_mess').html("Vui lòng nhập vào email");
        $('#senddd').button('reset');
        return false;
    }else{
        $('#alert_mess').html("");
    }
    if(namsinh == '' || namsinh == null){
        $('#alert_mess').html("Vui lòng nhập vào năm sinh");
        $('#senddd').button('reset');
        return false;
    }else{
        $('#alert_mess').html("");
    }
    data = 'hoten='+ten+'&dienthoai='+dienthoai+'&email='+email+'&namsinh='+namsinh+'&nguon='+source+'&loai='+loai;
    LoadXmlDocPost('/modules/quangcao/themnguoidung_xml.php',data,'alert_mess');
}

/*****Share Facebook******/
function fbShare(url,width, height) {
var leftPosition, topPosition;
leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
topPosition = (window.screen.height / 2) - ((height / 2) + 50);
var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=no,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
window.open('http://www.facebook.com/sharer.php?u='+url,'sharer', windowFeatures);
return false;
}

/***************Tính lượt xem tài liệu********************/
function luottai(id){
    LoadXmlDoc('modules/download/luottai.php?id='+id,'thongbaodownload');
    
}
function xacnhanmuatailieu(idtv,idtl,giatien,link){
    setTimeout(function(){
    LoadXmlDoc('modules/download/muatailieu.php?idtv='+idtv+'&idtl='+idtl+'&giatien='+giatien+'&link='+link,'thongbaodownload')
    },2500)
    $('#loading-tl').css('display','block');
    setTimeout(function(){
        $('#loading-tl').css('display','none');;
    },2000);
}
function download(id){
    LoadXmlDoc('modules/download/download.php?id='+id)
}
function xemdonhang(id){
    $("#formthongtin").css('display','none');
    $('.tenpopup').replaceWith('Thông Tin Giở Hàng');
    $('.listcart').css('display','block');
    $('.button-dathang').html('<button type="button" class="btn btn-default" id="xacnhandathang" onclick="xacnhandathang('+id+')">Xác Nhận</button></div>');
    $('.quaylaidathang').html('<button type="button" class="btn btn-default" onclick="quaylaidathang('+id+')">Quay Lại</button>');
}
function quaylaidathang(id){
    $("#formthongtin").css('display','block');
    $('.tenpopup').replaceWith('Thông Tin Khách Hàng');
    $('.listcart').css('display','none');
    $('.button-dathang').html('<button type="button" class="btn btn-default" onclick="xemdonhang('+id+')">Xem Đơn Hàng</button>');
    $('.quaylaidathang').html('');
    
}
function huydathang(id){
    $('.quaylaidathang').remove();
    $('.tenpopup').replaceWith('Thông Tin Khách Hàng');
    $('.button-dathang').html('<button type="button" class="btn btn-default" onclick="xemdonhang('+id+')">Xem Đơn Hàng</button>');
    $('#formthongtin').css('display','block');
    $('.listcart').css('display','none');
    $('.thanks').css('display','none');
    $('#cokhong').css('display','block');
}
function xacnhandathang(id){
    dienthoai = $('#dienthoai').val();
    email =  $('#email').val();
    diachi = $('#diachi').val();
    hoten = $('#hoten').val();
    ghichu = $('#ghichu').val();
    soluong = $('#soluong').val();
    idtv = $('#idtv').val();
    giatien = $('#giatien').val();
    
    $('.quaylaidathang').remove();
    $('.listcart').css('display','none');
    $('.thanks').css('display','block');
    $('.huydathang').html('<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>')
    $('.button-dathang').css('display','none');
    LoadXmlDoc('modules/download/dathang.php?email='+email+'&dienthoai='+dienthoai+'&diachi='+diachi+'&hoten='+hoten+'&ghichu='+ghichu+'&soluong='+soluong+'&idsp='+id+'&idtv='+idtv+'&giatien='+giatien);
}
function t_test(p,id){
    LoadXmlDoc('/modules/khoahoc/binhluan.php?p='+p+'&id='+id);
}
function setIndexQuestion(test,vitri){
    LoadXmlDoc('/modules/test/save_index_xml.php?test='+test+'&vitri='+vitri,'socaudanglam');
}
//upload file
function tiz(id,urlxuly,value='',path='',loai=''){
    if(id == ""){
    var uploadfiles = document.querySelector('#imgpopup');
    }else{
    var uploadfiles = document.querySelector('#fileinput_'+id);
    } 
    var f = uploadfiles.files;
    var url = urlxuly;//'upload_img/xuly/xuly.php';
    $('.preview_'+id).css('display','none');
    //preview
    if(id && value == ''){
    file = f[0]; 
    
    var galleryId = "gallery_"+id;

    var gallery = document.getElementById(galleryId);
    var imageType = /image.*/;

    if (!file.type.match(imageType)) {
        //throw "File Type must be an image";
        alert('đây không phải file hình ảnh....');
        document.getElementById('fileinput_'+id).value = '';
        $('.thumbnail1').remove();
    }else{
    $('.thumbnail1').remove();
    var thumb = document.createElement("div");
    thumb.classList.add('thumbnail1');

    var img = document.createElement("img");
    img.file = file;
    thumb.appendChild(img);
    gallery.appendChild(thumb);
    // Using FileReader to display the image content
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
    
    //button upload
    $('#buttonUpload'+id).css('display','block');
    }}
    //send ajax
    if(id && value == 'upload' && path != ''){
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open("POST", url, true);
    console.log(file);
    fd.append("upload_file", file);
    fd.append("thanhvien", id);
    fd.append("path",path);
    fd.append("loai",loai);
    xhr.send(fd);

    xhr.onreadystatechange = function(event) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rs = xhr.responseText;
            console.log(rs);
                $('#thongbaoupload_'+id).html(rs);
            
        }
    };    
}
}
/**********Hỏi Đáp***********/
function guicauhoi(idhinh,trangthaidangnhap){
    document.getElementById('guicauhoi').disabled = true;
    noidung=encode(tinyMCE.get('mceNoidung').getContent());
    lop = encode($('#select').val());
    tieude = encode($('#tieude').val());
    console.log(tieude);
    var f = document.querySelector('#fileinput_'+idhinh).files;
    LoadXmlDoc('modules/hoidap/themcauhoi.php?noidung='+noidung+'&lop='+lop+'&tieude='+tieude+'&file='+f.length,'echo_them');
    if(f.length == 0){
    }if(f.length == 1){
        if(lop != 0 && tieude != '' && trangthaidangnhap == 1){
        //upload hình ảnh
        tiz(idhinh,'modules/hoidap/upload_hinh.php','upload','../../data/hoidap/');
    }else{
        console.log('chưa đăng nhập');
    }
}
}
function guithachdau(idhinh,checkdn){
    document.getElementById('td_guicauhoi').disabled = true;
    noidung=encode(tinyMCE.get('td_mceNoidung').getContent());
    lop = encode($('#td_select').val());
    tieude = encode($('#td_tieude').val());
    diemtd = encode($('#td_diemthachdau').val());
    thoigiantd = encode($('#td_thoigiantd').val());
    var f = document.querySelector('#fileinput_'+idhinh).files;
    LoadXmlDoc('modules/hoidap/themcauhoi.php?noidung='+noidung+'&lop='+lop+'&tieude='+tieude+'&file='+f.length+'&thoigian='+thoigiantd+'&diem='+diemtd,'echo_them');
    if(f.length == 0){
    }if(f.length == 1){
        if(lop != 0 && tieude != '' && trangthaidangnhap == 1){
        //upload hình ảnh
        tiz(idhinh,'modules/hoidap/upload_hinh.php','upload','../../data/hoidap/');
    }else{
        console.log('chưa đăng nhập');
    }
}
}
function guitraloi_hoidap(id,trangthaidangnhap,nguoigui,nguoinhan,loai){
    document.getElementById('guitraloi').disabled = true;
    noidung=encode(tinyMCE.get('mceNoidung').getContent());
    var f = document.querySelector('#fileinput_1').files;
    console.log(f.length+' hihi');
    LoadXmlDoc('/modules/hoidap/themtraloi.php?id='+id+'&noidung='+noidung+'&file='+f.length+'&nguoigui='+nguoigui+'&nguoinhan='+nguoinhan+'&loai='+loai,'echo_them');
    if(f.length == 0){
    }if(f.length == 1 && trangthaidangnhap == 1){
        //upload hình ảnh
        tiz(1,'/modules/hoidap/upload_hinh.php','upload','../../data/hoidap/');
    
}
}
function traloi_comment(id,checkdangnhap,nguoigui,nguoinhan,id_post){
        tenthanhvien = $('#tenthanhvien_'+id).text();
        noidung = $('#noidung_comment_'+id).html();
        document.getElementById('nut_traloi').innerHTML = '<button class="btn btn-danger" id="guitraloi" onclick="guitraloi_hoidap('+id_post+','+checkdangnhap+','+nguoigui+','+nguoinhan+',1)">Gửi Trả Lời</button>';
        text = '<span class="reply_comment">Bởi: <strong>'+tenthanhvien+' </strong><br />'+noidung+'</span><span class="noidung"><br />&nbsp;&nbsp;</span>';
        tinyMCE.get('mceNoidung').setContent(text);
        var target = jQuery(".noidung_hoidap");
        if (target.length) {
            $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000, function(){ // function to focus here
                tinyMCE.activeEditor.selection.select(tinyMCE.activeEditor.getBody(), true);
                tinyMCE.activeEditor.selection.collapse(false);
                tinyMCE.activeEditor.focus();
                   
             });
             return false;
         }
}
function traloi_baiviet(id){
        tinyMCE.get('mceNoidung').setContent('');
        var target = jQuery(".noidung_hoidap");
        if (target.length) {
            $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000, function(){ // function to focus here
                tinyMCE.activeEditor.selection.select(tinyMCE.activeEditor.getBody(), true);
                tinyMCE.activeEditor.selection.collapse(false);
                tinyMCE.activeEditor.focus();
                   
             });
             return false;
         }
}
function thich_comment(id_comment,nguoinhan,nguoigui,id_elm){
    socu = $('#so_'+id_elm).text();
    somoi = parseInt(socu) + 1;
    $('#so_'+id_elm).text(somoi);
    $('#thich_comment_'+id_elm).remove();
    LoadXmlDoc('modules/hoidap/thich.php?id_comment='+id_comment+'&nguoinhan='+nguoinhan+'&nguoigui='+nguoigui,'so_thich_'+id_elm);
}
function xuatbancauhoi(id){
    var x = confirm('Ban co chac muon xoa khong');
    if(x == true){
    LoadXmlDoc('modules/hoidap/xuatban.php?id='+id,'common_echo');
    }
}
function naptheVinastudy(button='',mathe='' ,serial='',thongbao=''){
	//$('#'+button).button('loading');
	maserial = $('#'+serial).val();
	mathenap = $('#'+mathe).val();
	if(maserial.length != 10){
		$('#'+thongbao).html('Số serial không hợp lệ');
		return false;
	}
	if(mathenap.length != 12){
		$('#'+thongbao).html('Mã thẻ không hợp lệ');
		return false;
	}
	data = 'mathe='+mathenap+'&serial='+maserial+'&idmathe='+mathe+'&idserial='+serial;
	LoadXmlDocPost('/modules/thevinastudy/napthevinastudy_xml.php',data,thongbao);
}
function select_live_hophoc(id){
    $('#selectBoxLopHoc').attr("data-id-lophoc", id);
    ten = $('#live_lophoc_'+id).html();
    $('#selectBoxLopHoc').html(ten);
    data = 'id='+id;
    LoadXmlDocPost('/modules/live/chonlophoc_xml.php',data,'item-live-right');
}
function select_live_thoigian(id){
    $('#dLabel2').attr("data-id-thoigian", id);
    var lop = $('#selectBoxLopHoc').attr('data-id-lophoc');
    var monhoc = $('#dLabel3').attr('data-id-monhoc');
    ten = $('#live_thoigian_'+id).html();
    $('#dLabel2').html(ten);
    data = 'id='+id+'&lop='+lop+'&monhoc='+monhoc;
    LoadXmlDocPost('/modules/live/chonthoigian_xml.php',data,'item-live-right');
}
function select_live_monhoc(id){
    var thoigian = $('#dLabel2').attr('data-id-thoigian');
    var lop = $('#selectBoxLopHoc').attr('data-id-lophoc');
    $('#dLabel3').attr("data-id-monhoc", id);
    ten = $('#live_monhoc_'+id).html();
    $('#dLabel3').html(ten);
    data = 'id='+id+'&lop='+lop+'&thoigian='+thoigian;
    LoadXmlDocPost('/modules/live/chonmonhoc_xml.php',data,'item-live-right');
}
function loadquanhuyen(){
    id = $('#tinhtp').val();
    LoadXmlDoc('/modules/thanhvien/quanhuyen_XML.php?id='+id,'quanhuyen');
}
function block_comment(id){
    LoadXmlDoc('/modules/hoidap/block.php?id='+id,'common_echo');
}
/****************************************/
function xuatcauhoilive(id){
	cauhoi = parseInt($('#cauhoiid').val());
	LoadXmlDoc('/modules/live/xuatcauhoi_xml.php?cauhoi='+cauhoi+'&id='+id,'output_question');
}
function loadcauhoi(id,cauhoi){
	LoadXmlDoc('/modules/live/xuatcauhoi_load_xml.php?cauhoi='+cauhoi+'&id='+id,'output_question');
}
function guiketquaTestTungCau(echo,url,submit_ele){
	e.preventDefault();
	if($('#'+submit_ele).val() != ''){
		submit_form(echo,'',url,submit_ele);
	}
}
function updateInfoTeacher(id){
    monday = $('#monday').val();
    hocvi = $('#hocvi').val();
    email = $('#email').val();
    fb = $('#fb').val();
    thongtin = encode(tinyMCE.get('infoTeacher').getContent());
    data = 'giaovien='+id+'&monday='+monday+'&hocvi='+hocvi+'&email='+email+'&fb='+fb+'&info='+thongtin;
    LoadXmlDocPost('/modules/thanhvien/capnhatgiaovien_xml.php',data,'resultgv');
}
function dathangngay(id,type,loai){
	data ='id='+id+'&loai='+loai;
    $('#loai').val(loai);
	if(type== 0){
		//$('#dangkyngay_popup').modal('show');
        $('#open_dangkyngay_popup').click();
	}else if(type == 1){
	    $('.dangkyngay_button').prop('disabled',true);
		LoadXmlDocPost('/modules/muakhoahoc/dathangngay_xml.php',data);
	}else{
		return false;
	}
	
}
function dathangngay_nologin(id,type = 0){
	var ten = $('#ten').val(),email = $('#email').val(),dienthoai = $('#dienthoai').val(),loai = $('#loai').val();
	if(ten == ''){
		$('#dangkyngay_thongbao_popup').html('Vui lòng nhập vào họ tên');
		return false;
	}
	if(email == ''){
		$('#dangkyngay_thongbao_popup').html('Vui lòng nhập vào email');
		return false;
	}
	if(dienthoai == ''){
		$('#dangkyngay_thongbao_popup').html('Vui lòng nhập vào số điện thoại');
		return false;
	}
    $('.dangkyngay_button').prop('disabled',true);
	data = 'ten='+ten+'&email='+email+'&dienthoai='+dienthoai+'&khoahoc='+id+'&loai='+loai+'&type='+type;
	LoadXmlDocPost('/modules/muakhoahoc/dathangngay_nologin_xml.php',data);
}
function muatailieu(id){
    LoadXmlDocPost('/modules/qltailieu/muatailieu_xml.php','id='+id,'thongbaomua');
}
function themthanhvien_ctv(gh){
	$('#loading-dangky').html('Đang xử lý ...<img src="/templates/images/loading-nt.gif" alt="loading" />');
	var email = $('#dangky_email').val();
	var re_email = $('#reemail').val();
	var pass = $('#dangky_pass').val();
	var repass = $('#repass').val();
	var phone = $('#dangky_dienthoai').val();
	var year = $('#dangky_namsinh').val();
    var ghichu = $('#ghichu').val();
	if(re_email != email){
		$('#thongbaoemail').html('<br>Vui lòng nhập lại email chính xác');
		$('#loading-dangky').html('');
		return false;
	}else{
		$('#thongbaoemail').html('');
	}
	if(repass != pass ){
		$('#thongbaopass').html('<br>Vui lòng nhập lại pass chính xác');
		$('#loading-dangky').html('');
		return false;
	}else{
		$('#thongbaopass').html('');
	}
	var paten = /^0([1-9]{1})([0-9]{6,9})$/;
	var res = paten.test(phone);
	if(phone == ''){
		$('#thongbaophone').html('<br>Vui lòng cung cấp số điện thoại');
		$('#loading-dangky').html('');
		return false;
	}else{
		$('#thongbaophone').html('');
	}
	/*
	if(res == false){
		$('#thongbaophone').html('<br>Vui lòng cung cấp số điện thoại chính xác của bạn');
		$('#loading-dangky').html('');
		return false;
	}else{
		$('#thongbaophone').html('');
	}*/
	if(year == ''){
		$('#thongbaoyear').html('<br>Vui lòng cung cấp năm sinh');
		$('#loading-dangky').html('');
	}else{
		$('#thongbaoyear').html();
	}
	submit_form2('dangky_echo','nut_dangky','modules/thanhvien/themthanhvien_ctv.php','form_dangky');
}
function napthe_combo(){
    var code = $('#combo_code').val();
    var serial = $('#combo_serial').val();
    if(code == ""){
        return false;
    }else if(serial == ""){
        return false;
    }
    $('#button-combo').prop('disabled','true');
    LoadXmlDocPost('modules/napthe/napthecombo.php','code='+code+'&serial='+serial,'thongbao_combo')
}