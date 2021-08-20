$(document).ready(function(){
    $('.toggler').click(function(){
       if( $('.sidenav').hasClass('sidenav-open'))
       {
           $('.sidenav').removeClass('sidenav-open')
           $('.sidenav .sidenav-items').removeClass('sidenav-list-open')
           $('.sidenav').addClass('sidenav-close')
           $('.sidenav .sidenav-items').addClass('sidenav-list-close')

           //    Section Controll
           $('.section').removeClass('section-open')
           $('.section').addClass('section-close')
       }
       else
       {
           $('.sidenav').addClass('sidenav-open')
           $('.sidenav .sidenav-items').addClass('sidenav-list-open')
           $('.sidenav').removeClass('sidenav-close')
          
           setTimeout(()=>{
            $('.sidenav .sidenav-items').removeClass('sidenav-list-close')
            },200)
           //    Section Controll
           $('.section').addClass('section-open')
           $('.section').removeClass('section-close')
       }
    })
    // Get Active link Content
    activeLink();
})

// Fetching Sidenav Contents
$(document).ready(function () { 
  $(".sidenav-items button").each(function(){
    $(this).click(function(){
       const link = $(this).attr('link');
       $.ajax({
           type:'GET',
           url:'/dashboard'+link,
           success:(response)=>{
               $('.sidenav-content').html(response);
           }
       })
    })
  })

 })

 // Logout 

$(document).ready(function(){
    $('.logout-btn').click(function(){
        document.cookie="auth_token='';max-age=0"; 
        window.location='/admin-login';
    })
})

 function activeLink(){
    const link = $(".sidenav-items button.active").attr('link');
    $.ajax({
        type:'GET',
        url:'/dashboard'+link,
        success:(response)=>{
            $('.sidenav-content').html(response);
        }
    })
 }