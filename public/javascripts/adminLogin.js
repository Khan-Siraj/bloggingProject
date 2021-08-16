$(document).ready(function(){
    $('.loginform').submit((e)=>{
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"api/login",
            data:new FormData(e.target),
            processData:false,
            contentType:false,
            success:(response)=>{
                if(response.isUserValid){
                    window.location='/dashboard';
                }
            },
            error:(error)=>{
                if(error.status == 404){
                    $('#inputEmail').addClass('border border-danger text-danger animate__animated animate__bounce');
                    $('.email-error').html(error.responseJSON.message);
                    $('.email-error').removeClass('d-none');
                }else{
                    $('#inputPassword').addClass('border border-danger text-danger animate__animated animate__bounce');
                    $('.password-error').html(error.responseJSON.message);
                    $('.password-error').removeClass('d-none'); 
                }
            }
        })
    })
})

// Resest Error Field
$(document).ready(()=>{
    $('.loginform input').each(function(){
        $(this).click(function(){
            if($(this).hasClass('border-danger')){
                $(this).removeClass('border border-danger text-danger animate__animated animate__bounce');
                $(this).next().html('');
            }
        })
    })
})