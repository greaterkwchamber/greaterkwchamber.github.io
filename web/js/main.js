
function toggle_visibility(id, view) {
       var e = document.getElementById(id);
       if(view == 'hide')
          e.style.display = 'none';
       else
          e.style.display = 'block';
   }

function show_more_menu(value) {
	$('#first_name2').focus();
  var x = document.getElementById("first_name2");
  x.value = value;
  myFunction();
}
function myFunction() {
    var x = document.getElementById("first_name2");
    toggle_visibility('loadingMask', 'show');
    $.ajax({url: "https://greaterkwchamber.herokuapp.com/?q=" + x.value, success: function(result){
        // console.log(result);
        toggle_visibility('loadingMask', 'hide');
        $("#listOfPeople").empty();
        for(var i=0; i<result.length; i++){
          // console.log(result[i])
          $("#listOfPeople").append('<li class="collection-item avatar"><i class="material-icons circle">perm_identity</i><span class="title">' + 
            result[i].ucdirectory_uclisting_lblowner + '</span><p style="text-align:left;">' + 
          result[i].ucdirectory_uclisting_lbladdress1 + ', ' +
          result[i].ucdirectory_uclisting_lblcity + ', ' +
          result[i].ucdirectory_uclisting_lblstateprovince + '<span style="float:right;">' +
          result[i].ucdirectory_uclisting_lblphone1 + '</span></p></li>');
        }
    }});
    // x.value = x.value.toUpperCase();
}
