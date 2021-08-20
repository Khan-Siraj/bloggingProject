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
            beforeSend:()=>{
                $(".category-form button[type='submit']").addClass('d-none');
                $('.loading-btn').removeClass('d-none');
            },
            success:(response)=>{
             $(".category-form button[type='submit']").removeClass('d-none');
             $('.loading-btn').addClass('d-none');
             if(response.isCategoryCreated){
                reloadCategories();
             }
            
            },
            error:(error)=>{
                $(".category-form button[type='submit']").removeClass('d-none');
                $('.loading-btn').addClass('d-none');
                $('.category-name').addClass('border border-danger text-danger animate__animated animate__bounce');
                $('.category-error').html(error.responseJSON.message.text);
                $('.category-error').removeClass('d-none');
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
                url:'/api/categoriesAction/'+id,
                data:{
                    name:new_cat_name
                },
                beforeSend:()=>{
                    $(".edit-form button[type='submit']").addClass('d-none');
                    $('.loading-btn').removeClass('d-none');
                },
                success:(response)=>{
                    $(".edit-form button[type='submit']").removeClass('d-none');
                    $('.loading-btn').addClass('d-none');
                    if(response.isCategoryUpdated){
                        reloadCategories();
                        $('#editModal').modal('hide');
                    }
                   },
                error:(error)=>{
                    $(".edit-form button[type='submit']").removeClass('d-none');
                    $('.loading-btn').addClass('d-none');
                    console.log('Error Call =>');
                    // console.log(error.responseJSON);
                    $('.cat-name-input').addClass('border border-danger text-danger animate__animated animate__bounce');
                    $('.cat-name-error').html(error.responseJSON.message);
                    $('.cat-name-error').removeClass('d-none'); 
                }
            })
            })
        })
    })
    // Delete Data 
    $('.delete-btn').each(function(){
        $(this).click(function(){
            var id = $(this).attr('_id');
            var delBtn = this;
            $.ajax({
                type:'DELETE',
                url:'/api/categoriesAction/'+id,
                beforeSend:()=>{
                    $(delBtn).addClass('d-none');
                    $(this).next().removeClass('d-none');
                },
                success:(response)=>{
                    $(delBtn).removeClass('d-none');
                    $(this).next().addClass('d-none');
                    reloadCategories();
                   },
                error:(error)=>{
                    $(delBtn).removeClass('d-none');
                    $(this).next().addClass('d-none');
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

// Resest Error Field
$(document).ready(()=>{
    $('.category-form input,.edit-form input').each(function(){
        $(this).click(function(){
            if($(this).hasClass('border-danger')){
                $(this).removeClass('border border-danger text-danger animate__animated animate__bounce');
                $(this).next().html('');
            }
        })
    })
})