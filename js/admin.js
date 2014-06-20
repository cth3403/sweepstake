// allow players to register their name and email based on signup codes they were sent 

var drawn = [], auth_key, auth, set_auth, json, player; 


// function to generate registration code
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function addEdit(line, id){
  if(id === "players"){
    $('#'+id).append('<tr><td><input type="text" value="'+json[0].players[line].name+'"></td><td><input type="text" value="'+json[0].players[line].email+'"></td><td><button class="glyphicon glyphicon-minus"></button></td><td><button class="glyphicon glyphicon-plus"></button></td></tr>');
  }
  if(id === "teams"){
    $('#'+id).append('<tr><td><input type="text" value="'+json[0].teams[line].name+'"></td><td><button class="glyphicon glyphicon-minus"></button></td><td><button class="glyphicon glyphicon-plus"></button></td></tr>');
  }
}

$("button:first").click(function() {
  json[0].signup.auth_key = makeid();
  $('#code').text(json[0].signup.auth_key);
});




$('#add_team').click(function() {
  /* Act on the event */
});


$.getJSON('data/data.json', function(data) {
  json = data;
  if(json[0].signup[0].auth_key != ""){
    $('#code').text(json[0].signup.auth_key);
  }

  $.each(json[0].teams, function(key, value){
    addEdit(key, "teams");
  });

  $.each(json[0].players, function(key, value){
    addEdit(key, "players");
  });

});






// function to add players/teams



// function to edit players/teams

/*

function Player(name,email){
  this.name = name;
  this.email = email;
}

function Drawn(team, team_id){
  this.team = team;
  this.team_id = team_id;
  this.name;
  this.email;
}

function mkPlayer(value){
  player = new Player(value.name, value.email);
  //names.push(player);
}
// get the player and team JSON file and create separate objects
 $.getJSON('data/data.json', function(data) {
        json = data;
       // create the team object from the datafile
        $.each(data[0].signup, function(key, value) {
         auth = value.auth_key;
        });

        // create the player object from the datafile
        $.each(data[0].players, function(key, value) {
         // mkPlayer(value);
        }); 
 });

// sen a sonfirmation email to the user that they have registered
function confU(email){
  console.log(email);
 }

function postPHP(data){
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

// checks whether the signup code is valid
$('#submit').click(function(){


    if ( $( "input:first" ).val() === auth) {

      $('#auth_submit').html('<p><label for="signup_name">Name:&nbsp;</label><input id="signup_name" type="text" />&nbsp;&nbsp;<label for="signup_email">Email:&nbsp;</label><input id="signup_email" type="text" /></p>');
      
      set_auth = $( "input:first" ).val();

      console.log(auth);
      return;
    }

  if(set_auth !== undefined && $( "#signup_name" ).val() !== (undefined || '' || "")  && $( "#signup_email" ).val() !== (undefined || '' || "") )  {
   var value =[];
   value.name = $( "#signup_name" ).val();
   value.email = $( "#signup_email" ).val();
   mkPlayer(value);
   json[0].players.push(player);
   postPHP(json);
   confU(value.email);
    
   // var player = new Player($( "#signup_name" ).val(),$( "#signup_email" ).val()); 
    //names.push(player);
     console.log('defined auth' );
   }

  console.log( "Not valid!" );
  //event.preventDefault();
});



// function to post javscript object to php file to save to data.json 

*/