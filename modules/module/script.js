
function themmodules(){
    $('#button_them').prop('disabled',true);
    ten = $('#ten').val();
    chucnang = $('#chucnag').val();
    me = $('#me').val();
    $.ajax({
        url: "/modules/module/ajax_module.php",
        method : 'post',
        data: {
          'ten':ten,
          'chucnang':chucnang,
          'me' : me,
          'type':'themmodules'  
        }, 
        success: function(r){
           if(r == 1){
                $('#box-themmodules input').val('');         
                toastr.success('Thêm mới thành công.');  
                $('#button_them').prop('disabled',false); 
           }else{
                toastr.success(r);
                $('#button_them').prop('disabled',false);
           } 
        }
    });
}

