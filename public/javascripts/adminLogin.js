// Redirect user to profile if already logged
if(document.cookie.indexOf('auth_token')!=-1){
    window.location='/dashboard';
}
$(document).ready(function(){
    $('.loginform').submit((e)=>{
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"api/login",
            data:new FormData(e.target),
            processData:false,
            contentType:false,
            beforeSend:()=>{
                $(".loginform button[type='submit']").addClass('d-none');
                $('.loading-btn').removeClass('d-none');
            },
            success:(response)=>{
                $(".loginform button[type='submit']").removeClass('d-none');
                $('.loading-btn').addClass('d-none');
                if(response.isUserValid){
                    window.location='/dashboard';
                }
            },
            error:(error)=>{
                $(".loginform button[type='submit']").removeClass('d-none');
                $('.loading-btn').addClass('d-none');
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