function themadmin(){
    ten = $('#ten').val();
    email = $('#email').val();
    dienthoai = $('#dienthoai').val();
    pass = $('#pass').val();
    
    $.ajax({
       url:'modules/admin/ajax-admin.php',
       method: 'post',
       data:{
            'ten':ten,
            'email' : email,
            'dienthoai' : dienthoai,
            'pass' : pass,
            'type' : 'themadmin'
       },
       success:function(r){
            if(r == 1){
                location.reload();
            }else{
                toastr.warning(r);
            }
       } 
    });
}
$(document).ready(function(){
    
    table = $('#datatablemodule').DataTable({
		"columnDefs": [
        	{"className": "dt-center", "targets": "_all"}
      	],
		ajax: {
        	url: 'modules/admin/load_data.php',
			dataSrc: ''
    	},
		columns: [
			{ data: 'id' },
			{ data: 'ten' },
			{ data: 'email' },
            { data: 'pass' },
			{ data: 'dienthoai' },
            { data: 'xuatban' },
            { data: 'xoa' },
            
		],
		
	});
    
    $(document).on('change','.info_user',function(){
        id = $(this).data('id');
        name = $(this).data('name');
        value = $(this).val();
        $.ajax({
           url:'modules/admin/ajax-admin.php',
           method: 'post',
           data:{
                'id':id,
                'name' : name,
                'value' : value,
                'type' : 'change_info'
           },
           success:function(r){
                if(r == 1){
                    toastr.success("Cập nhật thông tin thành công");
                }else{
                    toastr.warning(r);
                }
           } 
        });
    });
    $(document).on('click','.xuatban-admin',function(){
        id = $(this).data('id');
        $.ajax({
           url:'modules/admin/ajax-admin.php',
           method: 'post',
           data:{
                'id':id,
                'type' : 'xuatban_admin'
           },
           success:function(r){
                if(r == 1){
                    toastr.success("Cập nhật thông tin thành công");
                }else{
                    toastr.warning(r);
                }
           } 
        });
    });
    $(document).on('click','.xoa',function(){
        id = $(this).data('id');
        x = confirm("Xác nhận xóa");
        if(x == true){
            $.ajax({
               url:'modules/admin/ajax-admin.php',
               method: 'post',
               data:{
                    'id':id,
                    'type' : 'xoa_admin'
               },
               success:function(r){
                    if(r == 1){
                        location.reload();
                    }else{
                        toastr.warning(r);
                    }
               } 
            });
        }
        
    });
});