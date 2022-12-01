$(document).ready(function(){
      $('body #menu').on('click', function(){
            if ($(".sidebar").hasClass("active")) {
                  $('.sidebar').toggleClass('diactive');
                  $('.sidebar').removeClass('active');
                  $('.content').removeClass('off');
            }else if($(".sidebar").hasClass("diactive")){
                  $('.sidebar').toggleClass('active');
                  $('.sidebar').removeClass('diactive');  
                  $('.content').toggleClass('off');    
            }else{
                  $('.sidebar').toggleClass('active');
                  $('.content').toggleClass('off');
            }
            
      })


})