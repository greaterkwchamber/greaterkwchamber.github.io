
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
    if(x.value.length == 0){
      return 1;
    }
    toggle_visibility('loadingMask', 'show');
    $.ajax({url: "https://greaterkwchamber.herokuapp.com/?q=" + x.value, success: function(result){
        // console.log(result);
        toggle_visibility('loadingMask', 'hide');
        $("#listOfPeople").empty();
        setTitleText(result.length)
        for(var i=0; i<result.length; i++){
          // console.log(result[i])
          var url = '';
          if(result[i].ucdirectory_uclisting_hlwebsite.length > 0){
            url = '<a target="_blank" href="' + result[i].ucdirectory_uclisting_hlwebsite +
                  '">' + result[i].ucdirectory_uclisting_hlwebsite + '</a>';
          }
          $("#listOfPeople").append('<li class="collection-item avatar"><i class="material-icons circle blue">place</i><span class="title">' + 
            result[i].ucdirectory_uclisting_lblowner + ' ' + url + '</span><p style="text-align:left;">' + 
          result[i].ucdirectory_uclisting_lbladdress1 + ', ' +
          result[i].ucdirectory_uclisting_lblcity +
          result[i].ucdirectory_uclisting_lblstateprovince + '<span style="float:right;">' +
          result[i].ucdirectory_uclisting_lblphone1 + '</span></p></li>');
        }
    }});
    // x.value = x.value.toUpperCase();
}

function getCount() {
    $.ajax({url: "https://greaterkwchamber.herokuapp.com/count", success: function(result){
        setTitleText(result)
      }
    });
}

function setTitleText(result){
  $('#logo-container').text('Chamber of Commerce - Kitchener/Waterloo (' + result + ')')
}
getCount();