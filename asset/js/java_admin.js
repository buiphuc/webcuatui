$(document).ready(function(){
    $('#click_login').click(function(e){
        e.preventDefault();
        check = true;
        $(this).prop('disabled', true);
        email = $('#email_login').val();
        pass  = $('#pass_login').val();
        if(email == '' || email == undefined){
            toastr.error('Vui lòng nhập vào địa chỉ email');
            check = false;
        }
        if(pass == '' || pass == undefined){
            toastr.error('Vui lòng nhập vào mật khẩu');
            check = false;
        }
        if(check == true){
             $.ajax({
                url: "/ajax/ajax_admin.php",
                method : 'post',
                data : {
                    'email':email,
                    'pass':pass,
                    'type':'login_admin'
                } ,
                success: function(r){
                    if(r == 0){
                        toastr.error('Sai tên đăng nhập hoặc mật khẩu');
                        $(this).prop('disabled', false);
                    }else if(r == 1){
                        location.reload();
                    }
                }
             });
        }else{
             $(this).prop('disabled', false);
        }
    })
});
