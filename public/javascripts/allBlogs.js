// Load More ...
$(document).ready(function(){
    $('.load-more').each(function(){
        $(this).click(function(){
            var content = $(this).attr('full-content');
            $('#myModal .modal-content').html(content);
            $('#myModal').modal('show');
        })
    })

     // Capitalize options
    $("option").each(function() {
        var $this = $(this);
        $this.text($this.text().charAt(0).toUpperCase() + $this.text().slice(1));
    });
})


// Actions
$(document).ready(function(){
    // Edit Data 
    $('.edit-btn').each(function(){
        $(this).click(function(){
            var id = $(this).attr('_id');
            const data = JSON.parse($(this).attr('blog'));
            let title = data.title;
            let author = data.author;
            let category = data.category;
            let image = data.image;
            let content = data.content;
            $('#updateBlogForm input[name="title"]').val(title);
            $('#updateBlogForm input[name="author"]').val(author);
            $('#updateBlogForm select[name="category"]').val(category);
            $('#updateBlogForm textarea[name="content"]').val(content);
            $('#editModal').modal('show');
            // Ajax Request Update Api
            $('#updateBlogForm').submit(function(e){
               e.preventDefault();
               var formData = new FormData();
               if($('#updateBlogForm input[name="image"]').val() != ""){
                    var fileInput = document.getElementById('image_input_field');
                    var file = fileInput.files[0];
                    formData.append('title', $('#updateBlogForm input[name="title"]').val());
                    formData.append('author', $('#updateBlogForm input[name="author"]').val());
                    formData.append('category', $('#updateBlogForm select[name="category"]').val());
                    formData.append('image', file);
                    formData.append('oldImage', image);
                    formData.append('content',$('#updateBlogForm textarea[name="content"]').val());
               }else{
                    var file = image;
                    formData.append('title', $('#updateBlogForm input[name="title"]').val());
                    formData.append('author', $('#updateBlogForm input[name="author"]').val());
                    formData.append('category', $('#updateBlogForm select[name="category"]').val());
                    formData.append('image', file);
                    formData.append('content',$('#updateBlogForm textarea[name="content"]').val());
               }

               $.ajax({
                   type:'PUT',
                   url:'/api/create-blog/'+id,
                   data:formData,
                   processData:false,
                   contentType:false,
                   success:(response)=>{
                      console.log('Success Call.');
                      console.log(response);
                      $('#editModal').modal('hide');
                      reloadCategories();

                   },
                   error:(error)=>{
                    console.log('Error Call.');
                    console.log(error.responseJSON);
                   }
               })
            })
        })
    })
    // Delete Data 
    $('.delete-btn').each(function(){
        $(this).click(function(){
            var id = $(this).attr('_id');
            var imagePath = $(this).attr('blogImage');
            $.ajax({
                type:'DELETE',
                url:'/api/create-blog/'+id,
                data:{
                   image:imagePath
                },
                success:(response)=>{
                    console.log('Success Call =>');
                    console.log(response);
                    reloadCategories();
                   },
                error:(error)=>{
                    console.log('Error Call =>');
                    console.log(error);
                }
            })
        })
    })
})

// Filter by category
$(document).ready(function(){
    $(".filter-by-category").on('change',function(){
        var value = $(this).val().toLowerCase();
        $("#blog-table tr").filter(function() {
         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    })
})
// Filter by search
$(document).ready(function(){
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#blog-table tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
})


// reload categories
function reloadCategories(){
    $.ajax({
        type:'GET',
        url:'/dashboard/all-blogs',
        success:(response)=>{
            $('.sidenav-content').html(response);
        }
     })
}