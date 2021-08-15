$(document).ready(function(){
    $('.category-form').submit(function(e){
        e.preventDefault();
        var name = $('.category-name').val().toLowerCase();
        $.ajax({
            type:'POST',
            url:'/api/categories',
            data:{
                name:name
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

// Actions
$(document).ready(function(){
    // Edit Data 
    $('.edit-btn').each(function(){
        $(this).click(function(){
            var id = $(this).attr('_id');
            var name = $(this).attr('cat_name');
            $('.cat-name-input').val(name);
            $('#editModal').modal('show');
            $('.edit-form').submit(function(e){
               e.preventDefault();
               var new_cat_name = $('.cat-name-input').val().toLowerCase();
               $.ajax({
                type:'PUT',
                url:'/api/categories/'+id,
                data:{
                    name:new_cat_name
                },
                success:(response)=>{
                    console.log('Success Call =>');
                    console.log(response);
                    reloadCategories();
                    $('#editModal').modal('hide');
                   },
                error:(error)=>{
                    console.log('Error Call =>');
                    console.log(error);
                    $('#editModal').modal('hide');
                }
            })
            })
        })
    })
    // Delete Data 
    $('.delete-btn').each(function(){
        $(this).click(function(){
            var id = $(this).attr('_id');
            $.ajax({
                type:'DELETE',
                url:'/api/categories/'+id,
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

// reload categories
function reloadCategories(){
    $.ajax({
        type:'GET',
        url:'/dashboard/categories',
        success:(response)=>{
            $('.sidenav-content').html(response);
        }
     })
}