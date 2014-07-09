// allow players to register their name and email based on signup codes they were sent

var drawn = [], auth_key, auth, set_auth, json, player, table_data = [], upd=[], jsonData = ['teams','players'];

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

  $.each($('#'+id+' tr'), function(key, value){
   var name = value.cells[0].firstChild;
   var email = value.cells[1].firstChild;
   var inArr = jsonData.indexOf(id);

   if($(email).hasClass('email')){
    json[0][jsonData[inArr]][key].email = email.value;
   }

   json[0][jsonData[inArr]][key].name = name.value;
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
  var array, data_id, index, pos, obj, inArr;

  // get details about the button that has been clicked
  $('.glyphicon:button').unbind('click').click(function(){
    data_id = $(this).parents('tbody').attr('id');

    // find position of the div id in the jsonData array
    inArr = jsonData.indexOf(data_id);

    // set the array var to the right object
    array = json[0][jsonData[inArr]];

    // TODO -- need to get the next team_id and set it as part of the new Team  object

    // set the obj var depending on the context
    switch(jsonData[inArr]){
      case 'teams':
      obj = new Team("","")
      break;
      case 'players':
      obj = new  Player("","")
      break;
    }

    var index = $(this).parents('tr').attr('id');
    index = index.toString().match(/\d+/);

    // add an empty object to the arrays and redraw the tables
    if($(this).hasClass('glyphicon-plus')){
      var pos = parseInt(index[0],10)+1;
      array.splice(pos,0,obj);
      popTable(data_id, array);
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
    // text to ignore from the class of the save button
    var str = "save btn btn-primary ";
    var save = $(this).attr('class');
    var rep = save.replace(str, "");
    var inArr = jsonData.indexOf(rep);

    if(inArr >= 0){
      var array = json[0][jsonData[inArr]];
      createJSON(rep,array);
      postPHP(json);
    }
  });
}


// on page load get the json file, fire function calls and set click handlers
$.getJSON('data/data.json', function(data) {
  json = data;
  if(json[0].signup[0].auth_key !== ""){
    $('#code').text(json[0].signup[0].auth_key);
  }

// run through an array of values and use these to populate the relevant divs. If no data then create a blank line.
$.each(jsonData, function(key,value){
  popTable(value, json[0][jsonData[key]]);

  // if there is nothing in the array, create a blank input box
  if(json[0][jsonData[key]].length < 1){
    var obj;
    var array = json[0][jsonData[key]];
    if(value === 'teams'){
      obj = new Team("","");
    }
    else if(value === 'players'){
      obj = new Player("","");
    }
    array.splice(0,1,obj);
    popTable(value,json[0][jsonData[key]]);
  }
});


});
