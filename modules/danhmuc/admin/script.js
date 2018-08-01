$(document).on('click','#themdanhmuc',function(){
    $(this).prop('disabled',true);
    ten = $('#ten').val();
    me = $('#me').val();
    xuatban = $('#xuatban').val();
    title = $('#title').val();
    description = $('#description').val();
    keyword = $('#keyword').val();
    mota = tinymce.get('mota').getContent();
    
    $.ajax({
        url :'',
        method : 'post',
        data:{
            'ten':ten,
            'me':me,
            'xuatban':xuatban,
            'title':title,
            'description':description,
            'keyword':keyword,
            'mota':mota
        },
        success:function(){
            
        }
    });
});