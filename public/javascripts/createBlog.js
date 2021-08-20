$(document).ready(function(){
    $('textarea').click(function(){
        $(this).html('');
    })
})

// Request Create Blog Api

$(document).ready(function(){
    $('#createBlogForm').submit(function(e){
         e.preventDefault();
         if($('#createBlogForm select').val() != 0){
         $.ajax({
             type:'POST',
             url:'/api/create-blog',
             data: new FormData(this),
             processData: false,
             contentType: false,
             beforeSend:()=>{
                $("#createBlogForm button[type='submit']").addClass('d-none');
                $('.loading-btn').removeClass('d-none');
            },
             success:function(response){
              $("#createBlogForm button[type='submit']").removeClass('d-none');
              $('.loading-btn').addClass('d-none');
              if(response.isBlogCreated){
                  $('#createBlogForm').trigger('reset');
              }
             },
             error:(error)=>{
                $("#createBlogForm button[type='submit']").removeClass('d-none');
                $('.loading-btn').addClass('d-none');
                if(error.status == 404){
                    $('.image-field').addClass('border border-danger text-danger animate__animated animate__bounce');
                    $('.image-error').html('Please Select An Image !');
                    $('.image-error').removeClass('d-none');
                }else{
                    const message = error.responseJSON.message; 
                    $(`.${message.field}-field`).addClass('border border-danger text-danger animate__animated animate__bounce');
                    $(`.${message.field}-error`).html(message.text);
                    $(`.${message.field}-error`).removeClass('d-none');
                }
             }
         })
         }else{
            $('.select-field').addClass('border border-danger text-danger animate__animated animate__bounce');
            $('.select-error').html('Please Select Any Category !');
            $('.select-error').removeClass('d-none');  
         }

    })

    // Capitalize options
    $("option").each(function() {
        var $this = $(this);
        $this.text($this.text().charAt(0).toUpperCase() + $this.text().slice(1));
    });
})

// Resest Error Field
$(document).ready(()=>{
    $('#createBlogForm input,#createBlogForm textarea,#createBlogForm select').each(function(){
        $(this).click(function(){
            if($(this).hasClass('border-danger')){
                $(this).removeClass('border border-danger text-danger animate__animated animate__bounce');
                $(this).next().html('');
            }
        })
    })
})