// allow players to register their name and email based on signup codes they were sent 

var drawn = [], auth_key, auth, set_auth, json, player, table_data = []; 


// function to generate registration code
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// function to create table rows based on objects in arrays
function popTable(id, array){
    $('#'+id).empty();
    if(id === "teams"){
      $.each(array, function(key){
        $('#'+id).append('<tr id="'+id+'_table_data_'+key+'"><td><input type="text" value="'+json[0].teams[key].name+'"></td><td><button class="glyphicon glyphicon-minus"></button></td><td><button class="glyphicon glyphicon-plus"></button></td></tr>');
      });
    }
    if(id === "players"){
      $.each(array, function(key){
        $('#'+id).append('<tr id="'+id+'_table_data_'+key+'"><td><input type="text" value="'+json[0].players[key].name+'"></td><td><input type="text" value="'+json[0].players[key].email+'"></td><td><button class="glyphicon glyphicon-minus"></button></td><td><button class="glyphicon glyphicon-plus"></button></td></tr>');
      });
    }
}

// function to post data to the json file
function postPHP(data){
  console.log(data);
  $.ajax({
    type: "GET",
    dataType : 'json',
    async: false,
    url: 'js/save_file.php',
    data: { 'json': JSON.stringify(data) },
    success: function () {
      $('#result').text('You are now registered for the World Cup Sweepstake. Good Luck.');
       },
    failure: function() {alert("Error!");}
  });
}

// on page load get the json file, fire function calls and set click handlers 
$.getJSON('data/data.json', function(data) {
  json = data;
  if(json[0].signup[0].auth_key != ""){
    $('#code').text(json[0].signup.auth_key);
  }

  popTable('teams', json[0].teams);
  popTable('players', json[0].players);

  $('.glyphicon-plus:button').click(function() {
    $(this).parents('tr').after('<tr><td><input type="text" value=""></td><td><input type="text" value=""></td></tr>');
  });

  $('.glyphicon-minus:button').click(function() {
    var array;
    var data_id = $(this).parents('tbody').attr('id');

    if(data_id === 'teams'){
      array = json[0].teams;
    }
    else if(data_id === 'players'){
      array = json[0].players;
    }

    var index = $(this).parents('tr').attr('id');
    index = index.toString().match(/\d+/);
    array.splice(index[0],1);
    $(this).parents('tr').remove();
  });

  $("button:first").click(function() {
    json[0].signup.auth_key = makeid();
    $('#code').text(json[0].signup.auth_key);
  });

});







