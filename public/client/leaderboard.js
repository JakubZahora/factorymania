$( document ).ready(function() {
    ajaxl();
});

function ajaxl() {
    $.get("/user/leader", function(data, status){
      objs = data;
      console.log(objs);
      
    });
  }