$(document).ready(function(){
    $('textarea').click(function(){
        $(this).html('');
    })
})

// Request Create Blog Api

$(document).ready(function(){
    $('#createBlogForm').submit(function(e){
         e.preventDefault();
         $.ajax({
             type:'POST',
             url:'/api/create-blog',
             data: new FormData(this),
             processData: false,
             contentType: false,
             success:function(response){
               console.log(response);
             }
         })
    })

    // Capitalize options
    $("option").each(function() {
        var $this = $(this);
        $this.text($this.text().charAt(0).toUpperCase() + $this.text().slice(1));
    });
})