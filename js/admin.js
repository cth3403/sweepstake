// allow players to register their name and email based on signup codes they were sent

var drawn = [], auth_key, auth, set_auth, json, player, table_data = [], upd=[];

function Team(team_id, name){
  this.team_id = team_id;
  this.name = name;
}

function Player(name,email){
  this.name = name;
  this.email = email;
}

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
        $('#'+id).append('<tr id="'+id+'_table_data_'+key+'"><td><input class="name" type="text" value="'+json[0].teams[key].name+'"></td><td><button class="glyphicon glyphicon-minus"></button></td><td><button class="glyphicon glyphicon-plus"></button></td></tr>');
      });
    }
    if(id === "players"){
      $.each(array, function(key){
        $('#'+id).append('<tr id="'+id+'_table_data_'+key+'"><td><input class="name" type="text" value="'+json[0].players[key].name+'"></td><td><input class="email" type="text" value="'+json[0].players[key].email+'"></td><td><button class="glyphicon glyphicon-minus"></button></td><td><button class="glyphicon glyphicon-plus"></button></td></tr>');
      });
    }
    buttons();
}

// function to create JSON - id is the id holding the elements and  array is the array to update 
function createJSON(id,array){
  $.each($('#'+id).attr('tr').children(), function(key, value){
   var email, name;
   name = value.cells[0].innerHTML;
   name = $(name+' input').val();
   if(id === 'players'){
    email = value.cells[1].innerHTML;
    email = $(email+' input').val();
    json[0].players[key].name = name;
    json[0].players[key].email = email;
   }
   else if(id === 'teams'){
    json[0].teams[key].name = name;
   }
   //alert(email);
 });
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
      $('#result').text('Changes have been saved.');
       },
    failure: function() {alert("Error!");}
  });
}

// for some reason the click events were firing twice and to stop this added an  unbind('click') to stop this
function buttons(){
  var array, data_id, index, pos, obj;

  // get details about the button that has been clicked
  $('.glyphicon:button').unbind('click').click(function(){
    data_id = $(this).parents('tbody').attr('id');

    if(data_id === 'teams'){
      array = json[0].teams;

      // TODO - get the ID of the previous team and set it here
      obj = new Team("","");
    }
    else if(data_id === 'players'){
      array = json[0].players;
      obj = new Player("","");
    }

    var index = $(this).parents('tr').attr('id');
    index = index.toString().match(/\d+/);

    // add an empty object to the arrays and redraw the tables
    if($(this).hasClass('glyphicon-plus')){
      var pos = parseInt(index[0],10)+1;
      array.splice(pos,0,obj);
      if(data_id === 'teams'){
        popTable(data_id, json[0].teams);
      }
      else if(data_id === 'players'){
        popTable(data_id, json[0].players);
      }

    }

    // remove the  object from the array and  remove the row
    else if($(this).hasClass('glyphicon-minus')){
      array.splice(index[0],1);
      $(this).parents('tr').remove();
    }

  });

  // call the makeid function to generate a key
  $("button:first").unbind('click').click(function() {
    json[0].signup[0].auth_key = makeid();
    $('#code').text(json[0].signup[0].auth_key);
  });

  // function to update json and save changes
  $('.save:button').unbind('click').click(function(){
    var array;
    var id;
    if($(this).hasClass('teams')){
      id = 'teams';
      array = json[0].teams;
    }
    else if($(this).hasClass('players')){
      id = 'players';
      array = json[0].players;
    }
    console.log(id);
    createJSON(id,array);
    postPHP(json);
  });
}


// on page load get the json file, fire function calls and set click handlers
$.getJSON('data/data.json', function(data) {
  json = data;
  if(json[0].signup[0].auth_key !== ""){
    $('#code').text(json[0].signup[0].auth_key);
  }

  // TODO  -  change this so it loops through an array [teams => 'teams', players => 'players'] so it would be popTable(value, json[0].key)
  popTable('teams', json[0].teams);
  popTable('players', json[0].players);

});
